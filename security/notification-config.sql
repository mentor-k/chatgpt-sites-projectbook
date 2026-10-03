-- Schema only: the approved recipient must be set privately, never in this repository.
create table private.aiwith_notification_settings (
  setting_key text primary key check (setting_key = 'consultation'),
  recipient text not null check (length(recipient) between 3 and 254),
  updated_at timestamptz not null default now()
);
alter table private.aiwith_notification_settings enable row level security;
revoke all on private.aiwith_notification_settings from public, anon, authenticated, service_role;
grant select on private.aiwith_notification_settings to service_role;
create policy aiwith_server_notification_config_read
  on private.aiwith_notification_settings for select to service_role using (true);
create function public.aiwith_notification_recipient()
returns text language sql stable security invoker set search_path = ''
as $$ select recipient from private.aiwith_notification_settings where setting_key = 'consultation' $$;
revoke all on function public.aiwith_notification_recipient() from public, anon, authenticated;
grant execute on function public.aiwith_notification_recipient() to service_role;
