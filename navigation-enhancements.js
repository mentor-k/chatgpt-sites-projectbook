(() => {
  'use strict';
  const boot = () => {
    const header = document.querySelector('[data-site-header]');
    const nav = header?.querySelector('.global-nav');
    if (!nav || nav.dataset.enhanced === 'true') return;
    nav.dataset.enhanced = 'true';
    const websiteGroup = nav.querySelector('.nav-group');
    const websiteButton = websiteGroup?.querySelector(':scope > button');
    if (websiteButton) websiteButton.firstChild.textContent = '웹사이트 스쿨 ';
    const makeGroup = (label, links) => {
      const group = document.createElement('div');
      group.className = 'nav-group';
      group.innerHTML = `<button type="button" aria-expanded="false">${label} <i>⌄</i></button><div class="nav-sub">${links.map((link) => `<a href="${link.href}">${link.label}</a>`).join('')}</div>`;
      const button = group.querySelector('button');
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        nav.querySelectorAll('.nav-group > button').forEach((item) => { item.setAttribute('aria-expanded', 'false'); item.parentElement.classList.remove('open'); });
        button.setAttribute('aria-expanded', String(open));
        group.classList.toggle('open', open);
      });
      group.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.querySelectorAll('.nav-group').forEach((item) => item.classList.remove('open')); }));
      return group;
    };
    const content = makeGroup('콘텐츠스쿨', [
      { href: '/content-school/', label: '콘텐츠스쿨 소개' },
      { href: '/content-school/#blog', label: 'AI 블로그 글쓰기' },
      { href: '/content-school/#visual', label: '인포그래픽·포스터·카드뉴스' },
      { href: '/content-school/#shortform', label: '숏폼 만들기·홍보마케팅' }
    ]);
    const proposal = makeGroup('기획서·사업계획서 스쿨', [
      { href: '/proposal-school/', label: '기획서·사업계획서 스쿨 소개' },
      { href: '/proposal-school/#business', label: '사업계획서·IR자료' },
      { href: '/proposal-school/#government', label: '정부지원 사업계획서' }
    ]);
    const prompt = nav.querySelector('a[href="/prompt/"]');
    if (prompt && !nav.querySelector('a[href="/content-school/"]')) { nav.insertBefore(content, prompt); nav.insertBefore(proposal, prompt); }
    const path = location.pathname.replace(/\/index\.html$/, '/');
    nav.querySelectorAll('a').forEach((link) => { const href = link.getAttribute('href'); if (href && href.split('#')[0] !== '/' && path.startsWith(href.split('#')[0])) link.classList.add('active'); });
    if (!path.startsWith('/admin/') && path !== '/website/' && !document.querySelector('.aiwith-float-cta')) {
      const cta = document.createElement('a');
      cta.className = 'aiwith-float-cta';
      cta.href = '/consultation/';
      cta.setAttribute('aria-label', '강의·워크숍 신청 상담 010-3338-7110');
      cta.innerHTML = '<span>강의·워크숍<br><b>신청하기</b></span><strong>010-3338-<br>7110</strong><i aria-hidden="true">→</i>';
      document.body.appendChild(cta);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
