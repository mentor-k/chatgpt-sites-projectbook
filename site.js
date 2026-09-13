(() => {
  'use strict';
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const active = (prefix) => prefix === '/' ? path === '/' : path.startsWith(prefix);
  if (header) {
    header.innerHTML = '<header class="global-header"><a class="global-brand" href="/" aria-label="AIWITH 통합 메인"><img src="/assets/mentor-k-header-logo.png" alt="멘토K"><span><b>AIWITH</b><small>AI와 함께 만드는 실전 플랫폼</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="globalNav"><span></span><span></span><span></span><em>메뉴</em></button><nav class="global-nav" id="globalNav" aria-label="주요 메뉴"><a data-nav="home" href="/">통합 메인</a><div class="nav-group"><button type="button" aria-expanded="false">웹사이트 <i>⌄</i></button><div class="nav-sub"><a href="/website/">웹사이트 구축 강의</a><a href="/website/benchmark/">웹사이트 벤치마킹</a></div></div><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><div class="nav-group"><button type="button" aria-expanded="false">AIWITH 콘텐츠 <i>⌄</i></button><div class="nav-sub"><a href="/columns/">AIWITH 컬럼</a><a href="/notices/">공지사항</a></div></div><a class="nav-cta" href="/consultation/">상담 신청</a></nav></header>';
    const nav = header.querySelector('.global-nav');
    const toggle = header.querySelector('.menu-toggle');
    toggle.addEventListener('click', () => { const on = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(on)); nav.classList.toggle('open', on); document.body.classList.toggle('menu-open', on); });
    header.querySelectorAll('.nav-group>button').forEach((button) => button.addEventListener('click', () => { const on = button.getAttribute('aria-expanded') !== 'true'; header.querySelectorAll('.nav-group>button').forEach((x) => { x.setAttribute('aria-expanded', 'false'); x.parentElement.classList.remove('open'); }); button.setAttribute('aria-expanded', String(on)); button.parentElement.classList.toggle('open', on); }));
    header.querySelectorAll('a').forEach((a) => { const href = a.getAttribute('href'); if (href && active(href) && href !== '/') a.classList.add('active'); if (href === '/' && path === '/') a.classList.add('active'); });
    document.addEventListener('click', (event) => { if (!event.target.closest('.nav-group')) header.querySelectorAll('.nav-group').forEach((g) => { g.classList.remove('open'); g.querySelector('button')?.setAttribute('aria-expanded', 'false'); }); });
  }
  if (footer) footer.innerHTML = '<footer class="global-footer"><a class="footer-brand" href="/"><b>AIWITH</b><span>AI와 함께 배우고, 만들고, 성장하다</span></a><div class="footer-nav"><a href="/website/">웹사이트 구축 강의</a><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><a href="/columns/">컬럼</a><a href="/notices/">공지</a><a href="/consultation/">상담</a></div><p>© 2026 AIWITH · 엠아이넥스트㈜ · 김용한 박사(멘토K)</p></footer>';
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
