const TOTAL_SLIDES = 70;
const PDF_PATH = 'assets/AI_홈페이지_웹서비스_강의안_최종70장.pdf';
const DONE_KEY = 'mentor-k-ai-lecture-done-v2';

const courseSections = [
  {key:'intro',no:'00',start:1,end:4,short:'시작',title:'과정 목표와 4시간 제작 흐름',desc:'강의 30% · 실습 70%',accent:'#2563eb',objective:'오늘 만들 결과물과 완료 기준을 먼저 공유함',cue:'수강생의 아이디어를 목적 문장 한 줄로 말하게 함',output:'목적 문장 · 사이트맵 · 작동 화면 · 공개 후보'},
  {key:'part1',no:'01',start:5,end:12,short:'이해',title:'홈페이지·웹서비스 개발환경의 변화',desc:'AI와 사람의 역할 이해',accent:'#173b78',objective:'홈페이지와 웹서비스의 구조 및 AI 협업 원리를 이해함',cue:'코드를 외우기보다 질문·판단·검수 역량에 초점을 맞춤',output:'제작 방식 선택 기준'},
  {key:'part2',no:'02',start:13,end:20,short:'기획',title:'홈페이지·웹서비스 기획 핵심',desc:'방문자 질문에서 구조로',accent:'#1876c9',objective:'목적·방문자·상황·정보·행동을 한 흐름으로 설계함',cue:'페이지 수보다 방문자의 질문과 다음 행동을 먼저 확인함',output:'목적 문장 · 방문자 여정 · 사이트맵'},
  {key:'part3',no:'03',start:21,end:29,short:'선택',title:'AI 도구와 제작환경 선택',desc:'Project·Work·Sites 역할',accent:'#1aa39b',objective:'도구별 역할과 작업 경계를 나누어 반복 제작 기준을 세움',cue:'한 도구에 모든 일을 맡기지 않고 자료·제작·검수를 분리함',output:'도구 역할표 · Project 지침'},
  {key:'part4',no:'04',start:30,end:46,short:'개발',title:'Project와 Work 실전 제작',desc:'기획안에서 MVP까지',accent:'#0c8895',objective:'자료와 지침을 모으고 PRD를 거쳐 작동하는 MVP를 제작함',cue:'짧은 개발→검토→수정 사이클과 승인 질문을 반복함',output:'Project · PRD · MVP · 관리자 화면'},
  {key:'part5',no:'05',start:47,end:56,short:'검수',title:'Sites에서 검수하고 수정',desc:'방문자처럼 실제 테스트',accent:'#f08070',objective:'첫 화면·모바일·기능·데이터·권한을 실제 사용자처럼 검수함',cue:'오류를 위치·재현 경로·기대 결과·실제 결과로 기록하게 함',output:'검수표 · 수정 요청서 · 공개 후보'},
  {key:'part6',no:'06',start:57,end:69,short:'공개',title:'공개·접속·검색·운영 연결',desc:'실제 서비스로 전환',accent:'#1461a8',objective:'공개 설정부터 도메인·HTTPS·검색·운영까지 연결함',cue:'공개 버튼보다 실제 접속·권한·모바일·검색 상태를 확인함',output:'공개 URL · 도메인 · 검색 등록 · 운영 기준'},
  {key:'closing',no:'07',start:70,end:70,short:'마무리',title:'제작 흐름을 내 프로젝트에 적용',desc:'Project → Work → Sites',accent:'#1aa39b',objective:'오늘 경험한 한 사이클을 각자의 홈페이지에 적용함',cue:'수강생별 다음 행동 한 가지와 공개 목표일을 확인함',output:'개인별 다음 실행 항목'}
];

const namedSlides = {
  1:'코딩 없이 만드는 홈페이지·웹서비스',2:'4시간 뒤 완성할 결과물',3:'강의 30% · 실습 70% 운영 방식',4:'이해에서 공개까지 한 사이클',
  5:'PART 1 · 개발환경의 변화',6:'코딩 중심에서 대화·검수 중심으로',7:'홈페이지·웹사이트·웹서비스·웹앱 구분',8:'웹서비스를 이루는 여섯 영역',9:'AI와 사람이 나누는 제작 역할',10:'AI의 생성·탐색·운영 역할',11:'바이브 코딩 반복 제작 루프',12:'제작 방식 선택 매트릭스',
  13:'PART 2 · 기획 핵심',14:'목적·방문자·상황·정보·행동',15:'홈페이지 목적 문장 공식',16:'방문자와 사용 상황 정의',17:'방문자 여정 설계',18:'사이트맵과 페이지 역할',19:'콘텐츠·이미지·신뢰·CTA',20:'완료 조건과 승인 기준',
  21:'ChatGPT·Gemini·Claude 작업환경 비교',22:'Project는 반복 제작의 운영 기준',23:'AI 도구별 역할 분담',24:'Project→Work→Sites 핵심 흐름',29:'Project 지침 작성 예시',
  30:'PART 4 · Project와 Work 실전 제작',37:'회사 홈페이지 기획 프롬프트',38:'AI에게 묻는 기획 핵심 질문',39:'PRD 작성 핵심 고려사항',40:'관리자 대시보드 설계',45:'MVP 개발·검토·수정 사이클',46:'수정·보완·추가 개발 분리',
  47:'PART 5 · Sites 검수와 수정',49:'첫 화면 3초 테스트',50:'콘텐츠·이미지·디자인 수정 요청',51:'모바일·UI·UX 검수',52:'기능·데이터·관리자 테스트',53:'오류 재현·수정·재테스트',54:'완성 결과 사용자 테스트',55:'개발·공개 전 최종 확인 질문',56:'버전 저장과 공개 후보 확정',
  57:'PART 6 · 실제 서비스로 전환',58:'Sites 공개 프로세스',59:'공개 전 최종 체크리스트',60:'방문자 기능과 관리자 운영',61:'배포와 접근 권한',62:'도메인·DNS·호스팅 연결',63:'도메인 등록과 DNS 관리',64:'호스팅 유형 선택',65:'무료 AI→GitHub Pages 공개',66:'보유 도메인·HTTPS·www 확인',67:'검색·SNS·AI가 읽는 정보 구조',68:'SEO·AEO·GEO 반영',69:'검색포털 등록과 공개 후 루틴',70:'감사합니다'
};

let currentSlide = 1;
let completed = {};
try { completed = JSON.parse(localStorage.getItem(DONE_KEY) || '{}'); } catch (error) { completed = {}; }

function sectionForSlide(number) {
  return courseSections.find(function(section){ return number >= section.start && number <= section.end; }) || courseSections[0];
}
function slideId(number) { return 'slide-' + String(number).padStart(3,'0'); }
function slideImage(number) { return 'assets/slides/' + slideId(number) + '.jpg'; }
function slideTitle(number) {
  const section = sectionForSlide(number);
  return namedSlides[number] || (section.short + ' 실전 · 슬라이드 ' + number);
}
function jumpToSlide(number, shouldScroll) {
  currentSlide = Math.min(TOTAL_SLIDES, Math.max(1, Number(number) || 1));
  renderAll();
  preloadSlide(currentSlide + 1);
  if (shouldScroll !== false) document.getElementById('workspace')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function preloadSlide(number) {
  if (number < 1 || number > TOTAL_SLIDES) return;
  const image = new Image();
  image.src = slideImage(number);
}

function renderMap() {
  const track = document.getElementById('mapTrack');
  if (!track) return;
  const active = sectionForSlide(currentSlide);
  track.innerHTML = courseSections.map(function(section){
    const count = section.end - section.start + 1;
    return '<button class="map-card ' + (active.key === section.key ? 'active' : '') + '" data-jump="' + section.start + '" style="--accent:' + section.accent + '"><span class="map-no">' + section.no + '</span><strong>' + section.short + '</strong><small>' + count + '장 · ' + section.desc + '<br>' + section.title + '</small></button>';
  }).join('');
  track.querySelectorAll('[data-jump]').forEach(function(button){ button.addEventListener('click',function(){ jumpToSlide(button.dataset.jump); }); });
}

function renderNavigation() {
  const nav = document.getElementById('courseNav');
  if (!nav) return;
  const active = sectionForSlide(currentSlide);
  nav.innerHTML = '<div class="course-nav">' + courseSections.map(function(section){
    const links = [];
    for (let number = section.start; number <= section.end; number += 1) {
      const id = slideId(number);
      links.push('<button class="chapter-link ' + (number === currentSlide ? 'active ' : '') + (completed[id] ? 'completed' : '') + '" data-slide="' + number + '">' + String(number).padStart(2,'0') + ' · ' + slideTitle(number) + '</button>');
    }
    return '<div class="course-nav-part ' + (active.key === section.key ? 'open' : '') + '"><button class="part-toggle" data-section="' + section.key + '"><span class="part-no">' + section.no + '</span><strong>' + section.title + '</strong><small>' + (section.end-section.start+1) + '장</small></button><div class="chapter-list">' + links.join('') + '</div></div>';
  }).join('') + '</div>';
  nav.querySelectorAll('[data-slide]').forEach(function(button){ button.addEventListener('click',function(){ jumpToSlide(button.dataset.slide); }); });
  nav.querySelectorAll('[data-section]').forEach(function(button){ button.addEventListener('click',function(){ button.parentElement.classList.toggle('open'); }); });
}

function renderSlide() {
  const view = document.getElementById('slideView');
  if (!view) return;
  const section = sectionForSlide(currentSlide);
  const title = slideTitle(currentSlide);
  const id = slideId(currentSlide);
  const partLabel = section.key === 'intro' || section.key === 'closing' ? section.title : 'PART ' + section.no + ' · ' + section.title;
  document.getElementById('stagePart').textContent = partLabel;
  document.getElementById('stageTime').textContent = '슬라이드 ' + currentSlide + ' / ' + TOTAL_SLIDES;
  view.innerHTML = '<figure class="source-slide-shell"><img class="source-slide" src="' + slideImage(currentSlide) + '" alt="' + title + '" width="1500" height="1000"><figcaption><strong>' + String(currentSlide).padStart(2,'0') + '</strong><span>' + title + '</span><em>가로 6 : 세로 4</em></figcaption></figure><div class="instructor-support" aria-label="강의 진행 지원 정보"><div><span>학습 목표</span><strong>' + section.objective + '</strong></div><div><span>강사 진행 포인트</span><strong>' + section.cue + '</strong></div><div><span>수강생 산출물</span><strong>' + section.output + '</strong></div></div>';
  const complete = document.getElementById('completeLesson');
  complete.textContent = completed[id] ? '완료됨 · 취소' : '이 슬라이드 완료';
  complete.classList.toggle('done',Boolean(completed[id]));
}

function renderProgress() {
  const count = Object.keys(completed).filter(function(key){ return completed[key]; }).length;
  const percent = Math.round((count/TOTAL_SLIDES)*100);
  const text = document.getElementById('progressText');
  const bar = document.getElementById('progressBar');
  if (text) text.textContent = percent + '%';
  if (bar) bar.style.width = percent + '%';
}
function renderControls() {
  const previous = document.getElementById('prevLesson');
  const next = document.getElementById('nextLesson');
  if (previous) previous.disabled = currentSlide === 1;
  if (next) {
    next.disabled = currentSlide === TOTAL_SLIDES;
    next.textContent = currentSlide === TOTAL_SLIDES ? '마지막 슬라이드' : '다음 →';
  }
}
function renderAll(){ renderMap(); renderNavigation(); renderSlide(); renderProgress(); renderControls(); }
function moveSlide(delta){ jumpToSlide(currentSlide + delta,false); }
function toggleComplete(){
  const id = slideId(currentSlide);
  completed[id] = !completed[id];
  if (!completed[id]) delete completed[id];
  localStorage.setItem(DONE_KEY,JSON.stringify(completed));
  renderAll();
}
function downloadPdf(){
  const anchor = document.createElement('a');
  anchor.href = PDF_PATH;
  anchor.download = 'AI_홈페이지_웹서비스_강의안_최종70장_엠아이넥스트_김용한.pdf';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
function openOverview(){ window.open('slides.html','_blank','noopener,noreferrer'); }
function toggleFullscreen(){
  const stage = document.getElementById('lessonStage');
  if (!stage) return;
  if (!document.fullscreenElement) stage.requestFullscreen().catch(function(){ stage.classList.toggle('presenting'); });
  else document.exitFullscreen();
}

const toolInfo = {
  Project:{text:'자료·지침·결정사항을 모아 반복 제작의 기준을 유지하는 공간입니다.',steps:['프로젝트명·목적·대상을 정합니다.','공개 가능한 기준자료를 올립니다.','문체·사실·보안·승인 지침을 고정합니다.']},
  Work:{text:'질문을 구조화해 기획안·PRD·MVP를 만들고 짧게 검토·수정하는 작업 공간입니다.',steps:['방문자 질문과 사이트맵을 만듭니다.','MVP 범위와 완료 조건을 정합니다.','작은 단위로 개발·검토·수정을 반복합니다.']},
  Sites:{text:'실제 결과를 방문자처럼 열어 보고 검수·수정·공개하는 공간입니다.',steps:['첫 화면과 모바일을 확인합니다.','기능·데이터·관리자·권한을 테스트합니다.','검수된 버전을 공개 후보로 확정합니다.']}
};
function showTool(name){
  const modal = document.getElementById('toolModal');
  const info = toolInfo[name];
  if (!modal || !info) return;
  document.getElementById('toolModalTitle').textContent = name;
  document.getElementById('toolModalText').textContent = info.text;
  document.getElementById('toolModalSteps').innerHTML = info.steps.map(function(step,index){ return '<div class="modal-step"><i>' + (index+1) + '</i><span>' + step + '</span></div>'; }).join('');
  modal.hidden = false;
}
function closeToolModal(){ const modal = document.getElementById('toolModal'); if (modal) modal.hidden = true; }

function renderPrintDeck(){
  const deck = document.getElementById('printDeck');
  if (!deck) return;
  const slides = [];
  for (let number=1; number<=TOTAL_SLIDES; number+=1) {
    slides.push('<section class="print-slide source-print-slide" data-slide="' + number + '"><img src="' + slideImage(number) + '" alt="' + slideTitle(number) + '" width="1500" height="1000" loading="' + (number<5?'eager':'lazy') + '"></section>');
  }
  deck.innerHTML = slides.join('');
}

document.addEventListener('DOMContentLoaded',function(){
  renderAll();
  renderPrintDeck();
  preloadSlide(2);
  document.getElementById('startCourse')?.addEventListener('click',function(){ jumpToSlide(1); });
  document.getElementById('openSlides')?.addEventListener('click',downloadPdf);
  document.getElementById('resourceSlides')?.addEventListener('click',downloadPdf);
  document.getElementById('toggleOverview')?.addEventListener('click',openOverview);
  document.getElementById('toggleFullscreen')?.addEventListener('click',toggleFullscreen);
  document.getElementById('prevLesson')?.addEventListener('click',function(){ moveSlide(-1); });
  document.getElementById('nextLesson')?.addEventListener('click',function(){ moveSlide(1); });
  document.getElementById('completeLesson')?.addEventListener('click',toggleComplete);
  document.querySelectorAll('[data-tool]').forEach(function(button){ button.addEventListener('click',function(){ showTool(button.dataset.tool); }); });
  document.getElementById('closeToolModal')?.addEventListener('click',closeToolModal);
  document.getElementById('toolModal')?.addEventListener('click',function(event){ if (event.target === event.currentTarget) closeToolModal(); });
  document.getElementById('openResources')?.addEventListener('click',function(){ document.getElementById('resources')?.scrollIntoView({behavior:'smooth'}); });
  document.getElementById('downloadChecklist')?.addEventListener('click',function(){ jumpToSlide(59); });
  document.getElementById('collapseNav')?.addEventListener('click',function(){ document.querySelector('.course-sidebar')?.classList.toggle('collapsed'); });
  document.addEventListener('fullscreenchange',function(){ document.getElementById('lessonStage')?.classList.toggle('presenting',Boolean(document.fullscreenElement)); });
  document.addEventListener('keydown',function(event){
    const tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.key === 'Escape') closeToolModal();
    if (['ArrowLeft','ArrowUp','PageUp'].includes(event.key)){ event.preventDefault(); moveSlide(-1); }
    if (['ArrowRight','ArrowDown','PageDown',' '].includes(event.key)){ event.preventDefault(); moveSlide(1); }
    if (event.key === 'Home') jumpToSlide(1,false);
    if (event.key === 'End') jumpToSlide(TOTAL_SLIDES,false);
    if (event.key.toLowerCase() === 'f') toggleFullscreen();
    if (event.key.toLowerCase() === 'o') openOverview();
  });
});
