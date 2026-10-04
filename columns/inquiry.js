/* Public column context only; the existing form submits after the visitor's consent. */
(() => {
  'use strict';
  const form=document.getElementById('consultationForm');
  const slug=new URLSearchParams(location.search).get('column');
  if(!form||!slug||!/^[-a-z0-9]{1,100}$/.test(slug))return;
  fetch('/columns/posts.json',{cache:'no-store'})
    .then(response=>response.ok?response.json():null)
    .then(data=>{
      const post=data?.posts?.find(p=>p.status==='published'&&p.slug===slug);
      const message=form.elements.message;
      if(!post?.cta?.program||!message||message.value.trim())return;
      message.value=`관심 프로그램: ${post.cta.program}\n읽은 컬럼: ${post.title}\n컬럼 주소: https://aiwith.kr/columns/${post.slug}/\n\n교육 대상·인원:\n현재 AI 활용 수준:\n해결하고 싶은 업무·문제:\n희망 일정·교육 시간:\n원하는 실습 결과물:`;
      const note=document.createElement('p');
      note.className='column-inquiry-context wide';
      note.setAttribute('role','status');
      note.textContent=`「${post.title}」와 연결된 ${post.cta.program} 상담입니다. 문의 내용을 수정한 뒤 신청해 주세요.`;
      form.prepend(note);
    }).catch(()=>{});
})();
