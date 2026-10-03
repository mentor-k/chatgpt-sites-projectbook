(() => {
  'use strict';
  const writing=document.getElementById('admin-writing');
  if(!writing)return;
  // Keep the existing authentication code untouched; only route the visible tab.
  const activateWriting=()=>{
    if(location.hash!=='#writing')return;
    document.querySelectorAll('[data-admin-tab]').forEach(button=>button.classList.toggle('active',button.dataset.adminTab==='writing'));
    document.querySelectorAll('.admin-view').forEach(view=>view.classList.toggle('active',view.id==='admin-writing'));
  };
  window.addEventListener('hashchange',activateWriting);activateWriting();
  const panel=document.createElement('div');panel.className='admin-card';
  panel.innerHTML='<h2>30개 컬럼 자동 발행 계획</h2><p class="admin-note">자동 게시된 원고는 공개 컬럼과 GitHub 저장소에서 확인합니다.</p><div id="columnQueue">발행 계획을 불러오는 중입니다.</div>';
  writing.appendChild(panel);
  const root=panel.querySelector('#columnQueue');
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  Promise.all([fetch('/columns/topics.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error();return r.json()}),fetch('/columns/posts.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error();return r.json()})]).then(([plan,data])=>{
    const done=new Set(data.posts.filter(p=>p.status==='published').map(p=>p.topicId));
    root.innerHTML='<p class="column-state">'+done.size+' / '+plan.topics.length+'편 게시 완료</p><p class="admin-note">자동 작성·게시: 한국시간 오전 8시 · 2026년 10월 4일부터 순서대로 진행합니다. 아래 초안 저장은 이 브라우저에만 저장되며 자동 게시 원고와 별개입니다.</p><div class="column-queue-list">'+plan.topics.map(topic=>'<article class="column-queue-row"><div><b>'+topic.id+'. '+esc(topic.title)+'</b><small>'+esc(topic.audience)+' · '+esc(topic.program)+'</small><small>'+ (done.has(topic.id)?'게시 완료':'대기')+'</small></div><button type="button" class="button ghost" data-column-topic="'+topic.id+'">글쓰기 불러오기</button></article>').join('')+'</div>';
    root.addEventListener('click',event=>{
      const button=event.target.closest('[data-column-topic]');
      if(!button)return;
      const topic=plan.topics.find(t=>t.id===Number(button.dataset.columnTopic));
      const form=document.getElementById('editorForm');
      if(!topic||!form)return;
      if((form.elements.title.value||form.elements.body.value)&&!window.confirm('현재 작성 중인 입력 내용을 주제 안내로 바꿀까요?'))return;
      form.elements.type.value='멘토K 컬럼';form.elements.title.value=topic.title;
      form.elements.subtitle.value=topic.focus;
      form.elements.body.value='[핵심 문제 제기]\n\n[현장 적용 관점]\n대상: '+topic.audience+'\n\n[실행 방법]\n\n[강의·워크숍 상담]\n'+topic.program+' 문의: https://aiwith.kr/consultation/ · 010-3338-7110';
      form.scrollIntoView({behavior:'smooth',block:'start'});form.elements.body.focus();
    });
  }).catch(()=>{root.textContent='발행 계획을 불러오지 못했습니다. 새로고침해 주세요.'});
})();
