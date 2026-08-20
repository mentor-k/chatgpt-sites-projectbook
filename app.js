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
  ]},
  {id:'part8',no:'08',title:'무료 ChatGPT로 홈페이지 공개하기',short:'무료 오픈',desc:'대화에서 기획·코드·GitHub Pages 공개까지',accent:'#2563eb',chapters:[
    ['42','Chat에서 홈페이지 기획안 확정하기','무료 ChatGPT 대화만으로 목적·방문자·화면 구성을 확정했음','업종과 목표를 입력하고 한 페이지 기획안을 표로 정리했음','홈페이지 기획안'],
    ['43','기획안을 HTML·CSS·JS 코드로 만들기','확정한 기획안을 세 파일로 나누어 실행 가능한 코드로 만들었음','index.html·styles.css·app.js를 순서대로 생성하고 누락을 검수했음','웹사이트 코드 3종'],
    ['44','코드 파일을 다운로드하고 실행 확인하기','생성된 코드를 같은 폴더에 저장하고 브라우저에서 직접 확인했음','파일명과 연결 경로를 확인한 뒤 ZIP 파일로 정리했음','배포용 ZIP 파일'],
    ['45','GitHub에 올리고 Pages로 공개하기','저장소에 파일을 업로드하고 GitHub Pages 주소를 발급했음','main 브랜치의 루트 폴더를 배포 원본으로 지정하고 공개 URL을 검수했음','공개 홈페이지 URL']
  ]}
];

const partPractice = {
  part2:{title:'실습 · 내 홈페이지 프로젝트 작업환경 완성',goal:'프로젝트명·기준자료·지침·작업 경계를 한 번에 설정했음',steps:['프로젝트명과 목표 입력','기준자료·공개등급 분류','프로젝트 지침 등록','Work·Sites 작업 경계 저장'],prompt:'[업종] 홈페이지 프로젝트를 시작한다. 프로젝트명은 [이름], 주요 방문자는 [대상], 핵심 행동은 [행동]이다. ①프로젝트 소개 ②필수 기준자료 ③문체·사실확인·보안·승인 지침 ④Work와 Sites의 작업 경계를 표로 작성해 줘. 모르는 정보는 [확인 필요]로 표시해 줘.',caution:'고객명단·비밀번호·API 키는 올리지 않았음. 최신 기준본과 공개 가능한 파일만 사용했음.',output:'프로젝트 설정표 + 프로젝트 지침'},
  part3:{title:'실습 · 한 페이지 홈페이지 PRD 완성',goal:'방문자 여정에서 사이트맵·콘텐츠·기능까지 하나의 PRD로 연결했음',steps:['목적·방문자 정의','인지→행동 여정 작성','사이트맵·CTA 연결','기능·콘텐츠·비기능 요구 통합'],prompt:'아래 사업정보를 기준으로 한 페이지 홈페이지 PRD를 작성해 줘. ①목적과 핵심 방문자 ②방문자 질문 ③인지→이해→신뢰→비교→행동 여정 ④섹션 순서와 CTA ⑤필수 기능 ⑥모바일·개인정보·검색 기준 ⑦제외 범위를 표로 정리해 줘. [사업정보 붙여넣기]',caution:'페이지 수를 늘리기 전에 방문자 질문과 CTA가 연결되는지 확인했음. 추정한 가격·성과·후기는 사용하지 않았음.',output:'홈페이지 PRD v1.0'},
  part4:{title:'실습 · 디자인 기준과 핵심 화면 제작',goal:'참조·컬러·타이포·와이어프레임을 확정하고 공통 요소부터 구현했음',steps:['벤치마킹 판단 수집','컬러·타입 역할 확정','와이어프레임 승인','공통 요소→핵심 화면 구현'],prompt:'이 PRD를 기준으로 홈페이지 디자인·개발 작업지시서를 작성해 줘. ①참조할 판단과 배제할 요소 ②컬러 역할 ③PC·모바일 글자 크기 ④공통 컴포넌트 ⑤메인 화면 우선순위 ⑥완료 조건을 포함해 줘. [PRD 붙여넣기]',caution:'참조 사이트를 그대로 복제하지 않았음. 와이어프레임 승인 전에 세부 디자인과 기능 개발을 시작하지 않았음.',output:'디자인 기준 + 핵심 화면'},
  part5:{title:'실습 · 방문자·운영자 시나리오 검수',goal:'화면 감상이 아니라 실제 행동 시나리오로 오류를 재현했음',steps:['공개 URL 접속','방문자 핵심 행동 수행','운영자 처리 흐름 확인','오류 기록→수정→재검수'],prompt:'아래 홈페이지를 검수할 시나리오 표를 만들어 줘. 방문자·운영자·모바일·개인정보 관점별로 ①사전조건 ②행동순서 ③기대결과 ④실제결과 ⑤오류등급 ⑥재검수 결과 열을 포함해 줘. [URL/기능 목록]',caution:'오류는 “안 됨”이 아니라 환경·순서·기대·실제 결과로 기록했음. 수정 후 같은 조건으로 다시 확인했음.',output:'검수표 + 오류 수정 요청서'},
  part6:{title:'실습 · 도메인·검색·통계 오픈 체크',goal:'주소 연결부터 검색 등록과 측정 기준까지 공개 조건을 확인했음',steps:['도메인·DNS 현재값 기록','HTTPS·공개범위 확인','검색 소유권·사이트맵 제출','핵심 지표 기준 저장'],prompt:'홈페이지 오픈 체크리스트를 작성해 줘. 도메인·DNS·HTTPS·Google/네이버 검색 등록·사이트맵·접속통계·복구 기준을 포함하고, 각 항목에 담당자·현재 상태·완료 증거·문제 발생 시 되돌리기 방법을 넣어 줘.',caution:'DNS 변경 전 기존 값을 캡처했음. 검색 등록과 즉시 노출을 같은 의미로 보지 않았음.',output:'오픈 승인 체크리스트'},
  part7:{title:'실습 · 오픈 후 30일 운영계획 수립',goal:'콘텐츠·상담·통계를 주 단위 운영 루틴으로 바꿨음',steps:['고객 질문 수집','주간 콘텐츠 계획','문의 처리 상태 정의','지표 확인→개선 결정'],prompt:'내 홈페이지의 오픈 후 30일 운영계획을 만들어 줘. 1~4주별로 콘텐츠 발행·기존 정보 갱신·문의 후속 처리·접속/CTA 지표 확인·개선 실험을 배치하고, 담당자와 완료 기준을 표로 작성해 줘.',caution:'조회수만 보지 않고 CTA·문의·후속 처리까지 연결했음. 오래된 콘텐츠의 갱신일을 기록했음.',output:'30일 운영 캘린더'},
  part8:{title:'실습 · 무료 도구로 코드부터 Pages 공개까지',goal:'Chat 기획안·코드 생성·파일 저장·GitHub Pages 공개를 한 흐름으로 완료했음',steps:['기획안 확정','HTML·CSS·JS 생성','폴더 저장·로컬 확인','GitHub 업로드·Pages 공개'],prompt:'나는 [업종]의 한 페이지 홈페이지를 무료 도구로 공개하려고 해. ①방문자·목표·섹션 기획안 ②index.html·styles.css·app.js 코드 ③파일 저장·로컬 검수 ④GitHub 새 저장소 업로드 ⑤Settings → Pages → Deploy from a branch → main / root 설정 ⑥공개 URL 검수 순서로 안내해 줘. 모르는 사업정보는 만들지 말고 [확인 필요]로 남겨 줘.',caution:'공개 저장소에 개인정보·API 키·비공개 원본을 올리지 않았음. 배포가 지연되면 반복 업로드보다 Actions 상태를 먼저 확인했음.',output:'공개 홈페이지 URL'}
};
const partSlides = new Map(courseParts.map(part=>[part.id,[...part.chapters.map(c=>({part,kind:'lecture',id:`${part.id}-${c[0]}`,no:c[0],title:c[1],message:c[2],example:c[3],output:c[4]})),...(part.id==='part1'?[]:[{part,kind:'practice',id:`${part.id}-practice`,no:'실습',...partPractice[part.id]}])]]));
const allChapters = courseParts.flatMap(part=>partSlides.get(part.id));
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
function studentContent(c){
  const examples={
    '6':['프로젝트명 · 봄빛정원 상담형 홈페이지','목표 · 방문자가 3분 안에 서비스를 이해하고 상담을 신청함','완료 기준 · 모바일 문의 버튼과 공개 URL 확인'],
    '7':['문체 · 짧고 쉬운 존댓말 사용','사실 · 제공 자료에 없는 수치·후기는 만들지 않음','승인 · 가격·연락처·정책 변경은 공개 전 확인','보안 · 개인정보와 API 키를 코드에 넣지 않음'],
    '8':['기준본 · 회사소개·서비스 가격·연락처','콘텐츠 · 소개문·사례·FAQ','브랜드 · 로고·컬러·사진','운영자료 · 문의 처리·게시판 규칙'],
    '9':['Project · 자료와 결정사항을 기억함','Work · 기획·디자인·코드를 만들고 수정함','Sites · 실제 화면을 확인하고 공개함']
  };
  const points=examples[c.no]||[c.message,`현장 적용 · ${c.example}`,`확인 결과 · ${c.output}`];
  const compare=[['좋은 기준','방문자·행동·완료 조건이 구체적임'],['놓치기 쉬운 기준','예쁘게·적당히·알아서처럼 판단 근거가 없음']];
  const flow=['질문을 확인함','기준을 결정함','화면·문서로 확인함'];
  const imageMap={'1':'assets/website-visitor-journey.png','10':'assets/website-planning-blueprint.png','28':'assets/website-launch-qa.png','42':'assets/chatgpt-to-pages-workflow.png'};
  return {points,compare,flow,image:imageMap[c.no]||''};
}
function currentIndex(){ return currentId==='start' ? -1 : (chapterById(currentId)?.index ?? 0); }
function setCurrent(id){ currentId=id; renderAll(); document.getElementById('workspace')?.scrollIntoView({behavior:'smooth',block:'start'}); }
function getChapterIds(){ return allChapters.map(c=>c.id); }
function renderMap(){
  const el=document.getElementById('mapTrack'); if(!el)return;
  el.innerHTML=courseParts.map(p=>`<button class="map-card ${currentId.startsWith(p.id)?'active':''}" data-part="${p.id}" style="--accent:${p.accent}"><span class="map-no">${p.no}</span><strong>${p.short}</strong><small>${partSlides.get(p.id).length}개 슬라이드<br />${p.desc}</small></button>`).join('');
  el.querySelectorAll('.map-card').forEach(btn=>btn.addEventListener('click',()=>setCurrent(`${btn.dataset.part}-${courseParts.find(p=>p.id===btn.dataset.part).chapters[0][0]}`)));
}
function renderNav(){
  const nav=document.getElementById('courseNav'); if(!nav)return;
  nav.innerHTML=`<div class="course-nav"><div class="course-nav-part open"><button class="part-toggle" data-start="1"><span class="part-no">00</span><strong>시작하기</strong><small>▶</small></button><div class="chapter-list" style="display:block"><button class="chapter-link ${currentId==='start'?'active':''}" data-id="start">강의 전체 흐름</button></div></div>${courseParts.map(p=>{const slides=partSlides.get(p.id);return `<div class="course-nav-part ${currentId.startsWith(p.id)?'open':''}"><button class="part-toggle" data-part="${p.id}"><span class="part-no">${p.no}</span><strong>${p.title}</strong><small>${slides.length}장</small></button><div class="chapter-list">${slides.map(c=>`<button class="chapter-link ${currentId===c.id?'active':''} ${completed[c.id]?'completed':''} ${c.kind==='practice'?'practice-link':''}" data-id="${c.id}">${c.kind==='practice'?'실습 · ':`${c.no}장 · `}${c.title}</button>`).join('')}</div></div>`}).join('')}</div>`;
  nav.querySelectorAll('[data-id]').forEach(btn=>btn.addEventListener('click',()=>setCurrent(btn.dataset.id)));
  nav.querySelectorAll('[data-part]').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open')));
  nav.querySelector('[data-start]')?.addEventListener('click',()=>setCurrent('start'));
}
function renderSlide(){
  const el=document.getElementById('slideView'); if(!el)return;
  if(currentId==='start'){
    document.getElementById('stagePart').textContent='전체 흐름';document.getElementById('stageTime').textContent='수강생용 슬라이드';
    el.innerHTML=`<div class="slide-header"><div class="slide-kicker">COURSE MAP · 00</div><h2>질문에서 시작해<br /><span style="color:var(--blue)">공개 홈페이지까지 연결함</span></h2><p>이해 → 준비 → 기획 → 제작 → 검수 → 오픈 → 운영 → 무료 공개 순서로 진행함.</p></div><div class="student-flow">${courseParts.map(p=>`<div style="--accent:${p.accent}"><b>${p.no}</b><strong>${p.short}</strong><span>${p.desc}</span></div>`).join('')}</div><div class="student-takeaway"><strong>강의자료 사용법</strong><span>각 장에서는 개념과 사례를 이해하고, 02부부터는 파트 마지막 실습 장에서 결과물을 완성함.</span></div>`;
  } else {
    const c=chapterById(currentId); document.getElementById('stagePart').textContent=`${c.part.no}부 · ${c.part.title}`;document.getElementById('stageTime').textContent=c.kind==='practice'?'파트 통합 실습':'개념 · 사례';
    const done=!!completed[currentId];
    if(c.kind==='practice'){
      el.innerHTML=`<div class="slide-header practice-head" style="--slide-accent:${c.part.accent}"><div class="slide-kicker" style="color:${c.part.accent}">${c.part.no} · PART PRACTICE</div><h2>${c.title}</h2><p>${c.goal}</p></div><div class="practice-flow">${c.steps.map((x,i)=>`<div><b>${i+1}</b><span>${x}</span></div>`).join('')}</div><div class="practice-main"><div class="prompt-card"><label>복사해서 사용하는 프롬프트</label><p>${c.prompt}</p></div><div class="practice-check"><label>유의사항</label><p>${c.caution}</p><label>완료 결과</label><strong>${c.output}</strong></div></div>`;
    }else{
      const d=studentContent(c);const visual=d.image?`<img class="student-image" src="${d.image}" alt="${c.title} 이해를 돕는 장면" />`:'';const layout=Number(c.no)%3;
      const body=layout===0?`<div class="student-compare"><div><b>${d.compare[0][0]}</b><p>${d.compare[0][1]}</p></div><div><b>${d.compare[1][0]}</b><p>${d.compare[1][1]}</p></div></div>`:layout===1?`<div class="student-flow compact">${d.flow.map((x,i)=>`<div><b>${i+1}</b><strong>${x}</strong></div>`).join('')}</div>`:`<div class="student-example"><b>현장 예시</b>${d.points.map(x=>`<p>${x}</p>`).join('')}</div>`;
      el.innerHTML=`<div class="slide-header" style="--slide-accent:${c.part.accent}"><div class="slide-kicker" style="color:${c.part.accent}">${c.part.no} · ${c.part.short.toUpperCase()} / ${c.no}장</div><h2>${c.title}</h2><p>${c.message}</p></div><div class="student-lesson ${visual?'with-image':''}"><div><div class="student-points">${d.points.map((x,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><span>${x}</span></div>`).join('')}</div>${body}</div>${visual}</div><div class="student-takeaway"><strong>이 장에서 기억할 한 가지</strong><span>${c.message}</span></div>`;
    }
    const cb=document.getElementById('completeLesson');cb.textContent=done?'완료됨 · 다시 표시':'이 장 완료 표시';cb.classList.toggle('done',done);
  }
}
function renderProgress(){const pct=Math.round(Object.keys(completed).filter(k=>completed[k]).length/allChapters.length*100);const t=document.getElementById('progressText');const b=document.getElementById('progressBar');if(t)t.textContent=`${pct}%`;if(b)b.style.width=`${pct}%`}
function renderAll(){renderMap();renderNav();renderSlide();renderProgress();const i=currentIndex();const prev=document.getElementById('prevLesson');const next=document.getElementById('nextLesson');if(prev)prev.disabled=i<0;if(next)next.textContent=i>=allChapters.length-1?'처음으로 →':'다음 →';}
function navigate(delta){const i=currentIndex();if(i+delta<0){setCurrent('start');return}if(i+delta>=allChapters.length){setCurrent('start');return}setCurrent(allChapters[i+delta].id)}
function showTool(name){const m=document.getElementById('toolModal');const info=toolInfo[name];if(!m||!info)return;document.getElementById('toolModalTitle').textContent=name;document.getElementById('toolModalText').textContent=info.text;document.getElementById('toolModalSteps').innerHTML=info.steps.map((s,i)=>`<div class="modal-step"><i>${i+1}</i><span>${s}</span></div>`).join('');m.hidden=false}
function closeToolModal(){const m=document.getElementById('toolModal');if(m)m.hidden=true}
function openSlides(){window.open('slides.html?autoprint=1','_blank','noopener,noreferrer')}
function renderPrintDeck(){
  const deck=document.getElementById('printDeck');if(!deck)return;
  const total=allChapters.length+1;
  const cover=`<section class="print-slide print-cover"><div class="print-top"><b>홈페이지 만들기 프로젝트 WEB</b><span>수강생용</span></div><div class="cover-layout"><div><p class="eyebrow" style="color:#8baeff">UNDERSTAND · PLAN · BUILD · LAUNCH</p><h2>질문에서 시작해<br />공개 홈페이지까지</h2><p class="print-message">8개 파트의 개념·사례를 이해하고, 파트 마지막 실습에서 결과물을 완성함.</p></div><img src="assets/chatgpt-to-pages-workflow.png" alt="ChatGPT 대화에서 홈페이지 공개까지의 과정" /></div><div class="print-footer"><strong>전체 ${total}페이지</strong><span>수강생용 강의 슬라이드</span></div></section>`;
  const pages=allChapters.map((c,i)=>{if(c.kind==='practice')return `<section class="print-slide print-practice" style="--slide-accent:${c.part.accent}"><div class="print-top"><b>${c.part.no} · PART PRACTICE</b><span>${i+2} / ${total}</span></div><div class="print-heading"><h2>${c.title}</h2><p class="print-message">${c.goal}</p></div><div class="practice-flow print-flow">${c.steps.map((x,n)=>`<div><b>${n+1}</b><span>${x}</span></div>`).join('')}</div><div class="print-content"><div class="print-prompt"><label>복사해서 사용하는 프롬프트</label><p>${c.prompt}</p></div><div class="print-guide"><label>유의사항</label><p>${c.caution}</p><label>완료 결과</label><strong>${c.output}</strong></div></div><div class="print-footer"><strong>${c.part.title}</strong><span>통합 실습</span></div></section>`;const d=studentContent(c);const visual=d.image?`<img class="print-student-image" src="${d.image}" alt="${c.title} 이해를 돕는 장면" />`:'';return `<section class="print-slide" style="--slide-accent:${c.part.accent}"><div class="print-top"><b>${c.part.no} · ${c.part.short.toUpperCase()} / ${c.no}장</b><span>${i+2} / ${total}</span></div><div class="print-heading"><h2>${c.title}</h2><p class="print-message">${c.message}</p></div><div class="print-student-body ${visual?'with-image':''}"><div><div class="student-points print-points">${d.points.map((x,n)=>`<div><b>${String(n+1).padStart(2,'0')}</b><span>${x}</span></div>`).join('')}</div><div class="student-compare print-compare"><div><b>${d.compare[0][0]}</b><p>${d.compare[0][1]}</p></div><div><b>${d.compare[1][0]}</b><p>${d.compare[1][1]}</p></div></div></div>${visual}</div><div class="print-footer"><strong>핵심 · ${c.message}</strong><span>${c.part.title}</span></div></section>`}).join('');
  deck.innerHTML=cover+pages;
}

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
