import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const source = read('sharebars.js');

test('공유 모듈은 구문이 올바르며 중복 로드는 기존 초기화만 호출', () => {
  const script = new vm.Script(source);
  let refreshed = 0;
  script.runInNewContext({window:{AIWithSharebars:{refresh(){refreshed++;}}}});
  assert.equal(refreshed,1);
});

test('공유 주소는 HTTPS 공식 intent, URL과 제목은 각각 인코딩', () => {
  assert.match(source,/https:\/\/www\.facebook\.com\/sharer\/sharer\.php\?u=' \+ encodeURIComponent\(url\)/);
  assert.match(source,/https:\/\/www\.threads\.com\/intent\/post\?text=' \+ encodeURIComponent\(title\) \+ '&url=' \+ encodeURIComponent\(url\)/);
  assert.match(source,/noopener noreferrer/);
  assert.doesNotMatch(source,/window\.open|fetch\(|XMLHttpRequest|sendBeacon/);
});

test('복사 성공·실패 안내와 수동 복사·터치·키보드 접근성 유지', () => {
  assert.match(source,/aria-live', 'polite'/);
  assert.match(source,/await navigator\.clipboard\.writeText\(url\)/);
  assert.match(source,/copied = document\.execCommand\('copy'\)/);
  assert.match(source,/링크가 복사되었습니다/);
  assert.match(source,/자동 복사를 완료하지 못했습니다/);
  assert.match(source,/input\.readOnly = true/);
  const css = read('sharebars.css');
  assert.match(css,/flex-wrap:wrap/);
  assert.match(css,/min-height:44px/);
  assert.match(css,/:focus-visible/);
});

test('현재 컬럼·카드뉴스·공지와 미래 발행 템플릿이 공유 모듈을 로드', () => {
  const posts = JSON.parse(read('columns/posts.json')).posts;
  const pages = posts.map(post => 'columns/' + post.slug + '/index.html');
  pages.push('cardnews/senior-branding/index.html','cardnews/view/index.html','notices/index.html');
  pages.forEach(file => assert.match(read(file),/\/site\.js\?v=20261013-share-1/,file));
  assert.match(read('site.js'),/sharebars\.js\?v=20261013-share-1/);
  assert.match(read('scripts/build-security.mjs'),/SITE_VERSION='20261013-share-1'/);
  assert.match(source,/article\.column-reading/);
  assert.match(source,/cardnews-detail-section/);
  assert.match(source,/new MutationObserver/);
  assert.match(source,/current\.searchParams\.get\('slug'\)/);
  const notices = read('notices/index.html');
  const ids = [...notices.matchAll(/<article class="content-card" id="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length,4);
  assert.equal(new Set(ids).size,4);
  assert.match(source,/url\.hash = article\.id/);
});
