(() => {
  'use strict';
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const active = (prefix) => prefix === '/' ? path === '/' : path.startsWith(prefix);
  const requestAdminPassword = () => new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'aiwith-password-backdrop';
    backdrop.innerHTML = '<div class="aiwith-password-dialog" role="dialog" aria-modal="true" aria-labelledby="aiwithPasswordTitle"><p class="kicker">AIWITH ADMIN</p><h2 id="aiwithPasswordTitle">관리자 대시보드</h2><p>비밀번호를 입력하면 관리자 화면으로 이동합니다.</p><form><label for="aiwithAdminPassword">비밀번호</label><input id="aiwithAdminPassword" name="password" type="password" lang="en" inputmode="latin" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" required><div><button type="button" data-password-cancel>취소</button><button type="submit" class="primary">확인</button></div></form></div>';
    const form = backdrop.querySelector('form');
    const input = backdrop.querySelector('input');
    const close = (value) => { backdrop.remove(); resolve(value); };
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) close(null); });
    backdrop.querySelector('[data-password-cancel]').addEventListener('click', () => close(null));
    form.addEventListener('submit', (event) => { event.preventDefault(); close(input.value); });
    document.body.appendChild(backdrop);
    input.focus();
  });
  window.AIWITH_REQUEST_ADMIN_PASSWORD = requestAdminPassword;
  if (header) {
    header.innerHTML = '<header class="global-header"><a class="global-brand" href="/" aria-label="AIWITH HOME"><img src="/assets/mentor-k-header-logo.png" alt="멘토K"><span><b>AIWITH</b><small>AI와 함께 만드는 실전 플랫폼</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="globalNav"><span></span><span></span><span></span><em>메뉴</em></button><nav class="global-nav" id="globalNav" aria-label="주요 메뉴"><a data-nav="home" href="/">HOME</a><div class="nav-group"><button type="button" aria-expanded="false">웹사이트 스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/website/">웹사이트 구축 강의</a><a href="/website/benchmark/">웹사이트 벤치마킹</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">콘텐츠스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/content-school/">콘텐츠스쿨 소개</a><a href="/content-school/#blog">AI 블로그 글쓰기</a><a href="/content-school/#visual">인포그래픽·포스터·카드뉴스</a><a href="/content-school/#shortform">숏폼 만들기·홍보마케팅</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">기획서·사업계획서 스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/proposal-school/">스쿨 소개</a><a href="/proposal-school/#business">사업계획서·IR자료</a><a href="/proposal-school/#government">정부지원 사업계획서</a></div></div><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><a href="/columns/">멘토K 컬럼</a><a href="/cardnews/">카드뉴스</a><a href="/notices/">공지사항</a><a class="nav-cta" href="/consultation/">상담 신청</a><a class="admin-link" data-admin-entry href="/admin/" aria-label="관리자 대시보드" title="관리자 대시보드"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5.1-3.4 8.9-8 10-4.6-1.1-8-4.9-8-10V6l8-3Z"/><path d="m8.8 12 2.1 2.1 4.5-4.7"/></svg><span>관리자</span></a></nav></header>';
    const nav = header.querySelector('.global-nav');
    const toggle = header.querySelector('.menu-toggle');
    const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); document.body.classList.remove('menu-open'); };
    toggle.addEventListener('click', () => { const on = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(on)); nav.classList.toggle('open', on); document.body.classList.toggle('menu-open', on); });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    header.querySelectorAll('.nav-group>button').forEach((button) => button.addEventListener('click', () => { const on = button.getAttribute('aria-expanded') !== 'true'; header.querySelectorAll('.nav-group>button').forEach((x) => { x.setAttribute('aria-expanded', 'false'); x.parentElement.classList.remove('open'); }); button.setAttribute('aria-expanded', String(on)); button.parentElement.classList.toggle('open', on); }));
    header.querySelectorAll('a').forEach((a) => { const href = a.getAttribute('href'); if (href && active(href) && href !== '/') a.classList.add('active'); if (href === '/' && path === '/') a.classList.add('active'); });
    const adminHash = 'e45870b5e5716bad459290561eaedf47972c65c9cb3d4f50762f46bf45e8f898';
    const digest = async (value) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    header.querySelector('[data-admin-entry]')?.addEventListener('click', async (event) => {
      event.preventDefault();
      if (sessionStorage.getItem('aiwith_admin_access') === 'granted') { location.href = '/admin/'; return; }
      const password = await requestAdminPassword();
      if (password && await digest(password) === adminHash) { sessionStorage.setItem('aiwith_admin_access', 'granted'); location.href = '/admin/'; }
      else if (password !== null) window.alert('비밀번호가 올바르지 않습니다.');
    });
    document.addEventListener('click', (event) => { if (!event.target.closest('.nav-group')) header.querySelectorAll('.nav-group').forEach((g) => { g.classList.remove('open'); g.querySelector('button')?.setAttribute('aria-expanded', 'false'); }); if (!event.target.closest('.global-header') && nav.classList.contains('open')) closeMenu(); });
  }
  if (footer) footer.innerHTML = '<footer class="global-footer"><a class="footer-brand" href="/"><b>AIWITH</b><span>AI와 함께 배우고, 만들고, 성장하다</span></a><div class="footer-nav"><a href="/">HOME</a><a href="/website/">웹사이트 스쿨</a><a href="/content-school/">콘텐츠스쿨</a><a href="/proposal-school/">기획서·사업계획서 스쿨</a><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><a href="/columns/">멘토K 컬럼</a><a href="/cardnews/">카드뉴스</a><a href="/notices/">공지사항</a><a href="/consultation/">상담 신청</a></div><p>© 2026 AIWITH · 엠아이넥스트㈜ · 김용한 박사(멘토K)</p></footer>';
  if (path !== '/website/' && !path.startsWith('/admin/') && !document.querySelector('.aiwith-float-cta')) {
    const cta = document.createElement('a');
    cta.className = 'aiwith-float-cta';
    cta.href = '/consultation/';
    cta.setAttribute('aria-label', '강의·워크숍 신청 상담 010-3338-7110');
    cta.innerHTML = '<span>강의·워크숍<br><b>신청하기</b></span><strong>010-3338-<br>7110</strong><i aria-hidden="true">→</i>';
    document.body.appendChild(cta);
  }
  try {
    const key = 'aiwith_pageviews';
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    data[path] = (data[path] || 0) + 1; data.__total = (data.__total || 0) + 1; data.__last = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(data));
  } catch (_) {}
  const form = document.getElementById('consultationForm');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const item = Object.fromEntries(new FormData(form).entries()); item.createdAt = new Date().toISOString(); item.status = 'draft';
    const list = JSON.parse(localStorage.getItem('aiwith_consultations') || '[]'); list.unshift(item); localStorage.setItem('aiwith_consultations', JSON.stringify(list.slice(0, 100)));
    const output = document.getElementById('formResult'); output.hidden = false; output.textContent = '상담 내용이 임시 저장되었습니다. 중앙 접수 시스템 연결 전에는 이 브라우저에만 보관됩니다.';
    form.reset();
  });
})();
