(() => {
  'use strict';
  const path = location.pathname.replace(/\/index\.html$/, '/') || '/';
  const pages = {
    '/': ['AI위드스쿨 | AI와 함께 배우고, 만들고, 성장하다', 'AI위드스쿨은 김용한 박사(멘토K)의 실전 AI 교육 플랫폼입니다. AI 웹사이트 구축, AI마케팅, 프롬프트, 콘텐츠·기획서, 책쓰기, 강의와 워크숍을 실제 결과물로 연결합니다.', 'AI위드스쿨, 멘토K, 김용한 박사, AI 교육, AI 웹사이트 구축, AI마케팅, 프롬프트, 책쓰기, 강의, 워크숍'],
    '/website/': ['AI 홈페이지·웹서비스 구축 강의 | AI위드스쿨', '코딩 없이 Project·Work·Sites로 홈페이지와 웹서비스를 기획·개발·검수·공개하는 김용한 박사의 4시간 실전 과정입니다.', 'AI 홈페이지 구축, 웹서비스 구축 강의, 코딩 없는 웹개발, Project Work Sites'],
    '/website/benchmark/': ['웹사이트 벤치마킹 사례와 체크리스트 | AI위드스쿨', '히어로·메뉴·콘텐츠·CTA·모바일·푸터를 기준으로 좋은 웹사이트 사례를 비교하고 우리 사이트의 구조를 설계하는 자료입니다.', '웹사이트 벤치마킹, 홈페이지 사례, 웹디자인 참고, UX 체크리스트'],
    '/marketing-school/': ['AI마케팅스쿨 | 고객·콘텐츠·매출을 연결하는 실전 교육', 'AI로 시장과 고객을 분석하고 세분화·페르소나·포지셔닝·콘텐츠·채널 전략을 설계해 매출로 연결하는 실전 마케팅 교육입니다.', 'AI마케팅, AI마케팅스쿨, 소상공인 마케팅, 스타트업 마케팅, 페르소나'],
    '/content-school/': ['콘텐츠스쿨 | AI 블로그·인포그래픽·카드뉴스·숏폼', 'AI로 블로그 글, 인포그래픽, 포스터, 카드뉴스와 숏폼을 만들고 홍보·상담 전환까지 연결하는 실습형 콘텐츠 교육입니다.', 'AI 콘텐츠 제작, AI 블로그 글쓰기, 인포그래픽, 카드뉴스, 숏폼'],
    '/proposal-school/': ['기획서·사업계획서 스쿨 | AI로 논리와 근거를 설계하다', '소상공인과 스타트업의 아이디어를 사업계획서·IR자료·정부지원 사업계획서로 구조화하는 AI 실전 교육입니다.', '사업계획서 작성, IR자료, 정부지원 사업계획서, AI 기획서'],
    '/prompt/': ['AI 프롬프트랩 | 업무·기획·이미지·웹·앱 실전 프롬프트', '검색·글쓰기·보고서·강의자료·기획서·이미지·영상·웹·앱·쇼핑몰 제작에 바로 쓰는 한국어 실전 프롬프트를 검색하고 조합합니다.', 'AI 프롬프트, 프롬프트랩, ChatGPT 프롬프트, 이미지 프롬프트, 웹개발 프롬프트'],
    '/book-school/': ['책쓰기 스쿨 | 경험을 책과 개인브랜드로 만드는 AI 집필 과정', '김용한 박사(멘토K)와 함께 시니어와 전문가의 경험을 목차·원고·출간·강의 콘텐츠로 확장하는 AI 책쓰기 스쿨입니다.', 'AI 책쓰기, 책쓰기 스쿨, 전문가 브랜딩, 시니어 책쓰기'],
    '/workshops/': ['AI 강의·워크숍 | 기관·기업 맞춤 실전 프로그램', 'AI 초보·시니어부터 기업·공공기관까지 대상과 과제에 맞춰 웹사이트, 프롬프트, 콘텐츠, 기획서와 AI 활용 워크숍을 설계합니다.', 'AI 강의, AI 워크숍, 기관 교육, 기업 교육, 생성형 AI 교육'],
    '/columns/': ['멘토K 컬럼 | AI 활용과 현장 실행 인사이트', '김용한 박사(멘토K)가 AI 교육·웹사이트·프롬프트·책쓰기·마케팅 현장에서 얻은 실행 인사이트를 기록합니다.', '멘토K 컬럼, 김용한 박사, AI 인사이트, AI 교육'],
    '/cardnews/': ['AI위드스쿨 카드뉴스 | 멘토K의 AI 활용 인사이트', 'AI와 개인브랜딩, 웹사이트, 마케팅과 현장 실행 주제를 5장의 카드뉴스로 쉽게 읽는 AI위드스쿨 콘텐츠입니다.', 'AI 카드뉴스, 멘토K 카드뉴스, AI 활용, 개인브랜딩'],
    '/cardnews/senior-branding/': ['시니어 브랜딩 카드뉴스 | AI위드스쿨', 'AI로 시니어의 경험과 전문성을 개인브랜드로 정리하는 5장 카드뉴스입니다.', '시니어 브랜딩, AI 개인브랜딩, 카드뉴스'],
    '/notices/': ['공지사항 | AI위드스쿨 프로그램·운영 소식', 'AI위드스쿨의 새 강의·워크숍, 프롬프트 자료, 카드뉴스와 사이트 운영 업데이트를 안내합니다.', 'AI위드스쿨 공지, AI 강의 소식, 프롬프트 업데이트'],
    '/consultation/': ['상담 신청 | AI위드스쿨 맞춤 강의·워크숍·콘텐츠', '웹사이트 구축, AI마케팅, 프롬프트, 콘텐츠, 책쓰기와 강의·워크숍에 필요한 목표·일정·결과물을 남기면 맞춤 진행방식을 제안합니다.', 'AI 교육 상담, AI 강의 문의, AI 워크숍 신청, 웹사이트 구축 상담']
  };
  const [title, description, keywords] = pages[path] || pages['/'];
  const url = `https://aiwith.kr${path}`;
  const image = path === '/prompt/' ? 'https://aiwith.kr/prompt/assets/mentor-k-mark.jpg' : 'https://aiwith.kr/assets/aiwith-school-logo.png';
  const meta = (attr, key, value) => {
    let node = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attr, key); document.head.appendChild(node); }
    node.content = value;
  };
  const addLink = (rel, href, type, titleText) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const node = document.createElement('link'); node.rel = rel; node.href = href; if (type) node.type = type; if (titleText) node.title = titleText; document.head.appendChild(node);
  };
  document.title = title;
  meta('name', 'description', description); meta('name', 'keywords', keywords); meta('name', 'author', '김용한 박사(멘토K) · 엠아이넥스트㈜'); meta('name', 'robots', path.startsWith('/cardnews/view/') ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'); meta('name', 'googlebot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'); meta('name', 'naverbot', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  meta('property', 'og:site_name', 'AI위드스쿨'); meta('property', 'og:type', 'website'); meta('property', 'og:locale', 'ko_KR'); meta('property', 'og:title', title); meta('property', 'og:description', description); meta('property', 'og:url', url); meta('property', 'og:image', image); meta('property', 'og:image:alt', `${title} 대표 이미지`); meta('name', 'twitter:card', 'summary_large_image'); meta('name', 'twitter:title', title); meta('name', 'twitter:description', description); meta('name', 'twitter:image', image); addLink('alternate', 'https://aiwith.kr/feed.xml', 'application/rss+xml', 'AI위드스쿨 RSS');
  const org = {'@type':'Organization','@id':'https://aiwith.kr/#organization',name:'AI위드스쿨',legalName:'엠아이넥스트㈜',url:'https://aiwith.kr/',logo:'https://aiwith.kr/assets/aiwith-school-logo-footer.png',founder:{'@type':'Person',name:'김용한',jobTitle:'경영학박사·경영지도사',brand:'멘토K'}};
  const graph = [org, {'@type':'WebSite','@id':'https://aiwith.kr/#website',name:'AI위드스쿨',url:'https://aiwith.kr/',inLanguage:'ko-KR',publisher:{'@id':'https://aiwith.kr/#organization'}}, {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,isPartOf:{'@id':'https://aiwith.kr/#website'},about:{'@id':'https://aiwith.kr/#organization'},inLanguage:'ko-KR',dateModified:'2026-09-16'}];
  const labels = {website:'웹사이트 스쿨',benchmark:'웹사이트 벤치마킹','marketing-school':'AI마케팅스쿨','content-school':'콘텐츠스쿨','proposal-school':'기획서·사업계획서 스쿨',prompt:'AI 프롬프트랩','book-school':'책쓰기 스쿨',workshops:'강의·워크숍',columns:'멘토K 컬럼',cardnews:'카드뉴스','senior-branding':'시니어 브랜딩',notices:'공지사항',consultation:'상담 신청'};
  if (path !== '/' && !path.startsWith('/cardnews/view/')) { const parts = path.split('/').filter(Boolean); const items = [{'@type':'ListItem',position:1,name:'AI위드스쿨',item:'https://aiwith.kr/'}]; parts.forEach((part,i)=>items.push({'@type':'ListItem',position:i+2,name:labels[part]||part,item:`https://aiwith.kr/${parts.slice(0,i+1).join('/')}/`})); graph.push({'@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:items}); }
  if (['/website/','/marketing-school/','/content-school/','/proposal-school/','/prompt/','/book-school/','/workshops/'].includes(path)) graph.push({'@type':'Course',name:title.replace(' | AI위드스쿨',''),description,provider:{'@id':'https://aiwith.kr/#organization'},inLanguage:'ko-KR',educationalLevel:'초급·실무'});
  if (!document.head.querySelector('#aiwith-seo-jsonld')) { const script = document.createElement('script'); script.id='aiwith-seo-jsonld'; script.type='application/ld+json'; script.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph}); document.head.appendChild(script); }
})();
