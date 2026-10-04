import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {hardenHtml} from './build-security.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ORIGIN='https://aiwith.kr';
export const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const day=value=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
const containsAny=(text,words)=>words.some(word=>text.includes(word));
const keywordList=value=>Array.isArray(value)&&value.length>=1&&value.length<=5&&value.every(v=>typeof v==='string'&&v.trim().length>=2&&v.length<=45)&&new Set(value).size===value.length;
const safeProgram=value=>['/workshops/','/website/','/marketing-school/','/content-school/','/proposal-school/','/book-school/','/prompt/'].includes(value);
export function imageDimensions(buffer){
  if(buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
  if(buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP'){
    const kind=buffer.toString('ascii',12,16);
    if(kind==='VP8X')return {width:1+buffer.readUIntLE(24,3),height:1+buffer.readUIntLE(27,3)};
    if(kind==='VP8 ')return {width:buffer.readUInt16LE(26)&0x3fff,height:buffer.readUInt16LE(28)&0x3fff};
    if(kind==='VP8L'){const bits=buffer.readUInt32LE(21);return {width:1+(bits&0x3fff),height:1+((bits>>>14)&0x3fff)}}
  }
  throw new Error('PNG 또는 WebP 대표이미지가 필요합니다.');
}
export function validateCovers(data,root=ROOT){
  for(const p of data.posts){
    const file=path.join(root,p.cover.src.slice(1));
    if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw new Error('대표이미지 파일 누락: '+p.slug);
    const size=imageDimensions(fs.readFileSync(file));
    if(size.width!==p.cover.width||size.height!==p.cover.height)throw new Error('실제 대표이미지 크기 불일치: '+p.slug);
  }
}
export function validate(plan,data,now=new Date()){
  if(plan.topics.length!==30||new Set(plan.topics.map(t=>t.id)).size!==30)throw new Error('30개 고유 주제가 필요합니다.');
  for(const t of plan.topics){if(!keywordList(t.targetKeywords)||!keywordList(t.problemKeywords)||!t.primaryKeyword||!t.coverPose||!safeProgram(t.programUrl)||!Array.isArray(t.deliverables)||t.deliverables.length<2)throw new Error('주제별 키워드·대표이미지 동작·프로그램 계획 누락');if(!containsAny(t.title,t.targetKeywords)||!containsAny(t.title,t.problemKeywords)||!t.title.includes(t.primaryKeyword))throw new Error('주제 제목에 타겟·문제·핵심어 필요: '+t.id)}
  if(new Set(data.posts.map(p=>p.topicId)).size!==data.posts.length||new Set(data.posts.map(p=>p.slug)).size!==data.posts.length)throw new Error('중복 주제');
  const ids=new Set(),slugs=new Set(),dates=new Set(),poses=new Set();
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
    if(!keywordList(p.targetKeywords)||!keywordList(p.problemKeywords)||typeof p.primaryKeyword!=='string'||!p.primaryKeyword)throw new Error('타겟·문제상황 키워드 누락');
    const body=p.sections.flatMap(s=>s.paragraphs).join(' ');
    for(const [label,text] of [['제목',p.title],['요약',p.summary],['본문',body]])if(!containsAny(text,p.targetKeywords)||!containsAny(text,p.problemKeywords))throw new Error(label+'에 타겟·문제상황 키워드 필요');
    if(!p.title.includes(p.primaryKeyword)||!body.includes(p.primaryKeyword))throw new Error('제목·본문에 주제 핵심어 필요');
    if(!p.cover||!new RegExp('^/assets/columns/'+p.slug+'\\.(webp|png)$').test(p.cover.src)||!p.cover.alt||!p.cover.caption||!p.cover.pose||!p.cover.headline)throw new Error('멘토K 대표이미지 정보 누락');
    if(!Number.isInteger(p.cover.width)||!Number.isInteger(p.cover.height)||p.cover.width<1200||p.cover.height<800||Math.abs(p.cover.width/p.cover.height-1.5)>0.01)throw new Error('대표이미지는 최소 1200×800, 3:2 비율이어야 합니다.');
    if(poses.has(p.cover.pose))throw new Error('멘토K 이미지 동작 중복');poses.add(p.cover.pose);
    if(p.cover.pose!==topic.coverPose||p.primaryKeyword!==topic.primaryKeyword)throw new Error('주제의 대표이미지 동작·핵심어 계획과 불일치');
    if(!p.cta.program||!p.cta.audience||!safeProgram(p.cta.programUrl)||!Array.isArray(p.cta.deliverables)||p.cta.deliverables.length<2||p.cta.deliverables.some(v=>typeof v!=='string'||!v.trim()))throw new Error('교육 대상·프로그램·산출물 필요');
    if(!Array.isArray(p.faq)||p.faq.length<2||p.faq.length>4||p.faq.some(q=>!q.question||!q.answer))throw new Error('실제 독자 질문·답변 2~4개 필요');
    if(!p.originality?.note||!Array.isArray(p.originality.queries)||p.originality.queries.length<3||!Number.isFinite(new Date(p.originality.checkedAt).getTime())||new Date(p.originality.checkedAt)>now)throw new Error('제목·본문 유사성 검수 기록 필요');
    for(const old of data.posts){if(old!==p&&old.title===p.title)throw new Error('중복 제목');if(old!==p&&old.sections.flatMap(s=>s.paragraphs).some(v=>v.length>80&&p.sections.flatMap(s=>s.paragraphs).includes(v)))throw new Error('이전 원고 문단 재사용');}
    for(const s of p.sources||[])if(!s.label||!/^https?:\/\//.test(s.url))throw new Error('출처 오류');
  }
  return true;
}
const meta=(name,value,attr='name')=>`<meta ${attr}="${name}" content="${esc(value)}">`;
function shell(title,description,url,body,graph,post){
  const isArticle=!!post,image=post?ORIGIN+post.cover.src:ORIGIN+'/assets/aiwith-school-logo.png';
  const imageMeta=post?meta('og:image:alt',post.cover.alt,'property')+meta('og:image:width',post.cover.width,'property')+meta('og:image:height',post.cover.height,'property'):'';
  const articleMeta=post?meta('article:published_time',post.publishedAt,'property')+meta('article:modified_time',post.updatedAt,'property')+meta('article:author',ORIGIN+'/workshops/','property'):'';
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | AI위드스쿨</title>${meta('description',description)}${meta('author','김용한 박사(멘토K) · 엠아이넥스트㈜')}${meta('robots','index,follow,max-image-preview:large,max-snippet:-1')}<link rel="canonical" href="${url}"><link rel="alternate" type="application/rss+xml" title="멘토K 컬럼 RSS" href="${ORIGIN}/columns/feed.xml">${meta('og:site_name','AI위드스쿨','property')}${meta('og:locale','ko_KR','property')}${meta('og:title',title,'property')}${meta('og:description',description,'property')}${meta('og:url',url,'property')}${meta('og:type',isArticle?'article':'website','property')}${meta('og:image',image,'property')}${imageMeta}${articleMeta}${meta('twitter:card','summary_large_image')}${meta('twitter:title',title)}${meta('twitter:description',description)}${meta('twitter:image',image)}${post?meta('twitter:image:alt',post.cover.alt):''}<link rel="stylesheet" href="/site.css?v=20260916-1"><link rel="stylesheet" href="/columns/columns.css?v=20261004-1"><script id="aiwith-seo-jsonld" type="application/ld+json">${JSON.stringify({'@context':'https://schema.org',...graph}).replace(/</g,'\\u003c')}</script></head><body><div data-site-header></div><main>${body}</main><div data-site-footer></div><script src="/site.js?v=20261003-1"></script><script src="/navigation-enhancements.js?v=20260915-1"></script><script src="/analytics-tracker.js?v=20260915-1"></script></body></html>\n`;
}
function coverImage(p,lazy=true){return `<img class="column-cover-image" src="${esc(p.cover.src)}" alt="${esc(p.cover.alt)}" width="${p.cover.width}" height="${p.cover.height}" decoding="async" ${lazy?'loading="lazy"':'fetchpriority="high"'}>`}
function inquiryLink(p){return '/consultation/?column='+encodeURIComponent(p.slug)}
function card(p){return `<article class="column-archive-card"><a class="column-cover-link" href="/columns/${p.slug}/">${coverImage(p)}</a><div class="column-card-copy"><small>${esc(day(p.publishedAt))} · 김용한 박사(멘토K)</small><h3><a href="/columns/${p.slug}/">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><a href="/columns/${p.slug}/">컬럼 읽기</a></div></article>`}
export function renderColumns(root=ROOT){
  const read=name=>fs.readFileSync(path.join(root,name),'utf8');
  const write=(name,value)=>{const file=path.join(root,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value)};
  const plan=JSON.parse(read('columns/topics.json')),data=JSON.parse(read('columns/posts.json'));
  validate(plan,data);validateCovers(data,root);
  const posts=[...data.posts].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  const listing=posts.length?'<div class="column-archive-grid">'+posts.map(card).join('')+'</div>':'<div class="column-empty"><p>AI 교육과 현장 실행을 연결하는 30편의 컬럼을 준비하고 있습니다. 첫 발행은 2026년 10월 4일 오전 8시 작성 작업 이후입니다.</p><a href="/columns/plan/">30개 주제와 교육 대상 보기</a></div>';
  let template=read('columns/index.template').replace(/<!-- columns-published:start -->[\s\S]*?<!-- columns-published:end -->/,'<!-- columns-published:start -->'+listing+'<!-- columns-published:end -->');
  template=template.replace('/site.js?v=20260916-1','/site.js?v=20261003-1');
  template=template.replace('</head>','<link rel="alternate" type="application/rss+xml" title="멘토K 컬럼 RSS" href="https://aiwith.kr/columns/feed.xml"></head>');
  write('columns/index.html',template);
  for(const p of posts){
    const url=ORIGIN+'/columns/'+p.slug+'/';
    const sources=(p.sources||[]).length?'<section class="column-sources"><h2>참고한 원문</h2><ul>'+(p.sources||[]).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')+'</ul></section>':'';
    const faq='<section class="column-faq"><h2>이 주제의 질문과 답변</h2>'+p.faq.map(q=>'<section><h3>'+esc(q.question)+'</h3><p>'+esc(q.answer)+'</p></section>').join('')+'</section>';
    const body=`<article class="column-reading"><nav class="column-breadcrumb" aria-label="현재 위치"><a href="/">AI위드스쿨</a><span> / </span><a href="/columns/">멘토K 컬럼</a></nav><header><p class="kicker">MENTOR K COLUMN · ${esc(plan.topics.find(t=>t.id===p.topicId).category)}</p><h1>${esc(p.title)}</h1><p class="column-subtitle">${esc(p.subtitle)}</p><p class="column-meta">김용한 박사(멘토K) · 발행 <time datetime="${esc(p.publishedAt)}">${esc(day(p.publishedAt))}</time>${p.updatedAt!==p.publishedAt?' · 수정 <time datetime="'+esc(p.updatedAt)+'">'+esc(day(p.updatedAt))+'</time>':''}</p></header><figure class="column-cover">${coverImage(p,false)}<figcaption>${esc(p.cover.caption)}</figcaption></figure><div class="column-summary"><h2>핵심 답변</h2><p>${esc(p.summary)}</p></div><div class="column-body">${p.sections.map(s=>'<section><h2>'+esc(s.heading)+'</h2>'+s.paragraphs.map(v=>'<p>'+esc(v)+'</p>').join('')+'</section>').join('')}${p.takeaway?'<p><strong>'+esc(p.takeaway)+'</strong></p>':''}</div>${faq}${sources}<aside class="column-cta"><p class="kicker">이 문제를 교육 과제로 바꾸기</p><h2>${esc(p.cta.program)}</h2><p>${esc(p.cta.text)}</p><dl><dt>교육 대상</dt><dd>${esc(p.cta.audience)}</dd><dt>협의할 실습 산출물</dt><dd>${p.cta.deliverables.map(esc).join(' · ')}</dd><dt>상담 준비</dt><dd>대상·인원·현재 수준·일정·해결할 업무를 알려주세요. 교육 구성과 진행 범위는 상담 후 협의합니다.</dd></dl><div class="column-toolbar"><a class="button primary" href="${inquiryLink(p)}">이 주제로 맞춤 교육 상담</a><a class="button ghost" href="${esc(p.cta.programUrl)}">관련 프로그램 확인</a><a href="tel:01033387110">전화 010-3338-7110</a></div></aside><p class="column-tags">${p.hashtags.map(t=>esc(t.startsWith('#')?t:'#'+t)).join(' ')}</p><p class="column-meta">필자: 김용한 박사(멘토K) · 엠아이넥스트㈜ 대표 · AI 활용과 마케팅, 현장 실행을 연결하는 강의·워크숍과 컨설팅을 진행합니다. <a href="/workshops/">강의·워크숍 안내</a></p><p><a href="/columns/">다른 AI 교육 컬럼 읽기</a></p></article>`;
    const article={'@type':'BlogPosting','@id':url+'#article',url,headline:p.title,description:p.summary,image:{'@type':'ImageObject',url:ORIGIN+p.cover.src,width:p.cover.width,height:p.cover.height,caption:p.cover.caption},datePublished:p.publishedAt,dateModified:p.updatedAt,inLanguage:'ko-KR',mainEntityOfPage:{'@type':'WebPage','@id':url},author:{'@id':ORIGIN+'/#mentork'},publisher:{'@id':ORIGIN+'/#organization'},articleSection:plan.topics.find(t=>t.id===p.topicId).category,keywords:[p.primaryKeyword,...p.targetKeywords,...p.problemKeywords].join(', '),audience:{'@type':'Audience',audienceType:p.cta.audience}};
    const graph={'@graph':[article,{'@type':'Person','@id':ORIGIN+'/#mentork',name:'김용한',alternateName:'멘토K',url:ORIGIN+'/workshops/',jobTitle:'엠아이넥스트㈜ 대표'}, {'@type':'Organization','@id':ORIGIN+'/#organization',name:'AI위드스쿨',legalName:'엠아이넥스트㈜',url:ORIGIN+'/',logo:ORIGIN+'/assets/aiwith-school-logo-footer.png'}, {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AI위드스쿨',item:ORIGIN+'/'},{'@type':'ListItem',position:2,name:'멘토K 컬럼',item:ORIGIN+'/columns/'},{'@type':'ListItem',position:3,name:p.title,item:url}]}]};
    write('columns/'+p.slug+'/index.html',shell(p.title,p.summary,url,body,graph,p));
  }
  const done=new Set(posts.map(p=>p.topicId));
  const table='<div class="column-plan-wrap"><table class="column-plan"><thead><tr><th>순서</th><th>컬럼 제목</th><th>교육 대상</th><th>다루는 문제</th><th>연결 프로그램</th><th>상태</th></tr></thead><tbody>'+plan.topics.map(t=>{const published=posts.find(p=>p.topicId===t.id);return `<tr><td>${t.id}</td><td>${published?'<a href="/columns/'+published.slug+'/">'+esc(published.title)+'</a>':esc(t.title)}</td><td>${esc(t.audience)}</td><td>${esc(t.problemKeywords.join(' · '))}</td><td><a href="${esc(t.programUrl)}">${esc(t.program)}</a></td><td>${done.has(t.id)?'게시 완료':'대기'}</td></tr>`}).join('')+'</tbody></table></div>';
  write('columns/plan/index.html',shell('멘토K 컬럼 30개 발행 계획','AI 강의·워크숍과 연결되는 30개 컬럼 주제와 교육 대상을 확인하세요.',ORIGIN+'/columns/plan/',`<section class="page-section"><p class="kicker">COLUMN PLAN</p><h1>멘토K 컬럼 30개 발행 계획</h1><p>조직·AX, 소상공인 마케팅, 시니어·개인브랜딩, 웹·콘텐츠, 창업·지역의 교육 과제를 다룹니다.</p><p>${done.size} / 30편 게시 완료 · 2026년 10월 4일부터 한국시간 오전 8시 작성 작업 시작</p><div class="column-toolbar"><a class="button primary" href="/columns/">컬럼 전체 보기</a><a class="button ghost" href="/admin/#writing">컬럼 글쓰기</a></div>${table}</section>`,{'@type':'CollectionPage',name:'멘토K 컬럼 발행 계획',url:ORIGIN+'/columns/plan/'}));
  if(fs.existsSync(path.join(root,'index.html'))){
    const home=read('index.html');
    const tiles=posts.length?'<div class="content-card-grid">'+posts.slice(0,4).map(p=>`<article class="content-card"><a href="/columns/${p.slug}/">${coverImage(p)}<div><small>${esc(day(p.publishedAt))}</small><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div></a></article>`).join('')+'</div>':'<p>현장의 AI 활용을 돕는 전문 컬럼 30편을 준비하고 있습니다. <a href="/columns/plan/">발행 주제와 교육 대상 보기</a></p>';
    write('index.html',home.replace(/<!-- columns-home:start -->[\s\S]*?<!-- columns-home:end -->/,'<!-- columns-home:start -->'+tiles+'<!-- columns-home:end -->'));
  }
  if(fs.existsSync(path.join(root,'sitemap.xml'))){
    let xml=read('sitemap.xml');
    if(!xml.includes('xmlns:image='))xml=xml.replace(/<urlset(?=[\s>])/, '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    const routes=[{url:ORIGIN+'/columns/',date:day(new Date())},{url:ORIGIN+'/columns/plan/',date:day(new Date())},...posts.map(p=>({url:ORIGIN+'/columns/'+p.slug+'/',date:day(p.updatedAt)}))];
    for(const r of routes){const post=posts.find(p=>r.url===ORIGIN+'/columns/'+p.slug+'/');xml=xml.replace(/\s*<url>[\s\S]*?<\/url>/g,block=>block.includes('<loc>'+r.url+'</loc>')?'':block);xml=xml.replace('</urlset>',`  <url><loc>${r.url}</loc><lastmod>${r.date}</lastmod>${post?'<image:image><image:loc>'+ORIGIN+post.cover.src+'</image:loc></image:image>':''}</url>\n</urlset>`)}
    write('sitemap.xml',xml);
  }
  const feed=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>멘토K 컬럼 · AI위드스쿨</title><link>${ORIGIN}/columns/</link><description>AI 강의·워크숍과 현장 실행 인사이트</description><language>ko-KR</language>${posts.map(p=>`<item><title>${esc(p.title)}</title><link>${ORIGIN}/columns/${p.slug}/</link><guid isPermaLink="true">${ORIGIN}/columns/${p.slug}/</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.summary)}</description><enclosure url="${ORIGIN+p.cover.src}" length="${fs.statSync(path.join(root,p.cover.src.slice(1))).size}" type="${p.cover.src.endsWith('.webp')?'image/webp':'image/png'}"/></item>`).join('')}</channel></rss>\n`;
  write('columns/feed.xml',feed);
  if(posts.length&&fs.existsSync(path.join(root,'feed.xml'))){
    let xml=read('feed.xml');
    for(const p of posts){const url=ORIGIN+'/columns/'+p.slug+'/';xml=xml.replace(/\s*<item>[\s\S]*?<\/item>/g,block=>block.includes(url)?'':block)}
    const items=feed.match(/<item>[\s\S]*?<\/item>/g)||[];
    xml=xml.replace('</channel>',items.join('\n')+'\n</channel>');write('feed.xml',xml);
  }
  for(const name of ['llms.txt','llms-full.txt'])if(fs.existsSync(path.join(root,name))){
    const text=read(name).replace(/\n<!-- columns-discovery:start -->[\s\S]*?<!-- columns-discovery:end -->\n?/,'');
    const entries=posts.map(p=>`- [${p.title}](${ORIGIN}/columns/${p.slug}/): ${p.summary}${name==='llms-full.txt'?'\n  대상: '+p.cta.audience+'\n  '+p.faq.map(q=>q.question+' '+q.answer).join('\n  '):''}`).join('\n');
    write(name,text.trimEnd()+'\n\n<!-- columns-discovery:start -->\n## 멘토K 컬럼\n'+entries+'\n<!-- columns-discovery:end -->\n');
  }
  for(const name of ['index.html','columns/index.html','columns/plan/index.html',...posts.map(p=>'columns/'+p.slug+'/index.html')])if(fs.existsSync(path.join(root,name)))write(name,hardenHtml(read(name)));
  return {published:posts.length,next:plan.topics.find(t=>!done.has(t.id))?.id||null};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const plan=JSON.parse(fs.readFileSync(path.join(ROOT,'columns/topics.json'),'utf8'));
  const data=JSON.parse(fs.readFileSync(path.join(ROOT,'columns/posts.json'),'utf8'));
  validate(plan,data);validateCovers(data);
  console.log(process.argv.includes('--check')?{valid:true,published:data.posts.length}:renderColumns());
}
