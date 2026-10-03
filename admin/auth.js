/* Authentication is verified by Supabase Auth and a server-side administrator registry. */
(() => {
  'use strict';
  const client=window.AIWITH_SUPABASE?.getClient();
  const root=document.documentElement;
  root.style.visibility='hidden';
  sessionStorage.removeItem('aiwith_admin_access');
  const gate=async()=>{
    if(window.top!==window.self)return false;
    if(!client)throw Error('인증 서비스에 연결하지 못했습니다. 새로고침해 주세요.');
    if(await window.AIWITH_SUPABASE.getAdminUser())return true;
    return new Promise(resolve=>{
      const overlay=document.createElement('div');overlay.className='aiwith-password-backdrop';
      overlay.innerHTML='<section class="aiwith-password-dialog" role="dialog" aria-modal="true" aria-labelledby="secureAdminTitle"><p class="kicker">AI위드스쿨 ADMIN</p><h2 id="secureAdminTitle">관리자 계정 로그인</h2><p>등록된 Supabase 관리자 이메일 계정으로 로그인하세요. 기존 공용 비밀번호는 사용하지 않습니다.</p><form><label for="secureAdminEmail">이메일</label><input id="secureAdminEmail" name="email" type="email" autocomplete="username" required><label for="secureAdminPassword">비밀번호</label><input id="secureAdminPassword" name="password" type="password" autocomplete="current-password" required><p role="status" data-auth-message></p><div><button type="button" data-auth-cancel>취소</button><button class="primary" type="submit">로그인</button></div></form></section>';
      const form=overlay.querySelector('form'),message=overlay.querySelector('[data-auth-message]'),submit=form.querySelector('[type="submit"]');
      overlay.querySelector('[data-auth-cancel]').addEventListener('click',()=>{overlay.remove();resolve(false)});
      form.addEventListener('submit',async event=>{
        event.preventDefault();submit.disabled=true;message.textContent='인증과 관리자 권한을 확인하고 있습니다.';
        try{
          const {error}=await client.auth.signInWithPassword({email:form.elements.email.value.trim(),password:form.elements.password.value});
          form.elements.password.value='';
          if(error||!await window.AIWITH_SUPABASE.getAdminUser())throw Error('로그인 정보 또는 관리자 권한을 확인해 주세요.');
          overlay.remove();resolve(true);
        }catch{await client.auth.signOut({scope:'local'});message.textContent='로그인 정보 또는 관리자 권한을 확인해 주세요.'}
        finally{form.elements.password.value='';submit.disabled=false}
      });
      document.body.appendChild(overlay);form.elements.email.focus();
    });
  };
  let lastActivity=Date.now(),ready=false;
  const logout=async()=>{root.style.visibility='hidden';await client?.auth.signOut({scope:'local'});location.replace('/admin/')};
  window.AIWITH_ADMIN_READY=gate().then(allowed=>{
    if(!allowed){location.replace('/');return false}
    ready=true;root.style.visibility='visible';
    document.getElementById('secureAdminSignOut')?.addEventListener('click',logout);
    ['pointerdown','keydown'].forEach(type=>document.addEventListener(type,()=>{lastActivity=Date.now()},{passive:true}));
    setInterval(()=>{if(ready&&Date.now()-lastActivity>30*60*1000)logout()},60000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&ready)window.AIWITH_SUPABASE.getAdminUser().then(user=>{if(!user)logout()}).catch(logout)});
    client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT'&&ready){ready=false;root.style.visibility='hidden';location.replace('/admin/')}});
    return true;
  }).catch(()=>{
    const box=document.createElement('div');box.className='aiwith-password-backdrop';
    box.innerHTML='<section class="aiwith-password-dialog"><h2>관리자 인증 연결 실패</h2><p>보안을 위해 관리자 화면을 열지 않았습니다. 새로고침하거나 잠시 후 다시 시도해 주세요.</p><a href="/">홈으로</a></section>';
    document.body.appendChild(box);return false;
  });
})();
