(() => {
  'use strict';
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const active = (prefix) => prefix === '/' ? path === '/' : path.startsWith(prefix);
  const requestAdminPassword = () => new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'aiwith-password-backdrop';
    backdrop.innerHTML = '<div class="aiwith-password-dialog" role="dialog" aria-modal="true" aria-labelledby="aiwithPasswordTitle"><p class="kicker">AI위드스쿨 ADMIN</p><h2 id="aiwithPasswordTitle">관리자 대시보드</h2><p>비밀번호를 입력하면 관리자 화면으로 이동합니다.</p><form><label for="aiwithAdminPassword">비밀번호</label><input id="aiwithAdminPassword" name="password" type="password" lang="en" inputmode="latin" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" required><div><button type="button" data-password-cancel>취소</button><button type="submit" class="primary">확인</button></div></form></div>';
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
    header.innerHTML = '<header class="global-header"><a class="global-brand" href="/" aria-label="AI위드스쿨 HOME"><img src="/assets/aiwith-school-logo-domain.png" alt="AI위드스쿨 · AI와 함께 배우고, 만들고, 성장하다 · aiwith.kr"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="globalNav"><span></span><span></span><span></span><em>메뉴</em></button><nav class="global-nav" id="globalNav" aria-label="주요 메뉴"><a data-nav="home" href="/">HOME</a><div class="nav-group"><button type="button" aria-expanded="false">웹사이트 스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/website/">웹사이트 구축 강의</a><a href="/website/benchmark/">웹사이트 벤치마킹</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">콘텐츠스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/content-school/">콘텐츠스쿨 소개</a><a href="/content-school/#blog">AI 블로그 글쓰기</a><a href="/content-school/#visual">인포그래픽·포스터·카드뉴스</a><a href="/content-school/#shortform">숏폼 만들기·홍보마케팅</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">기획서·사업계획서 스쿨 <i>⌄</i></button><div class="nav-sub"><a href="/proposal-school/">스쿨 소개</a><a href="/proposal-school/#business">사업계획서·IR자료</a><a href="/proposal-school/#government">정부지원 사업계획서</a></div></div><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><a href="/columns/">멘토K 컬럼</a><a href="/cardnews/">카드뉴스</a><a href="/notices/">공지사항</a><a class="nav-cta" href="/consultation/">상담 신청</a><a class="admin-link" data-admin-entry href="/admin/" aria-label="관리자 대시보드" title="관리자 대시보드"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5.1-3.4 8.9-8 10-4.6-1.1-8-4.9-8-10V6l8-3Z"/><path d="m8.8 12 2.1 2.1 4.5-4.7"/></svg><span>관리자</span></a></nav></header>';
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
  if (footer) {
    footer.innerHTML = '<footer class="global-footer"><div class="footer-main"><div class="footer-brand-block"><a class="footer-brand" href="/"><img src="/assets/aiwith-school-logo.png" alt="AI위드스쿨 · AI와 함께 배우고, 만들고, 성장하다"></a><div class="footer-brand-copy"><strong>엠아이넥스트㈜</strong><span>AI와 함께 배우고, 만들고, 성장하다.</span></div></div><div class="footer-company"><p class="footer-company-kicker">COMPANY</p><p>엠아이넥스트㈜ · 대표 김용한</p><p><a href="tel:02-2168-3071">02)2168-3071</a> · <a href="mailto:misiceo@naver.com">misiceo@naver.com</a></p><p class="footer-company-address">경기도 김포시 태장로 789, 금광하이테크시티 305호 <a class="footer-map-link" href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B9%80%ED%8F%AC%EC%8B%9C%20%ED%83%9C%EC%9E%A5%EB%A1%9C%20789%20%EA%B8%88%EA%B4%91%ED%95%98%EC%9D%B4%ED%85%8C%ED%81%AC%EC%8B%9C%ED%8B%B0" target="_blank" rel="noopener">네이버 지도 ↗</a></p></div></div><div class="footer-nav"><a href="/">HOME</a><a href="/website/">웹사이트 스쿨</a><a href="/content-school/">콘텐츠스쿨</a><a href="/proposal-school/">기획서·사업계획서 스쿨</a><a href="/prompt/">AI 프롬프트랩</a><a href="/book-school/">책쓰기 스쿨</a><a href="/workshops/">강의·워크숍</a><a href="/columns/">멘토K 컬럼</a><a href="/cardnews/">카드뉴스</a><a href="/notices/">공지사항</a><a href="/consultation/">상담 신청</a></div><div class="footer-legal-links" aria-label="법적 안내"><button type="button" data-legal="terms">이용약관</button><button type="button" data-legal="privacy">개인정보처리방침</button><button type="button" data-legal="copyright">소유·저작권 안내</button></div><p class="footer-copyright">© 2026 AI위드스쿨 · 엠아이넥스트㈜ · 김용한 박사(멘토K)</p></footer><div class="legal-modal" data-legal-modal hidden><div class="legal-modal-backdrop" data-legal-close></div><section class="legal-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="legalModalTitle"><button type="button" class="legal-modal-close" data-legal-close aria-label="닫기">×</button><p class="kicker">AI위드스쿨 POLICY</p><h2 id="legalModalTitle"></h2><div class="legal-modal-body"></div></section></div>';
    const legalModal = footer.querySelector('[data-legal-modal]');
    const legalTitle = footer.querySelector('#legalModalTitle');
    const legalBody = footer.querySelector('.legal-modal-body');
    const legalClose = () => { legalModal.hidden = true; document.body.classList.remove('legal-modal-open'); };
    const legalContent = {
      terms: { title: '이용약관', body: '<p>AI위드스쿨은 AI 교육·콘텐츠·웹사이트·프롬프트·책쓰기·강의·워크숍 정보를 제공하는 서비스입니다. 이용자는 서비스와 콘텐츠를 학습·업무·기획 보조 목적으로 활용할 수 있습니다.</p><p>AI가 생성한 결과와 사이트 자료는 사실성·최신성·법적 적합성·저작권·개인정보 보호 여부를 이용자가 최종 확인해야 합니다. 근거 없는 내용의 재배포, 타인의 권리를 침해하는 사용, 서비스 운영을 방해하는 자동 수집·복제·재판매는 금지됩니다.</p><p>상담·교육 신청 시 입력한 정보는 요청한 안내와 진행을 위해 사용되며, 운영상 필요한 경우 사전 안내 후 내용을 변경할 수 있습니다.</p>' },
      privacy: { title: '개인정보처리방침', body: '<p>수집 항목은 상담·신청 과정에서 이용자가 직접 입력한 이름, 기관·기업명, 연락처, 이메일, 상담 분야와 문의 내용입니다. 접속·검색·복사와 같은 이용 기록은 서비스 개선과 관리자 통계를 위해 처리될 수 있습니다.</p><p>개인정보는 상담 응대, 강의·워크숍 안내, 신청 확인과 운영 기록 관리 목적에 한해 사용하며, 목적이 달성되거나 보관기간이 끝나면 지체 없이 삭제합니다. 법령에 따른 보존이 필요한 경우에는 해당 기간 동안 안전하게 보관합니다.</p><p>개인정보는 이용자의 동의 없이 제3자에게 제공하지 않습니다. 처리 위탁이나 외부 서비스 연동이 필요한 경우 대상·목적·보유기간을 안내하며, 열람·정정·삭제 요청은 상담 신청 경로로 접수해 주세요.</p>' },
      copyright: { title: '소유·저작권 안내', body: '<p>AI위드스쿨의 브랜드, 로고, 화면 구성, 문구, 강의 자료, 프롬프트 데이터베이스, 카드뉴스와 편집 저작물은 엠아이넥스트㈜ 및 김용한 박사(멘토K)에게 권리가 있습니다.</p><p>사이트 콘텐츠는 개인 학습과 정당한 업무 활용 범위에서 이용할 수 있으나, 출처 없는 재게시·대량 수집·상업적 재판매·무단 편집·브랜드 오용은 허용하지 않습니다. 인용이나 공유가 필요한 경우 원문 링크와 출처를 표시해 주세요.</p><p>외부 모델·이미지·폰트·상표·원문 자료는 각 권리자의 이용 조건을 따릅니다. 권리 침해가 의심되는 자료는 확인 즉시 문의해 주시면 검토 후 조치하겠습니다.</p>' }
    };
    footer.querySelectorAll('[data-legal]').forEach((button) => button.addEventListener('click', () => {
      const item = legalContent[button.dataset.legal];
      if (!item) return;
      legalTitle.textContent = item.title;
      legalBody.innerHTML = item.body;
      legalModal.hidden = false;
      document.body.classList.add('legal-modal-open');
      legalModal.querySelector('.legal-modal-close').focus();
    }));
    legalModal.addEventListener('click', (event) => { if (event.target.closest('[data-legal-close]')) legalClose(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !legalModal.hidden) legalClose(); });
  }
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
