const courseParts = [
  {id:'part1',no:'01',title:'AI 시대의 홈페이지를 이해하다',short:'이해',desc:'홈페이지의 역할과 제작 원리',accent:'#2e6cf6',chapters:[
    ['1','AI 시대, 홈페이지는 어떻게 달라졌는가','홈페이지는 방문자의 질문에 답하고 행동으로 연결하는 작은 의사결정 공간이다','주요 방문자 1명과 질문 3개, 핵심 CTA 1개를 작성한다','목적 문장 · 방문자 질문'],
    ['2','홈페이지의 기본 구조부터 이해하기','화면·데이터·관리자 구조를 구분해야 개발 누락을 줄일 수 있다','프론트엔드·백엔드·관리자 기능을 구분한다','구조 구분표'],
    ['3','비개발자도 홈페이지를 만들 수 있는 이유','AI는 만들고 사람은 결정·설명·검수한다','AI 위임 항목과 사람 승인 항목을 나눈다','역할·승인표'],
    ['4','바이브코딩과 ChatGPT Sites','Project·Work·Sites는 하나의 제작 흐름으로 연결된다','세 공간에서 각각 무엇을 할지 실제 작업표를 만든다','도구별 작업경계표'],
    ['5','홈페이지 제작에 필요한 지식과 역량','초보자의 핵심 역량은 질문·구조화·검수다','내가 보완할 역량 3개와 학습 순서를 정한다','개인 학습 우선순위']
  ]},
  {id:'part2',no:'02',title:'프로젝트 개설과 작업 환경 설정',short:'프로젝트',desc:'기준자료와 작업 규칙을 고정하는 단계',accent:'#19a974',chapters:[
    ['6','홈페이지 구축 프로젝트 개설하기','Project는 홈페이지 자료와 결정사항을 모으는 기준점이다','프로젝트명·목적·업종·핵심 방문자를 입력하고 자료를 올린다','Project 개설'],
    ['7','프로젝트 지침과 Work 규칙 설정','지침은 AI가 반복해서 지켜야 할 운영 규칙이다','문체·사실확인·보안·승인·모바일 기준을 입력한다','Project 지침'],
    ['8','자료와 파일을 홈페이지용으로 정리하기','자료는 기준본·콘텐츠·브랜드·운영자료와 공개등급으로 나눈다','최신 자료와 공개 금지 자료를 분류한다','자료분류표'],
    ['9','Work와 Sites의 작업 경계를 정하기','저장·기획·개발·검수·배포를 같은 말로 사용하지 않는다','Project→Work→Sites 이동 경로를 작성한다','작업 경계표']
  ]},
  {id:'part3',no:'03',title:'Work에서 홈페이지를 기획하다',short:'기획',desc:'방문자의 의사결정을 PRD로 구조화하는 단계',accent:'#6846d8',chapters:[
    ['10','홈페이지의 목적과 유형 정하기','홈페이지 목적은 회사소개가 아니라 방문자 행동으로 정의한다','업종 유형·목적·회원제 여부를 결정한다','목적·유형표'],
    ['11','고객과 방문자 여정 설계하기','페이지 순서보다 인지→이해→신뢰→비교→행동의 순서를 설계한다','방문자 질문과 단계별 CTA를 만든다','방문자 여정'],
    ['12','사이트맵과 페이지 구조 만들기','페이지마다 한 가지 역할을 부여한다','상위 메뉴·상세 페이지·내부링크를 구성한다','사이트맵'],
    ['13','프론트·백엔드·관리자 구조 기획','보이는 화면과 뒤의 처리를 함께 기획해야 운영이 가능하다','화면·저장데이터·권한을 구분한다','기능 요구사항'],
    ['14','관리자 대시보드와 게시판 설계하기','관리자 화면은 운영 절차를 화면으로 옮긴 것이다','게시판·상태·권한·안전장치를 설계한다','관리자 요구사항'],
    ['15','콘텐츠·이미지·CTA를 기획하기','한 섹션에는 한 가지 일을 맡긴다','페이지별 핵심 콘텐츠·이미지·CTA를 작성한다','페이지 콘텐츠표'],
    ['16','모바일·개인정보·보안·검색 요구사항 정리하기','비기능 요구사항도 공개 전 완료 조건이다','모바일·개인정보·보안·검색 기준을 체크한다','비기능 요구사항'],
    ['17','최종 홈페이지 기획안(PRD) 작성하기','PRD는 합의를 기억하게 하는 개발 승인본이다','앞선 산출물을 통합하고 우선순위·제외범위를 확정한다','PRD v1.0']
  ]},
  {id:'part4',no:'04',title:'Work에서 벤치마킹·디자인·개발하다',short:'개발',desc:'좋은 판단을 수집하고 작동하는 화면으로 구현하는 단계',accent:'#ec6b3e',chapters:[
    ['18','타 홈페이지를 실전 벤치마킹하기','벤치마킹은 화면 복사가 아니라 좋은 판단을 수집하는 일이다','참조·적용·배제·변형을 비교표로 남긴다','벤치마킹표'],
    ['19','홈페이지 컬러 시스템 설계하기','컬러는 장식이 아니라 역할 언어다','메인·보조·CTA 컬러와 사용비율을 지정한다','컬러 시스템'],
    ['20','폰트·글자 크기 체계 만들기','글자 크기는 화면의 길잡이다','PC·모바일 제목·본문·버튼 기준을 정한다','타이포그래피 기준'],
    ['21','UI·UX를 최적화하기','편리함은 사용자가 망설이는 시간을 줄이는 일이다','UI·UX·전환·상태 화면을 설계한다','사용자 흐름'],
    ['22','와이어프레임과 디자인 기준 확정하기','회색 상자 단계에서 큰 비용을 줄인다','와이어프레임·공통 컴포넌트를 승인한다','디자인 기준'],
    ['23','Work에서 기본 레이아웃과 공통 요소 개발하기','공통 요소가 사이트의 품질을 결정한다','헤더·푸터·버튼·카드·반응형을 구현한다','기본 레이아웃'],
    ['24','메인 화면과 핵심 페이지 개발하기','메인은 요약이고 상세 페이지는 근거다','메인·서비스·사례·문의 페이지를 개발한다','핵심 페이지'],
    ['25','백엔드·회원·권한·게시판 개발하기','운영 책임이 없는 기능은 만들지 않는다','필요한 회원·권한·게시판 기능만 우선 구현한다','운영 기능'],
    ['26','상담·대시보드·접속통계 개발하기','운영 화면에는 다음 행동이 보여야 한다','상담·콘텐츠·통계 대시보드를 구성한다','관리자 화면'],
    ['27','개발 결과를 Work에서 검토하고 Sites로 넘기기','인수인계에는 미완료와 주의사항도 포함한다','개발 보고·변경범위·Sites 전달서를 작성한다','Sites 전달서']
  ]},
  {id:'part5',no:'05',title:'Sites에서 검수하고 수정하다',short:'검수',desc:'실제 방문자와 운영자 관점에서 결과를 확인하는 단계',accent:'#0e9aa7',chapters:[
    ['28','Sites에서 실제 홈페이지 확인하기','Sites 미리보기는 감상이 아니라 시나리오 테스트다','실제 URL·메뉴·CTA를 확인한다','첫 검수 기록'],
    ['29','방문자·관리자 시나리오로 테스트하기','역할과 상태를 바꾸며 테스트해야 누락을 찾는다','방문자·관리자·권한 시나리오를 실행한다','시나리오 테스트표'],
    ['30','모바일·콘텐츠·UI·UX 검수하기','실제 콘텐츠가 디자인의 한계를 드러낸다','모바일·긴 문장·이미지·UI를 확인한다','콘텐츠·모바일 오류표'],
    ['31','개인정보·보안·관리자 기능 검수하기','공개해도 안전한지 먼저 확인한다','개인정보·권한·관리자 접근을 검수한다','보안 검수표'],
    ['32','오류 수정과 재검수하기','오류 한 건을 재현 가능한 기록으로 만든다','환경·순서·기대·실제 결과를 기록하고 재검수한다','수정 요청서'],
    ['33','공개 전 최종 확정하기','공개 승인은 증거가 있는 결정이다','최종 체크·승인·배포 상태를 확인한다','공개 승인본']
  ]},
  {id:'part6',no:'06',title:'도메인 연결·검색 등록·홈페이지 오픈',short:'오픈',desc:'주소와 검색·통계를 연결하는 단계',accent:'#d48b19',chapters:[
    ['34','도메인과 호스팅 이해하기','주소·실행 공간·데이터 위치를 구분한다','도메인·Sites 주소·호스팅을 정리한다','연결 준비표'],
    ['35','Sites에 도메인 연결하고 오픈하기','DNS는 바꾸기 전에 현재 상태를 기록한다','도메인·메일 레코드·HTTPS·공개범위를 확인한다','DNS 전후 기록'],
    ['36','Google·네이버 검색 등록하기','검색 등록과 검색 노출은 다르다','소유권·사이트맵·제출 상태를 기록한다','검색 등록 기록'],
    ['37','접속통계와 운영 대시보드 시작하기','지표는 답이 아니라 다음 질문이다','접속·조회·CTA·문의 기준을 정한다','통계 기준표']
  ]},
  {id:'part7',no:'07',title:'홈페이지 홍보·영업·운영',short:'운영',desc:'콘텐츠·상담·성과 개선을 반복하는 단계',accent:'#d94b78',chapters:[
    ['38','홈페이지 콘텐츠 운영하기','콘텐츠는 발행보다 갱신이 중요하다','고객 질문 기반 콘텐츠 운영표를 작성한다','월간 콘텐츠표'],
    ['39','SEO·AEO·GEO와 SNS 공유 연결하기','사람과 AI에게 읽히는 답을 만든다','검색·질문형 콘텐츠·SNS 공유 구조를 점검한다','검색·공유 기준'],
    ['40','홈페이지를 상담·영업과 연결하기','문의 수보다 처리 경험을 설계한다','상담 폼·담당자·상태·후속 처리를 설계한다','상담 처리표'],
    ['41','오픈 후 30일 운영하기','첫 달에는 운영 리듬을 만든다','1~4주 콘텐츠·통계·개선 계획을 세운다','30일 운영계획']
  ]}
];

const allChapters = courseParts.flatMap(part => part.chapters.map(c => ({part, id:`${part.id}-${c[0]}`, no:c[0], title:c[1], message:c[2], practice:c[3], output:c[4]})));
const chapterMap = new Map(allChapters.map((c,i) => [c.id,{...c,index:i}]));
const toolInfo = {
  Project:{text:'자료와 결정사항을 모아 AI가 계속 참고할 기준점을 만드는 공간입니다.',steps:['홈페이지 목적과 유형을 정합니다.','최신 기준자료와 공개 금지 자료를 나눕니다.','문체·사실확인·보안·승인 규칙을 고정합니다.']},
  Work:{text:'방문자·페이지·기능·디자인·개발 요구사항을 작업 지시서로 바꾸는 공간입니다.',steps:['PRD와 사이트맵을 작성합니다.','작은 단위로 디자인·개발을 요청합니다.','변경범위와 미완료 내용을 보고서로 남깁니다.']},
  Sites:{text:'실제 홈페이지를 방문자와 운영자처럼 열어 보고 수정·오픈하는 공간입니다.',steps:['실제 URL과 모바일 화면을 확인합니다.','시나리오로 CTA·게시판·문의 흐름을 테스트합니다.','오류를 재현 가능한 문장으로 수정 요청합니다.']}
};

let currentId = 'start';
const doneKey = 'mentor-k-lecture-done-v1';
let completed = JSON.parse(localStorage.getItem(doneKey) || '{}');

function chapterById(id){ return chapterMap.get(id); }
function currentIndex(){ return currentId==='start' ? -1 : (chapterById(currentId)?.index ?? 0); }
function setCurrent(id){ currentId=id; renderAll(); document.getElementById('workspace')?.scrollIntoView({behavior:'smooth',block:'start'}); }
function getChapterIds(){ return allChapters.map(c=>c.id); }
function renderMap(){
  const el=document.getElementById('mapTrack'); if(!el)return;
  el.innerHTML=courseParts.map(p=>`<button class="map-card ${currentId.startsWith(p.id)?'active':''}" data-part="${p.id}" style="--accent:${p.accent}"><span class="map-no">${p.no}</span><strong>${p.short}</strong><small>${p.chapters.length}개 장<br />${p.desc}</small></button>`).join('');
  el.querySelectorAll('.map-card').forEach(btn=>btn.addEventListener('click',()=>setCurrent(`${btn.dataset.part}-${courseParts.find(p=>p.id===btn.dataset.part).chapters[0][0]}`)));
}
function renderNav(){
  const nav=document.getElementById('courseNav'); if(!nav)return;
  nav.innerHTML=`<div class="course-nav"><div class="course-nav-part open"><button class="part-toggle" data-start="1"><span class="part-no">00</span><strong>시작하기</strong><small>▶</small></button><div class="chapter-list" style="display:block"><button class="chapter-link ${currentId==='start'?'active':''}" data-id="start">실전 강의 시작 안내</button></div></div>${courseParts.map(p=>`<div class="course-nav-part ${currentId.startsWith(p.id)?'open':''}"><button class="part-toggle" data-part="${p.id}"><span class="part-no">${p.no}</span><strong>${p.title}</strong><small>${p.chapters.length}장</small></button><div class="chapter-list">${p.chapters.map(c=>{const id=`${p.id}-${c[0]}`;return `<button class="chapter-link ${currentId===id?'active':''} ${completed[id]?'completed':''}" data-id="${id}">${c[0]}장 · ${c[1]}</button>`}).join('')}</div></div>`).join('')}</div>`;
  nav.querySelectorAll('[data-id]').forEach(btn=>btn.addEventListener('click',()=>setCurrent(btn.dataset.id)));
  nav.querySelectorAll('[data-part]').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open')));
  nav.querySelector('[data-start]')?.addEventListener('click',()=>setCurrent('start'));
}
function renderSlide(){
  const el=document.getElementById('slideView'); if(!el)return;
  if(currentId==='start'){
    document.getElementById('stagePart').textContent='시작하기';document.getElementById('stageTime').textContent='약 10분';
    el.innerHTML=`<div class="slide-header"><div class="slide-kicker">ORIENTATION · 00</div><h2>내 홈페이지를 만드는<br /><span style="color:var(--blue)">첫 번째 프로젝트</span>를 시작합니다</h2><p>강의 화면을 넘기는 것보다 중요한 것은, 매 장의 결과를 내 프로젝트에 남기는 것입니다.</p></div><div class="slide-body"><div class="content-panel lecture"><div class="panel-label"><strong>강의 핵심 · 30%</strong><span>먼저 이해하기</span></div><h3>프로젝트에서 준비하고,<br />Work에서 만들고,<br />Sites에서 검수합니다</h3><p>이 강의는 도구 설명을 길게 하지 않습니다. 지금 화면에서 질문을 확인하고 바로 Project·Work·Sites로 이동해 내 홈페이지를 완성합니다.</p></div><div class="content-panel practice"><div class="panel-label"><strong>실전 시작 · 70%</strong><span>바로 실행하기</span></div><h3>홈페이지 유형을 고르고<br />첫 목표를 한 문장으로 적습니다</h3><p>기업·전문서비스·로컬·교육·콘텐츠·쇼핑몰 중 하나를 선택하고, 방문자가 홈페이지에서 가장 먼저 하길 바라는 행동을 정하세요.</p></div></div><div class="slide-bottom"><div class="prompt-card"><label>START PROMPT</label><p>나는 [업종]을 운영하고 주요 방문자는 [대상]이다. 홈페이지에서 방문자가 반드시 하길 바라는 행동은 [행동]이다. 프로젝트 시작을 위해 필요한 질문 5개를 만들어라.</p></div><div class="output-card"><label>첫 산출물</label><p>홈페이지 유형 · 주요 방문자 · 핵심 행동 · 프로젝트 목표</p></div></div>`;
  } else {
    const c=chapterById(currentId); document.getElementById('stagePart').textContent=`${c.part.no}부 · ${c.part.title}`;document.getElementById('stageTime').textContent=`강의 8분 · 실습 20분`;
    const done=!!completed[currentId];
    el.innerHTML=`<div class="slide-header" style="--slide-accent:${c.part.accent}"><div class="slide-kicker" style="color:${c.part.accent}">${c.part.no} · ${c.part.short.toUpperCase()} / ${c.no}장</div><h2>${c.title}</h2><p>${c.message}</p></div><div class="slide-body"><div class="content-panel lecture"><div class="panel-label"><strong>강의 핵심 · 30%</strong><span>판단 기준</span></div><h3>${c.message}</h3><p>화면을 예쁘게 만드는 것보다 먼저, 누가 어떤 상황에서 무엇을 확인한 뒤 어떤 행동을 하는지 결정합니다. 이번 장의 기준을 내 업종과 방문자에게 대입하세요.</p></div><div class="content-panel practice"><div class="panel-label"><strong>실전 작업 · 70%</strong><span>지금 실행</span></div><h3>${c.practice}</h3><p>Project·Work·Sites 중 안내된 작업 공간에서 직접 입력하고, 결과 화면 또는 문서를 다음 장의 입력자료로 저장합니다.</p></div></div><div class="slide-bottom"><div class="prompt-card"><label>WORK PROMPT</label><p>내 홈페이지의 [${c.title}]을(를) 설계한다. 기준자료만 사용하고 추정하지 말라. 방문자·운영자 관점의 결과와 미결정사항을 함께 정리하라. 완료 기준: ${c.output}.</p></div><div class="output-card"><label>이번 장의 산출물</label><p>${c.output}</p></div></div>`;
    const cb=document.getElementById('completeLesson');cb.textContent=done?'완료됨 · 다시 표시':'이 장 완료 표시';cb.classList.toggle('done',done);
  }
}
function renderProgress(){const pct=Math.round(Object.keys(completed).filter(k=>completed[k]).length/allChapters.length*100);const t=document.getElementById('progressText');const b=document.getElementById('progressBar');if(t)t.textContent=`${pct}%`;if(b)b.style.width=`${pct}%`}
function renderAll(){renderMap();renderNav();renderSlide();renderProgress();const i=currentIndex();document.getElementById('prevLesson').disabled=i<0;document.getElementById('nextLesson').textContent=i>=allChapters.length-1?'처음으로 →':'다음 →';}
function navigate(delta){const i=currentIndex();if(i+delta<0){setCurrent('start');return}if(i+delta>=allChapters.length){setCurrent('start');return}setCurrent(allChapters[i+delta].id)}
function showTool(name){const m=document.getElementById('toolModal');const info=toolInfo[name];if(!m||!info)return;document.getElementById('toolModalTitle').textContent=name;document.getElementById('toolModalText').textContent=info.text;document.getElementById('toolModalSteps').innerHTML=info.steps.map((s,i)=>`<div class="modal-step"><i>${i+1}</i><span>${s}</span></div>`).join('');m.hidden=false}
function closeToolModal(){const m=document.getElementById('toolModal');if(m)m.hidden=true}
function openSlides(){window.open('slides.html?autoprint=1','_blank','noopener,noreferrer')}
function renderPrintDeck(){const deck=document.getElementById('printDeck');if(!deck)return;deck.innerHTML=`<section class="print-slide print-cover"><div class="print-top"><b>실전 홈페이지 프로젝트북</b><span>강의 30% · 실습 70%</span></div><div><p class="eyebrow" style="color:#8baeff">CHATGPT SITES · PROJECT · WORK · SITES</p><h2>ChatGPT Sites로<br />누구나 쉽게 홈페이지 만들기</h2><p class="print-message">프로젝트에서 준비하고, Work에서 기획·개발하고, Sites에서 검수·수정·오픈한다.</p><div class="print-grid"><div class="print-box"><label>강사</label><p>엠아이넥스트 김용한</p></div><div class="print-box"><label>구성</label><p>7개 부 · 41개 실전 장</p></div></div></div><div class="print-footer"><strong>실전 강의용 슬라이드</strong><span>엠아이넥스트 김용한</span></div></section>${allChapters.map(c=>`<section class="print-slide" style="--slide-accent:${c.part.accent}"><div class="print-top"><b>${c.part.no} · ${c.part.short.toUpperCase()} / ${c.no}장</b><span>강사 · 엠아이넥스트 김용한</span></div><div><h2>${c.title}</h2><p class="print-message">${c.message}</p><div class="print-grid"><div class="print-box"><label>강의 30% · 핵심 개념</label><p>${c.message} 화면을 예쁘게 만드는 것보다 방문자·운영자·공개 기준을 먼저 결정합니다.</p></div><div class="print-box practice"><label>실습 70% · 바로 실행</label><p>${c.practice}</p></div></div></div><div class="print-footer"><strong>산출물 · ${c.output}</strong><span>Project → Work → Sites</span></div></section>`).join('')}`}

document.addEventListener('DOMContentLoaded',()=>{
  renderMap();renderAll();renderPrintDeck();
  document.getElementById('startCourse')?.addEventListener('click',()=>setCurrent('part1-1'));
  document.getElementById('openSlides')?.addEventListener('click',openSlides);document.getElementById('resourceSlides')?.addEventListener('click',openSlides);
  document.getElementById('prevLesson')?.addEventListener('click',()=>navigate(-1));document.getElementById('nextLesson')?.addEventListener('click',()=>navigate(1));
  document.getElementById('completeLesson')?.addEventListener('click',()=>{if(currentId==='start')return;completed[currentId]=!completed[currentId];localStorage.setItem(doneKey,JSON.stringify(completed));renderAll()});
  document.querySelectorAll('[data-tool]').forEach(btn=>btn.addEventListener('click',()=>showTool(btn.dataset.tool)));
  document.getElementById('closeToolModal')?.addEventListener('click',closeToolModal);document.getElementById('toolModal')?.addEventListener('click',e=>{if(e.target===e.currentTarget)closeToolModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeToolModal()});
  document.getElementById('openResources')?.addEventListener('click',()=>document.getElementById('resources')?.scrollIntoView({behavior:'smooth'}));
  document.getElementById('downloadChecklist')?.addEventListener('click',()=>{alert('공개 전 체크리스트는 5부 28~33장과 6부 34~37장에서 단계별로 확인할 수 있습니다. 전체 슬라이드 PDF 저장 버튼을 이용하면 강의자료 전체를 한 번에 인쇄·저장할 수 있습니다.')});
  document.getElementById('collapseNav')?.addEventListener('click',()=>document.querySelector('.course-sidebar')?.classList.toggle('collapsed'));
});
