const TOTAL_SLIDES = 69;
const PDF_PATH = 'assets/0917_homepage_webservice_lecture.pdf';
const PDF_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const DONE_KEY = 'mentor-k-ai-lecture-done-v3';

const courseSections = [
  {key:'intro',no:'00',start:1,end:3,short:'시작',title:'과정 목표와 강의 진행 안내',desc:'핵심지식 1시간 · 실습 3시간',accent:'#2563eb',objective:'오늘 강의에서 만들 결과물과 전체 작업 순서를 이해함',cue:'4시간 뒤 완성할 결과물을 수강생의 아이디어와 연결함',output:'제작 주제 · 목표 · 실습 흐름'},
  {key:'part1',no:'01',start:4,end:10,short:'변화',title:'홈페이지·웹서비스 개발환경 변화',desc:'코드에서 프롬프트·에이전트로',accent:'#173b78',objective:'홈페이지·웹서비스의 범위와 AI 시대 제작 방식 변화를 이해함',cue:'코딩이 사라진 것이 아니라 지시하고 검수하는 방식으로 바뀌었음을 강조함',output:'만들 결과물과 제작 방식 선택'},
  {key:'part2',no:'02',start:11,end:20,short:'도구',title:'AI 도구의 활용',desc:'Project → Work → Sites → Open',accent:'#1aa39b',objective:'Project·Work·Sites의 역할과 AI 도구 활용 흐름을 이해함',cue:'Project가 기준을 기억하고 Work가 만들며 Sites가 실제 결과를 보여준다고 설명함',output:'도구 역할표 · Project 운영 기준'},
  {key:'part3',no:'03',start:21,end:32,short:'기획',title:'Work에서 홈페이지 기획',desc:'목적 → 방문자 → 사이트맵 → PRD',accent:'#1876c9',objective:'페이지보다 먼저 방문자의 질문과 다음 행동을 설계함',cue:'인천 아일랜드 투어 예시를 기준으로 목적·방문자·사이트맵·PRD를 연결함',output:'목적 문장 · 방문자 · 사이트맵 · PRD 초안'},
  {key:'part4',no:'04',start:33,end:44,short:'개발',title:'Work에서 개발',desc:'기획·디자인·개발 기준 확정',accent:'#0c8895',objective:'기획안과 기준을 개발 가능한 구조·화면·기능으로 바꿈',cue:'벤치마킹부터 컬러·폰트·와이어프레임·관리자까지 순서대로 확정함',output:'사이트 구조 · 와이어프레임 · MVP 개발 요청'},
  {key:'part5',no:'05',start:45,end:58,short:'검수',title:'Sites에서 검수·수정·배포',desc:'실화면 → 시나리오 → 모바일 → 보안 → 재검수',accent:'#f08070',objective:'실제 화면을 방문자처럼 검수하고 배포·호스팅·도메인까지 연결함',cue:'문제를 재현 가능한 수정 요청으로 바꾸고 반드시 재검수함',output:'검수표 · 수정목록 · 공개 버전 · 도메인 계획'},
  {key:'part6',no:'06',start:59,end:68,short:'실습',title:'홈페이지 만들기 실습',desc:'프로젝트 개설 → 기획 → 개발 → 오픈',accent:'#1461a8',objective:'Project·Work·Codex·GitHub를 사용해 홈페이지를 실제로 오픈함',cue:'중간 결과를 저장하고 체크한 뒤 다음 단계로 이동함',output:'기획안 · MVP · 검수 결과 · 공개 URL'},
  {key:'closing',no:'07',start:69,end:69,short:'마무리',title:'실습 결과를 실제 서비스로 연결',desc:'오늘의 제작 사이클 정리',accent:'#1aa39b',objective:'오늘 배운 제작 사이클을 자신의 프로젝트에 적용할 다음 행동을 정함',cue:'공개 목표일과 가장 먼저 할 한 가지를 말하게 함',output:'개인별 다음 실행 항목'}
];

const namedSlides = {
  1:'코딩 없이 반나절 만에 만드는 홈페이지와 웹서비스',
  2:'강의 진행 안내',
  3:'목차',
  4:'PART 1 · 홈페이지·웹서비스 개발환경 변화',
  5:'홈페이지 제작 환경의 변화',
  6:'참고 · 홈페이지 제작 방식 비교',
  7:'무엇을 만들 것인가?',
  8:'홈페이지·웹서비스의 구조',
  9:'에이전트 시대의 웹사이트',
  10:'바이브코딩과 웹사이트',
  11:'PART 2 · AI 도구의 활용',
  12:'Project를 잘 만들어야 Work의 결과도 안정적',
  13:'Project 기준을 분명히 해야 Work의 결과물을 만족',
  14:'ChatGPT Chat vs GPTs vs Project 비교',
  15:'Project 지침에 역할·품질·승인 기준을 넣는다',
  16:'좋은 결과는 좋은 기준에서 시작된다',
  17:'ChatGPT 주요 활용 도구',
  18:'AI를 업무에 넣을 때 결과품질과 검수',
  19:'사이트 기획 프로세스',
  20:'ChatGPT Sites 활용 사이트 구축',
  21:'PART 3 · Work에서 홈페이지 기획',
  22:'Work에서 홈페이지를 기획하다',
  23:'목적·방문자·사이트맵·PRD 연결',
  24:'Work에서 질문을 구조화하는 법',
  25:'PRD(Project Request Document) 초안 만들기',
  26:'웹사이트 기획 예시 · 목적과 방문자',
  27:'웹사이트 기획 예시 · 방문자 여정',
  28:'웹사이트 기획 예시 · 사이트맵',
  29:'웹사이트 기획 예시 · 페이지 구조',
  30:'웹사이트 기획 예시 · 콘텐츠 구성',
  31:'웹사이트 기획 예시 · 기능과 운영',
  32:'웹사이트 기획 예시 · 기획안 완성',
  33:'PART 4 · Work에서 개발',
  34:'벤치마킹 포인트',
  35:'Work/Codex로 개발',
  36:'사이트 구조',
  37:'와이어프레임',
  38:'공통 레이아웃과 컴포넌트',
  39:'컬러·폰트·글자 사이즈',
  40:'페이지 콘텐츠',
  41:'상세페이지',
  42:'UI·UX',
  43:'프론트엔드',
  44:'관리자 대시보드',
  45:'PART 5 · Sites에서 검수·수정·배포',
  46:'사이트 검수와 수정 프로세스',
  47:'사이트 검수의 내용',
  48:'타겟·역할 시나리오로 검수',
  49:'모바일 최적화 검수',
  50:'개인정보·보안·관리자 기능 검수',
  51:'오류 수정',
  52:'저장과 배포',
  53:'도메인·호스팅',
  54:'참고 · 호스팅 방식의 비교',
  55:'도메인·호스팅 실전 확인',
  56:'공개 후 개선 반복',
  57:'웹사이트의 완성 · 운영 가능한 서비스로',
  58:'웹사이트의 완성 · 지속 개선의 기준',
  59:'PART 6 · 홈페이지 만들기 실습',
  60:'프로젝트 개설 및 지침 설정',
  61:'Work로 기획안 만들기',
  62:'Work로 기획안 검토하기',
  63:'WORK/Codex에 PRD 기준으로 개발 요청',
  64:'MVP 보완·수정',
  65:'Work로 개발 사이트 검수',
  66:'도메인과 호스팅으로 오픈',
  67:'참고 · GitHub로 호스팅 ①',
  68:'참고 · GitHub로 호스팅 ②',
  69:'감사합니다 · 실습 결과를 실제 서비스로 연결'
};

let currentSlide = 1;
let completed = {};
try { completed = JSON.parse(localStorage.getItem(DONE_KEY) || '{}'); } catch (error) { completed = {}; }
let pdfDocument = null;
let pdfLoadPromise = null;
let pdfRenderToken = 0;

function loadPdfDocument(){
  if (pdfDocument) return Promise.resolve(pdfDocument);
  if (typeof window.pdfjsLib === 'undefined') return Promise.reject(new Error('PDF.js unavailable'));
  if (!pdfLoadPromise) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER;
    pdfLoadPromise = window.pdfjsLib.getDocument(PDF_PATH).promise.then(function(pdf){ pdfDocument = pdf; return pdf; });
  }
  return pdfLoadPromise;
}
async function renderPdfSlide(number){
  const token = ++pdfRenderToken;
  const canvas = document.getElementById('slideCanvas');
  const frame = document.getElementById('pdfSlideFrame');
  const status = document.getElementById('pdfSlideStatus');
  if (!canvas || !frame) return;
  if (status) { status.hidden = false; status.textContent = '슬라이드 불러오는 중…'; }
  try {
    const pdf = await loadPdfDocument();
    const page = await pdf.getPage(number);
    if (token !== pdfRenderToken || currentSlide !== number) return;
    const baseViewport = page.getViewport({scale:1});
    const cssWidth = Math.min(frame.clientWidth || 900, 1500);
    const scale = cssWidth / baseViewport.width;
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const renderViewport = page.getViewport({scale:scale * outputScale});
    canvas.width = Math.ceil(renderViewport.width);
    canvas.height = Math.ceil(renderViewport.height);
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = (baseViewport.height * scale) + 'px';
    await page.render({canvasContext:canvas.getContext('2d'),viewport:renderViewport}).promise;
    canvas.setAttribute('aria-label', slideTitle(number));
    if (status) status.hidden = true;
  } catch (error) {
    if (status) status.textContent = 'PDF 뷰어를 불러오지 못했습니다. 아래 원본 PDF를 열어 확인해 주세요.';
    console.error(error);
  }
}

function sectionForSlide(number) {
  return courseSections.find(function(section){ return number >= section.start && number <= section.end; }) || courseSections[0];
}
function slideId(number) { return 'slide-' + String(number).padStart(3,'0'); }
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
function preloadSlide(number){ return number >= 1 && number <= TOTAL_SLIDES; }

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
  view.innerHTML = '<figure class="source-slide-shell"><div class="pdf-slide-frame" id="pdfSlideFrame"><canvas class="source-slide pdf-slide-canvas" id="slideCanvas" width="1500" height="1000"></canvas><div class="pdf-slide-status" id="pdfSlideStatus" role="status">슬라이드 불러오는 중…</div></div><figcaption><strong>' + String(currentSlide).padStart(2,'0') + '</strong><span>' + title + '</span><em>가로 6 : 세로 4</em></figcaption></figure><div class="instructor-support" aria-label="강의 진행 지원 정보"><div><span>학습 목표</span><strong>' + section.objective + '</strong></div><div><span>강사 진행 포인트</span><strong>' + section.cue + '</strong></div><div><span>수강생 산출물</span><strong>' + section.output + '</strong></div></div>';
  renderPdfSlide(currentSlide);
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
  anchor.download = '0917_홈페이지_웹서비스_강의안_엠아이넥스트_김용한.pdf';
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

function renderPrintDeck(){}

document.addEventListener('DOMContentLoaded',function(){
  renderAll();
  preloadSlide(2);
  document.getElementById('startCourse')?.addEventListener('click',function(){ jumpToSlide(1); });
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
  document.getElementById('downloadChecklist')?.addEventListener('click',function(){ jumpToSlide(52); });
  document.getElementById('collapseNav')?.addEventListener('click',function(){ document.querySelector('.course-sidebar')?.classList.toggle('collapsed'); });
  let resizeTimer;
  window.addEventListener('resize',function(){ clearTimeout(resizeTimer); resizeTimer = setTimeout(function(){ if (pdfDocument) renderPdfSlide(currentSlide); },150); });
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
