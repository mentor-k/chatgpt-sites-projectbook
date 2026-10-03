import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ORIGIN='https://aiwith.kr';
export const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const day=value=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
export function validate(plan,data,now=new Date()){
  if(plan.topics.length!==30||new Set(plan.topics.map(t=>t.id)).size!==30)throw new Error('30개 고유 주제가 필요합니다.');
  if(new Set(data.posts.map(p=>p.topicId)).size!==data.posts.length||new Set(data.posts.map(p=>p.slug)).size!==data.posts.length)throw new Error('중복 주제');
  const ids=new Set(),slugs=new Set(),dates=new Set();
  for(const p of data.posts){
    const topic=plan.topics.find(t=>t.id===p.topicId);
    if(!topic||p.slug!==topic.slug||!/^[-a-z0-9]+$/.test(p.slug))throw new Error('알 수 없는 주제/slug');
    if(ids.has(p.topicId)||slugs.has(p.slug))throw new Error('중복 주제');
    ids.add(p.topicId);slugs.add(p.slug);
    if(p.status!=='published')throw new Error('공개 원고만 posts에 저장합니다.');
    const at=new Date(p.publishedAt),updated=new Date(p.updatedAt);
    if(!Number.isFinite(at.getTime())||at>now||!Number.isFinite(updated.getTime())||updated<at||updated>now)throw new Error('잘못되거나 미래인 게시 시각');
    const date=day(p.publishedAt);if(dates.has(date))throw new Error('같은 날 중복 게시');dates.add(date);
    for(const k of ['title','subtitle','summary'])if(typeof p[k]!=='string'||!p[k].trim())throw new Error('필수 문구 누락: '+k);
    if(!Array.isArray(p.sections)||p.sections.length<2||p.sections.length>4)throw new Error('소제목 2~4개 필요');
    for(const s of p.sections)if(!s.heading||!Array.isArray(s.paragraphs)||!s.paragraphs.length||s.paragraphs.some(v=>typeof v!=='string'||!v.trim()))throw new Error('본문 문단 누락');
    const length=p.sections.flatMap(s=>s.paragraphs).join('').length;
    if(length<1800||length>2600)throw new Error('본문 글자수 범위: '+length);
    if(!p.cta?.text||!Array.isArray(p.hashtags)||p.hashtags.length!==6)throw new Error('CTA·해시태그 6개 필요');
    if(!p.originality?.note||!Array.isArray(p.originality.queries)||p.originality.queries.length<3||!Number.isFinite(new Date(p.originality.checkedAt).getTime())||new Date(p.originality.checkedAt)>now)throw new Error('제목·본문 유사성 검수 기록 필요');
    for(const old of data.posts){if(old!==p&&old.title===p.title)throw new Error('중복 제목');if(old!==p&&old.sections.flatMap(s=>s.paragraphs).some(v=>v.length>80&&p.sections.flatMap(s=>s.paragraphs).includes(v)))throw new Error('이전 원고 문단 재사용');}
    for(const s of p.sources||[])if(!s.label||!/^https?:\/\//.test(s.url))throw new Error('출처 오류');
  }
  return true;
}
const meta=(name,value,attr='name')=>`<meta ${attr}="${name}" content="${esc(value)}">`;
function shell(title,description,url,body,graph){
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | AI위드스쿨</title>${meta('description',description)}${meta('robots','index,follow,max-image-preview:large')}<link rel="canonical" href="${url}"><link rel="alternate" type="application/rss+xml" title="멘토K 컬럼 RSS" href="${ORIGIN}/columns/feed.xml">${meta('og:title',title,'property')}${meta('og:description',description,'property')}${meta('og:url',url,'property')}${meta('og:type',graph['@type']==='Article'?'article':'website','property')}${meta('og:image',ORIGIN+'/assets/aiwith-school-logo.png','property')}<link rel="stylesheet" href="/site.css?v=20260916-1"><link rel="stylesheet" href="/columns/columns.css?v=20261003-1"><script id="aiwith-seo-jsonld" type="application/ld+json">${JSON.stringify({'@context':'https://schema.org',...graph}).replace(/</g,'\\u003c')}</script></head><body><div data-site-header></div><main>${body}</main><div data-site-footer></div><script src="/site.js?v=20261003-1"></script><script src="/navigation-enhancements.js?v=20260915-1"></script><script src="/analytics-tracker.js?v=20260915-1"></script></body></html>\n`;
}
function card(p){return `<article class="column-archive-card"><small>${esc(day(p.publishedAt))} · 김용한 박사(멘토K)</small><h3><a href="/columns/${p.slug}/">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><a href="/columns/${p.slug}/">컬럼 읽기</a></article>`}
export function renderColumns(root=ROOT){
  const read=name=>fs.readFileSync(path.join(root,name),'utf8');
  const write=(name,value)=>{const file=path.join(root,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value)};
  const plan=JSON.parse(read('columns/topics.json')),data=JSON.parse(read('columns/posts.json'));
  validate(plan,data);
  const posts=[...data.posts].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  const listing=posts.length?'<div class="column-archive-grid">'+posts.map(card).join('')+'</div>':'<div class="column-empty"><p>AI 교육과 현장 실행을 연결하는 30편의 컬럼을 준비하고 있습니다. 첫 발행은 2026년 10월 4일 오전 8시 작성 작업 이후입니다.</p><a href="/columns/plan/">30개 주제와 교육 대상 보기</a></div>';
  let template=read('columns/index.template').replace(/<!-- columns-published:start -->[\s\S]*?<!-- columns-published:end -->/,'<!-- columns-published:start -->'+listing+'<!-- columns-published:end -->');
  template=template.replace('/site.js?v=20260916-1','/site.js?v=20261003-1');
  template=template.replace('</head>','<link rel="alternate" type="application/rss+xml" title="멘토K 컬럼 RSS" href="https://aiwith.kr/columns/feed.xml"></head>');
  write('columns/index.html',template);
  for(const p of posts){
    const url=ORIGIN+'/columns/'+p.slug+'/';
    const sources=(p.sources||[]).length?'<section class="column-sources"><h2>참고한 원문</h2><ul>'+(p.sources||[]).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')+'</ul></section>':'';
    const body=`<article class="column-reading"><p><a href="/columns/">멘토K 컬럼 전체 보기</a></p><header><p class="kicker">MENTOR K COLUMN</p><h1>${esc(p.title)}</h1><p class="column-subtitle">${esc(p.subtitle)}</p><p class="column-meta">김용한 박사(멘토K) · <time datetime="${esc(p.publishedAt)}">${esc(day(p.publishedAt))}</time></p></header><div class="column-summary"><b>핵심 요약</b><p>${esc(p.summary)}</p></div><div class="column-body">${p.sections.map(s=>'<section><h2>'+esc(s.heading)+'</h2>'+s.paragraphs.map(v=>'<p>'+esc(v)+'</p>').join('')+'</section>').join('')}${p.takeaway?'<p><strong>'+esc(p.takeaway)+'</strong></p>':''}</div>${sources}<aside class="column-cta"><h2>강의·워크숍 상담</h2><p>${esc(p.cta.text)}</p><div class="column-toolbar"><a class="button primary" href="/consultation/">맞춤 교육 의뢰</a><a class="button ghost" href="/workshops/">프로그램 보기</a><a href="tel:01033387110">010-3338-7110</a></div></aside><p class="column-tags">${p.hashtags.map(t=>esc(t.startsWith('#')?t:'#'+t)).join(' ')}</p><p class="column-meta">필자: 김용한 박사(멘토K) · 엠아이넥스트㈜ 대표 · AI 활용과 마케팅, 현장 실행을 연결하는 강의·워크숍과 컨설팅을 진행합니다.</p></article>`;
    write('columns/'+p.slug+'/index.html',shell(p.title,p.summary,url,body,{'@type':'Article',headline:p.title,description:p.summary,datePublished:p.publishedAt,dateModified:p.updatedAt,inLanguage:'ko-KR',mainEntityOfPage:url,author:{'@type':'Person',name:'김용한',url:ORIGIN+'/workshops/'},publisher:{'@type':'Organization',name:'AI위드스쿨',url:ORIGIN+'/'}}));
  }
  const done=new Set(posts.map(p=>p.topicId));
  const table='<div class="column-plan-wrap"><table class="column-plan"><thead><tr><th>순서</th><th>컬럼 제목</th><th>교육 대상</th><th>연결 프로그램</th><th>상태</th></tr></thead><tbody>'+plan.topics.map(t=>`<tr><td>${t.id}</td><td>${esc(t.title)}</td><td>${esc(t.audience)}</td><td>${esc(t.program)}</td><td>${done.has(t.id)?'게시 완료':'대기'}</td></tr>`).join('')+'</tbody></table></div>';
  write('columns/plan/index.html',shell('멘토K 컬럼 30개 발행 계획','AI 강의·워크숍과 연결되는 30개 컬럼 주제와 교육 대상을 확인하세요.',ORIGIN+'/columns/plan/',`<section class="page-section"><p class="kicker">COLUMN PLAN</p><h1>멘토K 컬럼 30개 발행 계획</h1><p>조직·AX, 소상공인 마케팅, 시니어·개인브랜딩, 웹·콘텐츠, 창업·지역의 교육 과제를 다룹니다.</p><p>${done.size} / 30편 게시 완료 · 2026년 10월 4일부터 한국시간 오전 8시 작성 작업 시작</p><div class="column-toolbar"><a class="button primary" href="/columns/">컬럼 전체 보기</a><a class="button ghost" href="/admin/#writing">컬럼 글쓰기</a></div>${table}</section>`,{'@type':'CollectionPage',name:'멘토K 컬럼 발행 계획',url:ORIGIN+'/columns/plan/'}));
  if(fs.existsSync(path.join(root,'index.html'))){
    const home=read('index.html');
    const images=['/assets/cardnews/senior-branding-01.webp','/assets/cardnews/senior-branding-02.webp','/assets/books/ai-expert-book.webp','/assets/cardnews/senior-branding-04.webp'];
    const tiles=posts.length?'<div class="content-card-grid">'+posts.slice(0,4).map((p,i)=>`<article class="content-card"><a href="/columns/${p.slug}/"><img src="${images[i]}" alt="AI위드스쿨 교육 관련 이미지" loading="lazy"><div><small>${esc(day(p.publishedAt))}</small><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div></a></article>`).join('')+'</div>':'<p>현장의 AI 활용을 돕는 전문 컬럼 30편을 준비하고 있습니다. <a href="/columns/plan/">발행 주제와 교육 대상 보기 →</a></p>';
    write('index.html',home.replace(/<!-- columns-home:start -->[\s\S]*?<!-- columns-home:end -->/,'<!-- columns-home:start -->'+tiles+'<!-- columns-home:end -->'));
  }
  if(fs.existsSync(path.join(root,'sitemap.xml'))){
    let xml=read('sitemap.xml');
    const routes=[{url:ORIGIN+'/columns/',date:day(new Date())},{url:ORIGIN+'/columns/plan/',date:day(new Date())},...posts.map(p=>({url:ORIGIN+'/columns/'+p.slug+'/',date:day(p.updatedAt)}))];
    for(const r of routes){xml=xml.replace(/\s*<url>[\s\S]*?<\/url>/g,block=>block.includes('<loc>'+r.url+'</loc>')?'':block);xml=xml.replace('</urlset>',`  <url><loc>${r.url}</loc><lastmod>${r.date}</lastmod></url>\n</urlset>`)}
    write('sitemap.xml',xml);
  }
  const feed=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>멘토K 컬럼 · AI위드스쿨</title><link>${ORIGIN}/columns/</link><description>AI 강의·워크숍과 현장 실행 인사이트</description><language>ko-KR</language>${posts.map(p=>`<item><title>${esc(p.title)}</title><link>${ORIGIN}/columns/${p.slug}/</link><guid isPermaLink="true">${ORIGIN}/columns/${p.slug}/</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`).join('')}</channel></rss>\n`;
  write('columns/feed.xml',feed);
  if(posts.length&&fs.existsSync(path.join(root,'feed.xml'))){
    let xml=read('feed.xml');
    for(const p of posts){const url=ORIGIN+'/columns/'+p.slug+'/';xml=xml.replace(/\s*<item>[\s\S]*?<\/item>/g,block=>block.includes(url)?'':block)}
    const items=feed.match(/<item>[\s\S]*?<\/item>/g)||[];
    xml=xml.replace('</channel>',items.join('\n')+'\n</channel>');write('feed.xml',xml);
  }
  return {published:posts.length,next:plan.topics.find(t=>!done.has(t.id))?.id||null};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const plan=JSON.parse(fs.readFileSync(path.join(ROOT,'columns/topics.json'),'utf8'));
  const data=JSON.parse(fs.readFileSync(path.join(ROOT,'columns/posts.json'),'utf8'));
  validate(plan,data);
  console.log(process.argv.includes('--check')?{valid:true,published:data.posts.length}:renderColumns());
}
