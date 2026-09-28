import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://aiwith.kr';
// Set CONTENT_UPDATED_DATE to the date of the actual page update when publishing.
const updated = process.env.CONTENT_UPDATED_DATE || new Date().toISOString().slice(0, 10);
const logo = `${origin}/assets/aiwith-school-logo.png`;

// Only published, crawlable HTML pages belong here. Add a row when a new static page is published.
const pages = [
  ['/', 'AI위드스쿨 | AI와 함께 배우고, 만들고, 성장하다', 'AI위드스쿨은 AI 웹사이트 구축, AI마케팅, 프롬프트, 책쓰기, 강의와 워크숍을 실제 결과물로 연결하는 멘토K의 실전 AI 교육 플랫폼입니다.', 'WebPage', logo],
  ['/website/', 'AI 홈페이지·웹서비스 구축 강의 | AI위드스쿨', '코딩 없이 Project·Work·Sites로 홈페이지와 웹서비스를 기획·개발·검수·공개하는 김용한 박사의 실전 과정입니다.', 'Course', logo],
  ['/website/benchmark/', '웹사이트 벤치마킹 사례와 체크리스트 | AI위드스쿨', '히어로·메뉴·콘텐츠·CTA·모바일·푸터 기준으로 웹사이트 사례를 비교하고 우리 사이트의 구조를 설계합니다.', 'WebPage', logo],
  ['/marketing-school/', 'AI마케팅스쿨 | AI위드스쿨', 'AI로 시장과 고객을 분석하고 세분화·페르소나·포지셔닝·콘텐츠·채널 전략을 설계하는 실전 마케팅 교육입니다.', 'Course', logo],
  ['/prompt/', 'AI위드스쿨 프롬프트랩', '검색·글쓰기·보고서·강의자료·기획서·이미지·영상·웹·앱 제작에 쓰는 한국어 실전 프롬프트를 검색하고 조합합니다.', 'WebPage', `${origin}/prompt/assets/mentor-k-mark.jpg`],
  ['/book-school/', '책쓰기 스쿨 | AI위드스쿨', '김용한 박사 멘토K와 함께 경험과 전문성을 목차·원고·출간·강의 콘텐츠로 확장하는 AI 책쓰기 과정입니다.', 'Course', logo],
  ['/content-school/', '콘텐츠스쿨 | AI위드스쿨', 'AI 블로그 글쓰기, 인포그래픽, 포스터·카드뉴스, 숏폼 제작과 홍보마케팅을 실습하는 콘텐츠 교육입니다.', 'Course', logo],
  ['/proposal-school/', '기획서·사업계획서 스쿨 | AI위드스쿨', 'AI 리서치와 논리적 구조화로 사업계획서·IR자료·정부지원 사업계획서를 만드는 실전 교육입니다.', 'Course', logo],
  ['/workshops/', '강의·워크숍 | AI위드스쿨', '기업·공공기관과 개인을 위한 AI 웹사이트, 마케팅, 프롬프트, 콘텐츠·기획서 실습형 강의와 워크숍을 안내합니다.', 'CollectionPage', logo],
  ['/columns/', '멘토K 컬럼 | AI위드스쿨', '김용한 박사 멘토K의 AI 활용, 웹사이트, 프롬프트, 책쓰기와 현장 적용 인사이트를 모았습니다.', 'CollectionPage', logo],
  ['/cardnews/', '카드뉴스 | AI위드스쿨', 'AI위드스쿨과 멘토K의 AI 활용 인사이트를 다섯 장의 카드뉴스로 읽어보세요.', 'CollectionPage', `${origin}/assets/cardnews/senior-branding-01.webp`],
  ['/cardnews/senior-branding/', '시니어 브랜딩 카드뉴스 | AI위드스쿨', '시니어의 경험과 전문성을 AI로 정리하고 개인브랜드 콘텐츠로 만드는 카드뉴스 다섯 장입니다.', 'Article', `${origin}/assets/cardnews/senior-branding-01.webp`],
  ['/notices/', '공지사항 | AI위드스쿨', 'AI위드스쿨 프로그램, 강의·워크숍과 운영 소식을 확인하세요.', 'CollectionPage', logo],
  ['/consultation/', '상담 신청 | AI위드스쿨', '웹사이트 구축, AI마케팅, 프롬프트, 책쓰기, 강의와 워크숍 상담을 신청하세요.', 'WebPage', logo],
];

const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const meta = (name, content, attribute = 'name') => `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`;
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const write = (name, data) => fs.writeFileSync(path.join(root, name), data);

for (const [route, title, description, type, image] of pages) {
  const file = `${route.slice(1)}index.html`;
  const canonical = `${origin}${route}`;
  const page = {
    '@type': type === 'Course' || type === 'Article' ? 'WebPage' : type,
    '@id': `${canonical}#webpage`, url: canonical, name: title, description,
    inLanguage: 'ko-KR', isPartOf: {'@id': `${origin}/#website`},
    publisher: {'@id': `${origin}/#organization`},
  };
  const graph = [page];
  if (type === 'Course') graph.push({
    '@type': 'Course', '@id': `${canonical}#course`, name: title, description,
    url: canonical, provider: {'@id': `${origin}/#organization`}, inLanguage: 'ko-KR',
  });
  if (type === 'Article') graph.push({
    '@type': 'Article', '@id': `${canonical}#article`, mainEntityOfPage: {'@id': `${canonical}#webpage`},
    headline: title, description, image: {'@type': 'ImageObject', url: image},
    author: {'@type': 'Person', name: '김용한'},
    publisher: {'@id': `${origin}/#organization`}, inLanguage: 'ko-KR',
  });
  const markup = [
    '<!-- aiwith-discovery:start -->',
    `<title>${escapeHtml(title)}</title>`,
    meta('description', description),
    meta('robots', 'index,follow,max-image-preview:large'),
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="alternate" type="application/rss+xml" title="AI위드스쿨 RSS" href="${origin}/feed.xml">`,
    meta('og:type', type === 'Article' ? 'article' : 'website', 'property'),
    meta('og:site_name', 'AI위드스쿨', 'property'),
    meta('og:locale', 'ko_KR', 'property'),
    meta('og:title', title, 'property'),
    meta('og:description', description, 'property'),
    meta('og:url', canonical, 'property'),
    meta('og:image', image, 'property'),
    meta('og:image:alt', `${title} 대표 이미지`, 'property'),
    meta('og:image:width', String(image.includes('senior-branding-01') ? 960 : image.includes('mentor-k-mark') ? 480 : 1648), 'property'),
    meta('og:image:height', String(image.includes('senior-branding-01') ? 1200 : image.includes('mentor-k-mark') ? 240 : 664), 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
    meta('twitter:image', image),
    `<script id="aiwith-seo-jsonld" type="application/ld+json">${JSON.stringify({'@context': 'https://schema.org', '@graph': graph})}</script>`,
    '<!-- aiwith-discovery:end -->',
  ].join('\n    ');
  let html = read(file);
  if (!html.includes('</head>')) throw new Error(`Missing </head>: ${file}`);
  html = html.replace(/\s*<!-- aiwith-discovery:start -->[\s\S]*?<!-- aiwith-discovery:end -->/g, '');
  html = html.replace(/<title>[^<]*<\/title>\s*/g, '');
  html = html.replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>\s*/g, '');
  html = html.replace(/<link\s+rel="(?:canonical|alternate)"[^>]*>\s*/g, '');
  html = html.replace('</head>', `  ${markup}\n</head>`);
  write(file, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([route]) => `  <url><loc>${origin}${route}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`;
write('sitemap.xml', sitemap);

// The feed includes only files published at stable public URLs. Supabase query-string views
// need their own prerendered URLs before they can be added to sitemap or RSS.
const feedPages = pages.filter(([route]) => !['/consultation/'].includes(route));
const pubDate = new Date(`${updated}T00:00:00+09:00`).toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>AI위드스쿨 | 멘토K 실전 AI 교육</title>\n    <link>${origin}/</link>\n    <description>AI위드스쿨의 공개 교육 프로그램·카드뉴스·컬럼·공지 안내</description>\n    <language>ko-KR</language>\n    <lastBuildDate>${pubDate}</lastBuildDate>\n${feedPages.map(([route, title, description]) => `    <item><title>${escapeHtml(title)}</title><link>${origin}${route}</link><guid isPermaLink="true">${origin}${route}</guid><description>${escapeHtml(description)}</description></item>`).join('\n')}\n  </channel>\n</rss>\n`;
write('feed.xml', rss);
