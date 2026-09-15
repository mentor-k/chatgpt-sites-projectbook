(() => {
  'use strict';
  const ADMIN_HASH = 'e45870b5e5716bad459290561eaedf47972c65c9cb3d4f50762f46bf45e8f898';
  const digest = async (value) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  const gate = async () => {
    if (sessionStorage.getItem('aiwith_admin_access') === 'granted') return true;
    const password = window.prompt('관리자 대시보드 비밀번호를 입력하세요.');
    if (password && await digest(password) === ADMIN_HASH) { sessionStorage.setItem('aiwith_admin_access', 'granted'); return true; }
    if (password !== null) window.alert('비밀번호가 올바르지 않습니다.');
    return false;
  };
  document.documentElement.style.visibility = 'hidden';
  gate().then((allowed) => {
    if (!allowed) { location.replace('/'); return; }
    document.documentElement.style.visibility = 'visible';
    init();
  });
  function init() {
    const $ = (q) => document.querySelector(q);
    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    const fmt = (value) => { try { return new Intl.DateTimeFormat('ko-KR',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value)); } catch (_) { return '-'; } };
    document.querySelectorAll('[data-admin-tab]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-admin-tab]').forEach((b) => b.classList.toggle('active', b === button)); document.querySelectorAll('.admin-view').forEach((view) => view.classList.toggle('active', view.id === 'admin-' + button.dataset.adminTab)); if (button.dataset.adminTab === 'history') loadCommits(); }));
    function renderOverview(){ const views=JSON.parse(localStorage.getItem('aiwith_pageviews')||'{}'); const drafts=JSON.parse(localStorage.getItem('aiwith_drafts')||'[]'); $('#metricTotal').textContent=views.__total||0; $('#metricDrafts').textContent=drafts.length; $('#metricUpdated').textContent=views.__last?fmt(views.__last):'-'; const rows=Object.entries(views).filter(([k])=>!k.startsWith('__')).sort((a,b)=>b[1]-a[1]); $('#pageviewList').innerHTML=rows.length?rows.map(([path,count])=>'<div class="commit-item"><b>'+esc(path)+'</b><small>'+count+'회 조회</small></div>').join(''):'<p>아직 기록된 조회가 없습니다.</p>'; }
    function renderDrafts(){ const drafts=JSON.parse(localStorage.getItem('aiwith_drafts')||'[]'); $('#draftList').innerHTML=drafts.length?drafts.map((d,i)=>'<div class="commit-item"><b>'+esc(d.type)+' · '+esc(d.title)+'</b><small>'+esc(fmt(d.updatedAt))+'</small><button class="button ghost" style="min-height:32px;margin-top:8px" data-delete-draft="'+i+'">삭제</button></div>').join(''):'<p>저장된 초안이 없습니다.</p>'; $('#metricDrafts').textContent=drafts.length; }
    function renderCardnewsDrafts(){ const drafts=JSON.parse(localStorage.getItem('aiwith_cardnews_drafts')||'[]'); $('#cardnewsDraftList').innerHTML=drafts.length?drafts.map((d,i)=>'<div class="commit-item"><b>'+esc(d.title)+' · 5장</b><small>'+esc(fmt(d.updatedAt))+' · '+esc(d.summary)+'</small><button class="button ghost" style="min-height:32px;margin-top:8px" data-delete-cardnews="'+i+'">삭제</button></div>').join(''):'<p>저장된 카드뉴스 초안이 없습니다.</p>'; }
    $('#editorForm')?.addEventListener('submit',(event)=>{ event.preventDefault(); const draft=Object.fromEntries(new FormData(event.currentTarget).entries()); draft.updatedAt=new Date().toISOString(); const drafts=JSON.parse(localStorage.getItem('aiwith_drafts')||'[]'); drafts.unshift(draft); localStorage.setItem('aiwith_drafts',JSON.stringify(drafts)); event.currentTarget.reset(); renderDrafts(); });
    $('#draftList')?.addEventListener('click',(event)=>{ const button=event.target.closest('[data-delete-draft]'); if(!button)return; const drafts=JSON.parse(localStorage.getItem('aiwith_drafts')||'[]'); drafts.splice(Number(button.dataset.deleteDraft),1); localStorage.setItem('aiwith_drafts',JSON.stringify(drafts)); renderDrafts(); });
    $('#exportDrafts')?.addEventListener('click',()=>{ const blob=new Blob([localStorage.getItem('aiwith_drafts')||'[]'],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='aiwith-drafts.json'; a.click(); URL.revokeObjectURL(a.href); });
    $('#cardnewsForm')?.addEventListener('submit',(event)=>{ event.preventDefault(); const draft=Object.fromEntries(new FormData(event.currentTarget).entries()); draft.updatedAt=new Date().toISOString(); const drafts=JSON.parse(localStorage.getItem('aiwith_cardnews_drafts')||'[]'); drafts.unshift(draft); localStorage.setItem('aiwith_cardnews_drafts',JSON.stringify(drafts)); event.currentTarget.reset(); renderCardnewsDrafts(); });
    $('#cardnewsDraftList')?.addEventListener('click',(event)=>{ const button=event.target.closest('[data-delete-cardnews]'); if(!button)return; const drafts=JSON.parse(localStorage.getItem('aiwith_cardnews_drafts')||'[]'); drafts.splice(Number(button.dataset.deleteCardnews),1); localStorage.setItem('aiwith_cardnews_drafts',JSON.stringify(drafts)); renderCardnewsDrafts(); });
    $('#exportCardnews')?.addEventListener('click',()=>{ const blob=new Blob([localStorage.getItem('aiwith_cardnews_drafts')||'[]'],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='aiwith-cardnews.json'; a.click(); URL.revokeObjectURL(a.href); });
    async function loadCommits(){ const root=$('#commitList'); root.innerHTML='<p>수정이력을 불러오는 중입니다.</p>'; try{ const res=await fetch('https://api.github.com/repos/mentor-k/chatgpt-sites-projectbook/commits?per_page=20',{headers:{Accept:'application/vnd.github+json'}}); if(!res.ok)throw new Error(); const commits=await res.json(); root.innerHTML=commits.map((item)=>'<div class="commit-item"><b>'+esc(item.commit.message.split('\n')[0])+'</b><small>'+esc(fmt(item.commit.author.date))+' · '+esc(item.commit.author.name)+'</small></div>').join(''); }catch(_){ root.innerHTML='<p>수정이력을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>'; } }
    $('#refreshAdmin')?.addEventListener('click',()=>{renderOverview();renderDrafts();renderCardnewsDrafts();loadCommits();});
    renderOverview(); renderDrafts(); renderCardnewsDrafts(); loadCommits();
  }
})();
