import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {validate,validateCovers,esc,renderColumns} from './publish-columns.mjs';
import {extendPlan} from './extend-column-plan.mjs';
const livePlan=JSON.parse(fs.readFileSync(new URL('../columns/topics.json',import.meta.url),'utf8'));
// Keep the original batch as a stable regression fixture as the live plan grows.
const plan={...livePlan,topics:livePlan.topics.slice(0,30)};
const saved=JSON.parse(fs.readFileSync(new URL('../columns/posts.json',import.meta.url),'utf8')).posts[0];
const post=()=>({...structuredClone(saved),publishedAt:'2026-10-01T23:00:00Z',updatedAt:'2026-10-01T23:00:00Z'});
test('첫 30개 주제와 정상 원고',()=>assert.equal(validate(plan,{posts:[post()]}),true));
test('중복 주제 차단',()=>assert.throws(()=>validate(plan,{posts:[post(),post()]}),/중복 주제/));
test('미래 시각 차단',()=>assert.throws(()=>validate(plan,{posts:[{...post(),publishedAt:'2100-01-01T00:00:00Z'}]}),/시각/));
test('같은 한국 날짜 중복 차단',()=>{const second={...post(),topicId:2,slug:plan.topics[1].slug,title:'다른 제목',sections:[{heading:'실무',paragraphs:['별도의 교육 과제를 확인한다. '.repeat(90)]},{heading:'검증',paragraphs:['독자적인 실행을 검토한다. '.repeat(30)]}]};assert.throws(()=>validate(plan,{posts:[post(),second]}),/같은 날/)});
test('유사성 검수 기록 누락 차단',()=>assert.throws(()=>validate(plan,{posts:[{...post(),originality:null}]}),/유사성/));
test('HTML 및 스크립트 문자 escape',()=>assert.equal(esc('<script>"&'), '&lt;script&gt;&quot;&amp;'));
test('이미지·키워드·질문답변 필수 및 외부 이미지 차단',()=>{
  assert.throws(()=>validate(plan,{posts:[{...post(),cover:null}]}),/대표이미지/);
  assert.throws(()=>validate(plan,{posts:[{...post(),cover:{...post().cover,src:'https://other.example/a.webp'}}]}),/대표이미지/);
  assert.throws(()=>validate(plan,{posts:[{...post(),title:'AI 교육 일반론'}]}),/타겟·문제/);
  assert.throws(()=>validate(plan,{posts:[{...post(),faq:[]}]}),/질문·답변/);
});
test('대표이미지 실제 파일 누락 및 크기 불일치 차단',()=>{
  assert.throws(()=>validateCovers({posts:[post()]},os.tmpdir()),/파일 누락/);
  assert.throws(()=>validateCovers({posts:[{...post(),cover:{...post().cover,width:1537}}]}),/크기 불일치/);
});
test('목록·상세·CTA·사이트맵·RSS 생성 및 재실행 중복 방지',()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'aiwith-columns-test-'));
  fs.mkdirSync(path.join(temp,'columns'));
  fs.mkdirSync(path.join(temp,'assets/columns'),{recursive:true});
  fs.copyFileSync(new URL('../assets/columns/ai-training-outcomes.webp',import.meta.url),path.join(temp,'assets/columns/ai-training-outcomes.webp'));
  fs.copyFileSync(new URL('../columns/index.template',import.meta.url),path.join(temp,'columns/index.template'));
  fs.writeFileSync(path.join(temp,'columns/topics.json'),JSON.stringify(plan));
  fs.writeFileSync(path.join(temp,'columns/posts.json'),JSON.stringify({posts:[post()]}));
  fs.writeFileSync(path.join(temp,'sitemap.xml'),'<urlset><url><loc>https://aiwith.kr/workshops/</loc></url></urlset>');
  fs.writeFileSync(path.join(temp,'feed.xml'),'<rss><channel></channel></rss>');
  const result=renderColumns(temp);renderColumns(temp);
  const article=fs.readFileSync(path.join(temp,'columns',post().slug,'index.html'),'utf8');
  assert.equal(result.published,1);assert.equal(result.next,2);
  assert.match(article,/href="\/consultation\/\?column=ai-training-outcomes"/);assert.match(article,/datePublished/);assert.ok(article.includes('<h1>'+esc(post().title)+'</h1>'));
  assert.match(article,/og:image" content="https:\/\/aiwith.kr\/assets\/columns\/ai-training-outcomes.webp/);
  const graph=JSON.parse(article.match(/id="aiwith-seo-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(graph['@graph'][0]['@type'],'BlogPosting');assert.equal(graph['@graph'][0].image.width,1536);
  assert.match(article,/이 주제의 질문과 답변/);
  // Generated posts retain the shared controls loader after the security build.
  assert.match(article,/\/site\.js\?v=20261013-share-1/);
  const listing=fs.readFileSync(path.join(temp,'columns/index.html'),'utf8');
  assert.match(listing,/ai-training-outcomes/);
  assert.doesNotMatch(listing,/강의·워크숍 의뢰|컬럼 글쓰기|30개 컬럼 발행 계획|column-toolbar/);
  assert.match(fs.readFileSync(path.join(temp,'columns/plan/index.html'),'utf8'),/컬럼 글쓰기/);
  const sitemap=fs.readFileSync(path.join(temp,'sitemap.xml'),'utf8');
  assert.match(sitemap,/workshops/);assert.equal(sitemap.split('<loc>https://aiwith.kr/columns/ai-training-outcomes/</loc>').length-1,1);
  assert.match(sitemap,/<image:loc>https:\/\/aiwith.kr\/assets\/columns\/ai-training-outcomes.webp<\/image:loc>/);
  assert.equal(fs.readFileSync(path.join(temp,'feed.xml'),'utf8').split('<item>').length-1,1);
  assert.match(fs.readFileSync(path.join(temp,'feed.xml'),'utf8'),/enclosure.*image\/webp/);
});


const liveData=JSON.parse(fs.readFileSync(new URL('../columns/posts.json',import.meta.url),'utf8'));
const completed={...liveData,posts:liveData.posts.filter(post=>post.topicId<=30)};
const nextTopic=(id=plan.topics.length+1)=>({...structuredClone(plan.topics[0]),id,slug:'continuation-test-'+id,title:plan.topics[0].title+' · 후속 검증 '+id,coverPose:'후속 검증 동작 '+id});
test('31편 이후에도 상한 없이 연속된 주제 지원',()=>{
  const topics=[...structuredClone(plan.topics)];
  for(let id=topics.length+1;id<=65;id++)topics.push(nextTopic(id));
  assert.equal(validate({...plan,topics},{posts:[]}),true);
});
test('주제 순번 초기화·누락·문자열 및 중복 slug 차단',()=>{
  const topics=[...structuredClone(plan.topics),nextTopic()];
  for(const id of [1,32,'31',31.5])assert.throws(()=>validate({...plan,topics:[...topics.slice(0,-1),{...nextTopic(),id}]},{posts:[]}),/고유 순번/);
  assert.throws(()=>validate({...plan,topics:[...topics.slice(0,-1),{...nextTopic(),slug:plan.topics[0].slug}]},{posts:[]}),/고유 slug/);
});
test('정식 확장은 기존 주제·공개 기록을 그대로 두고 다음 한 개만 추가',()=>{
  const beforePlan=JSON.stringify(plan),beforePosts=JSON.stringify(completed);
  const extended=extendPlan(plan,completed,nextTopic());
  assert.equal(extended.topics.length,plan.topics.length+1);
  assert.deepEqual(extended.topics.slice(0,-1),plan.topics);
  assert.equal(JSON.stringify(plan),beforePlan);assert.equal(JSON.stringify(completed),beforePosts);
  assert.equal(extended.topics.at(-1).id,Math.max(...plan.topics.map(t=>t.id))+1);
  assert.throws(()=>extendPlan(plan,{...completed,posts:completed.posts.slice(0,-1)},nextTopic()),/미게시 주제/);
  assert.throws(()=>extendPlan(plan,completed,nextTopic(1)),/다음 고유 순번/);
  for(const key of ['slug','title','coverPose'])assert.throws(()=>extendPlan(plan,completed,{...nextTopic(),[key]:plan.topics[0][key]}),/재사용/);
  assert.throws(()=>extendPlan(plan,completed,{...nextTopic(),audience:''}),/필수 정보/);
});
test('31번 원고도 동일 검수 후 목록·상세·동적 계획표·피드 생성',()=>{
  const topic=nextTopic(),extended={...plan,topics:[...plan.topics,topic]};
  const newer={...post(),topicId:topic.id,slug:topic.slug,cover:{...post().cover,src:'/assets/columns/'+topic.slug+'.webp',pose:topic.coverPose}};
  assert.equal(validate(extended,{posts:[newer]}),true);
  assert.throws(()=>validate(extended,{posts:[{...newer,cover:null}]}),/대표이미지/);
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'aiwith-continuation-test-'));
  try{
    fs.mkdirSync(path.join(temp,'columns'));fs.mkdirSync(path.join(temp,'assets/columns'),{recursive:true});
    fs.copyFileSync(new URL('../assets/columns/ai-training-outcomes.webp',import.meta.url),path.join(temp,newer.cover.src.slice(1)));
    fs.copyFileSync(new URL('../columns/index.template',import.meta.url),path.join(temp,'columns/index.template'));
    fs.writeFileSync(path.join(temp,'columns/topics.json'),JSON.stringify(extended));
    fs.writeFileSync(path.join(temp,'columns/posts.json'),JSON.stringify({posts:[newer]}));
    const result=renderColumns(temp);assert.equal(result.nextTopicId,topic.id+1);assert.equal(result.needsTopicRegistration,false);
    const page=fs.readFileSync(path.join(temp,'columns/plan/index.html'),'utf8');
    assert.match(page,/상시 발행 계획/);assert.ok(page.includes('등록 주제 '+extended.topics.length+'개'));assert.doesNotMatch(page,/30개 발행 계획|\/ 30편/);
    assert.ok(fs.readFileSync(path.join(temp,'columns',topic.slug,'index.html'),'utf8').includes('/consultation/?column='+topic.slug));
    assert.ok(fs.readFileSync(path.join(temp,'columns/feed.xml'),'utf8').includes(topic.slug));
  }finally{fs.rmSync(temp,{recursive:true,force:true});}
});

test('확장 CLI 검증은 읽기 전용이며 실제 등록·재시도는 한 항목만 처리',()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'aiwith-extend-cli-test-'));
  try{
    fs.mkdirSync(path.join(temp,'scripts'));fs.mkdirSync(path.join(temp,'columns'));
    for(const name of ['publish-columns.mjs','build-security.mjs','extend-column-plan.mjs'])fs.copyFileSync(new URL(name,import.meta.url),path.join(temp,'scripts',name));
    const planFile=path.join(temp,'columns/topics.json'),postsFile=path.join(temp,'columns/posts.json'),candidate=path.join(temp,'topic.json');
    fs.writeFileSync(planFile,JSON.stringify(plan));fs.writeFileSync(postsFile,JSON.stringify(completed));fs.writeFileSync(candidate,JSON.stringify(nextTopic()));
    const original=fs.readFileSync(planFile,'utf8'),savedPosts=fs.readFileSync(postsFile,'utf8');
    const run=(...args)=>spawnSync(process.execPath,[path.join(temp,'scripts/extend-column-plan.mjs'),candidate,...args],{encoding:'utf8'});
    assert.equal(run('--check').status,0);assert.equal(fs.readFileSync(planFile,'utf8'),original);
    assert.equal(run().status,0);const registered=fs.readFileSync(planFile,'utf8');
    assert.equal(JSON.parse(registered).topics.length,31);assert.equal(fs.readFileSync(postsFile,'utf8'),savedPosts);
    assert.notEqual(run().status,0);assert.equal(fs.readFileSync(planFile,'utf8'),registered);
    assert.notEqual(run('--force').status,0);assert.equal(fs.readFileSync(planFile,'utf8'),registered);
  }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
