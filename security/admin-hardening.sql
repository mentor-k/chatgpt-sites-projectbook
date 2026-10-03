begin;
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated, service_role;

create table private.aiwith_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table private.aiwith_admins enable row level security;
revoke all on private.aiwith_admins from public, anon, authenticated;
grant select on private.aiwith_admins to authenticated;
grant all on private.aiwith_admins to service_role;
create policy aiwith_admin_self_read on private.aiwith_admins for select to authenticated
  using (user_id = (select auth.uid()));
-- Preserve only the existing registered operators who own site content.
-- Do not create users or promote future signups, or trust user-editable metadata.
insert into private.aiwith_admins(user_id)
select distinct p.created_by from public.cardnews_posts p join auth.users u on u.id=p.created_by
where not coalesce(u.is_anonymous,false) and u.deleted_at is null;
do $$ begin
  if not exists(select 1 from private.aiwith_admins) then
    raise exception 'No existing administrator can be verified; stop without changing access';
  end if;
end $$;
create function public.aiwith_is_admin() returns boolean language sql stable security invoker
set search_path = '' as $$
  select exists(select 1 from private.aiwith_admins
    where user_id=(select auth.uid()) and active);
$$;
revoke all on function public.aiwith_is_admin() from public, anon;
grant execute on function public.aiwith_is_admin() to authenticated, service_role;

-- Restrictive policies intersect with the existing ownership policies.
create policy aiwith_admin_insert on public.cardnews_posts as restrictive for insert to authenticated
  with check ((select public.aiwith_is_admin()));
create policy aiwith_admin_update on public.cardnews_posts as restrictive for update to authenticated
  using ((select public.aiwith_is_admin())) with check ((select public.aiwith_is_admin()));
create policy aiwith_admin_delete on public.cardnews_posts as restrictive for delete to authenticated
  using ((select public.aiwith_is_admin()));
create policy aiwith_admin_read on public.cardnews_posts as restrictive for select to authenticated
  using (status='published' or (select public.aiwith_is_admin()));
create policy aiwith_admin_insert on public.cardnews_cards as restrictive for insert to authenticated
  with check ((select public.aiwith_is_admin()));
create policy aiwith_admin_update on public.cardnews_cards as restrictive for update to authenticated
  using ((select public.aiwith_is_admin())) with check ((select public.aiwith_is_admin()));
create policy aiwith_admin_delete on public.cardnews_cards as restrictive for delete to authenticated
  using ((select public.aiwith_is_admin()));

drop policy "page_views_authenticated_read" on public.page_views;
create policy aiwith_admin_analytics_read on public.page_views for select to authenticated
  using ((select public.aiwith_is_admin()));
drop policy "consultation insert public" on public.consultation_requests;
revoke insert, update, delete on public.consultation_requests from anon, authenticated;
grant select on public.consultation_requests to authenticated;
create policy aiwith_admin_consultation_read on public.consultation_requests for select to authenticated
  using ((select public.aiwith_is_admin()));

create policy aiwith_admin_storage_guard on storage.objects as restrictive for all to authenticated
  using (bucket_id not in ('cardnews','cardnews-images','consultation-attachments') or (select public.aiwith_is_admin()))
  with check (bucket_id not in ('cardnews','cardnews-images','consultation-attachments') or (select public.aiwith_is_admin()));
drop policy "Public can read cardnews images" on storage.objects;
create policy aiwith_admin_image_list on storage.objects for select to authenticated
  using (bucket_id in ('cardnews','cardnews-images') and (select public.aiwith_is_admin()));
create policy aiwith_admin_private_attachments on storage.objects for select to authenticated
  using (bucket_id='consultation-attachments' and (select public.aiwith_is_admin()));

create table private.aiwith_request_budgets (
  budget_key text not null check(char_length(budget_key) between 1 and 80),
  window_start timestamptz not null,
  attempts integer not null check(attempts > 0),
  primary key(budget_key,window_start)
);
alter table private.aiwith_request_budgets enable row level security;
revoke all on private.aiwith_request_budgets from public, anon, authenticated;
grant all on private.aiwith_request_budgets to service_role;
create policy aiwith_server_budget_access on private.aiwith_request_budgets for all to service_role
  using (true) with check (true);
-- Service-only, invoker-rights RPC: no public security-definer bypass.
create function public.aiwith_consume_budget(p_key text,p_window_seconds integer,p_limit integer)
returns boolean language plpgsql security invoker set search_path='' as $$
declare slot timestamptz; used integer;
begin
  if char_length(p_key) not between 1 and 80 or p_window_seconds not between 1 and 86400
    or p_limit not between 1 and 1000 then raise exception 'Invalid budget'; end if;
  slot := to_timestamp(floor(extract(epoch from now())/p_window_seconds)*p_window_seconds);
  delete from private.aiwith_request_budgets where window_start < now()-interval '2 days';
  insert into private.aiwith_request_budgets(budget_key,window_start,attempts) values(p_key,slot,1)
  on conflict(budget_key,window_start) do update
    set attempts=least(private.aiwith_request_budgets.attempts+1,p_limit+1)
  returning attempts into used;
  return used<=p_limit;
end $$;
revoke all on function public.aiwith_consume_budget(text,integer,integer) from public,anon,authenticated;
grant execute on function public.aiwith_consume_budget(text,integer,integer) to service_role;
commit;
