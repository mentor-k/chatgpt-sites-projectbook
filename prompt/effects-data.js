/* AI위드스쿨 독자 작성 웹사이트 효과 프롬프트. */
const websiteEffects = [
  {
    "id": "fx-01",
    "category": "등장·퇴장",
    "title": "페이드 인 · Fade in",
    "summary": "제목을 차분하게 드러내기",
    "instruction": "불투명도 0→1, 450ms, ease-out. 첫 화면 제목은 지연 없이, 아래쪽 요소는 화면에 20% 진입했을 때 한 번만 실행. JS 실행 실패 시 원문은 보이게 유지한다."
  },
  {
    "id": "fx-02",
    "category": "등장·퇴장",
    "title": "슬라이드 업 · Slide up",
    "summary": "설명과 카드를 아래에서 위로",
    "instruction": "translateY(20px)→0과 opacity 0→1을 500ms에 결합한다. 이동 때문에 주변 레이아웃이 밀리지 않게 transform만 사용하고, 긴 문장은 이동거리 12px로 줄인다."
  },
  {
    "id": "fx-03",
    "category": "등장·퇴장",
    "title": "스태거 · Stagger",
    "summary": "카드를 일정한 간격으로 순차 등장",
    "instruction": "카드 6개 이하를 DOM 읽기 순서대로 80ms 간격, 각 400ms에 등장시킨다. 전체 지연은 480ms 이하. 많은 결과는 현재 보이는 묶음만 처리하고 탭 이동이나 콘텐츠 접근을 기다리게 하지 않는다."
  },
  {
    "id": "fx-04",
    "category": "등장·퇴장",
    "title": "스케일 리빌 · Scale reveal",
    "summary": "새 콘텐츠를 작게 확대하며 등장",
    "instruction": "카드 크기 0.96→1, opacity 0→1, 350ms ease-out. transform-origin을 중앙으로 두고 제목·로고의 비율은 보존한다. 이미지 크기를 미리 예약해 레이아웃 이동을 막는다."
  },
  {
    "id": "fx-05",
    "category": "등장·퇴장",
    "title": "마스크 리빌 · Mask reveal",
    "summary": "이미지나 제목을 가림막으로 공개",
    "instruction": "요소의 위치는 고정하고 직사각형 clip-path를 왼쪽에서 오른쪽으로 600ms에 연다. 미지원 환경은 정적 노출. 실제 텍스트는 DOM에 유지하고 장식 마스크가 링크 클릭을 가리지 않게 한다."
  },
  {
    "id": "fx-06",
    "category": "등장·퇴장",
    "title": "교차 페이드 · Crossfade",
    "summary": "콘텐츠 교체를 부드럽게 연결",
    "instruction": "사용자가 선택한 탭의 장식 이미지 두 장만 220ms에 교차 전환한다. 본문·포커스·선택 상태는 즉시 바꾼다. 중복 이미지의 alt는 하나만 읽히고 연속 클릭 시 마지막 선택이 우선한다."
  },
  {
    "id": "fx-07",
    "category": "스크롤",
    "title": "패럴랙스 · Parallax",
    "summary": "전경과 배경에 절제된 깊이",
    "instruction": "배경 레이어에만 뷰포트 이동량의 0.12배, 최대 ±36px 이동을 적용한다. 본문과 CTA는 고정 가독성을 유지한다. 모바일·터치·동작 줄이기에서는 정적 배경이며 스크롤 자체를 가로채지 않는다."
  },
  {
    "id": "fx-08",
    "category": "스크롤",
    "title": "스크롤 리빌 · Scroll reveal",
    "summary": "읽는 위치에 따라 섹션 공개",
    "instruction": "IntersectionObserver로 섹션이 15% 보일 때 400ms 등장하고 observer를 해제한다. 긴 섹션은 첫 부분 기준으로 작동하게 한다. 숨김 상태를 기본 HTML에 고정하지 않아 JS 오류나 검색엔진에서도 본문이 남는다."
  },
  {
    "id": "fx-09",
    "category": "스크롤",
    "title": "읽기 진행바 · Reading progress",
    "summary": "긴 설명의 읽은 위치 보여주기",
    "instruction": "본문 시작과 끝을 기준으로 상단 3px 진행바를 0~100% 표시한다. 문서 높이 변경과 리사이즈 때 재계산하고 스크롤 없는 페이지는 바를 숨긴다. 숫자 안내는 매 프레임 읽지 않으며 헤더·포커스를 덮지 않는다."
  },
  {
    "id": "fx-10",
    "category": "스크롤",
    "title": "스티키 스토리 · Sticky story",
    "summary": "설명 단계와 그림을 연결",
    "instruction": "데스크톱에서 그림은 sticky, 3개 설명은 정상 세로 흐름으로 배치한다. 현재 단계 그림만 250ms 전환하고 모바일은 각 설명 아래 그림을 정적으로 둔다. 스크롤 잠금·강제 스냅·불필요한 빈 높이를 만들지 않는다."
  },
  {
    "id": "fx-11",
    "category": "스크롤",
    "title": "카드 스택 · Card stack",
    "summary": "쌓이는 카드로 단계 설명",
    "instruction": "데스크톱의 3개 카드를 sticky top 간격 24px로 쌓되 현재 카드의 내용이 모두 읽힌 뒤 다음 카드가 덮게 한다. 긴 카드·작은 화면·200% 확대에서는 일반 세로 목록으로 전환한다. 키보드 포커스가 덮인 카드 안에 갇히지 않게 한다."
  },
  {
    "id": "fx-12",
    "category": "스크롤",
    "title": "가로 스크롤 갤러리",
    "summary": "작품을 옆으로 넘겨 탐색",
    "instruction": "CSS overflow-x와 선택적 scroll-snap을 사용하고 이전·다음 버튼, 현재 항목 안내를 제공한다. 휠의 세로 스크롤을 강제로 가로로 변환하지 않는다. 터치 스와이프·키보드·버튼 모두 작동하고 자동 재생은 하지 않는다."
  },
  {
    "id": "fx-13",
    "category": "타이포·숫자",
    "title": "카운트업 · Count up",
    "summary": "검증된 성과 수치를 강조",
    "instruction": "제공된 실제 최종값을 HTML에 먼저 출력한다. 보일 때만 0부터 목표값까지 900ms 동안 한 번 표시하며 소수점·음수·천단위·단위를 보존한다. 스크린리더에는 최종값만 전달하고 aria-live로 매 숫자를 낭독하지 않는다."
  },
  {
    "id": "fx-14",
    "category": "타이포·숫자",
    "title": "타이핑 · Typewriter",
    "summary": "짧은 핵심 문장을 타자로 표현",
    "instruction": "한 문장 30자 이내를 초당 15자로 한 번 표시하고 즉시 전체 보기 버튼을 둔다. 한글 조합 문자를 분리하지 않으며 공간을 미리 확보한다. 보조기술에는 완성 문장 하나만 읽히고 깜박이는 커서 반복은 제거한다."
  },
  {
    "id": "fx-15",
    "category": "타이포·숫자",
    "title": "단어별 등장 · Text reveal",
    "summary": "긴 제목을 읽는 순서로 공개",
    "instruction": "제목을 단어 단위로 나눠 60ms 간격, 300ms opacity/translateY(8px) 효과를 한 번 실행한다. 원문의 띄어쓰기·한글·접근 가능한 제목 이름을 그대로 보존하고 모바일 줄바꿈을 고정하지 않는다."
  },
  {
    "id": "fx-16",
    "category": "타이포·숫자",
    "title": "밑줄 드로잉 · Underline",
    "summary": "핵심 단어 아래 선 그리기",
    "instruction": "핵심 단어 아래 pseudo-element의 scaleX 0→1을 350ms 적용한다. 장식선은 문자를 가리지 않고 링크 밑줄과 혼동되지 않게 한다. 여러 줄이면 각 줄에 자연스럽게 대응하거나 정적 강조로 대체한다."
  },
  {
    "id": "fx-17",
    "category": "타이포·숫자",
    "title": "그라디언트 텍스트",
    "summary": "브랜드 색으로 제목에 깊이",
    "instruction": "제목 한 줄에만 두 브랜드 색의 정적 그라디언트를 적용하고, 사용자가 재생을 누른 경우에만 3초짜리 빛 이동을 한 번 적용한다. background-clip 미지원과 고대비 모드에서는 읽을 수 있는 단색 글자로 대체한다."
  },
  {
    "id": "fx-18",
    "category": "호버·클릭",
    "title": "호버 리프트 · Hover lift",
    "summary": "클릭 가능한 카드의 반응",
    "instruction": "실제 링크 카드만 hover와 focus-visible에서 translateY(-4px), 180ms ease-out, 절제된 그림자를 적용한다. 비클릭 카드에 클릭 커서를 붙이지 않고 터치에서는 눌림 피드백만 제공한다."
  },
  {
    "id": "fx-19",
    "category": "호버·클릭",
    "title": "버튼 눌림 · Press feedback",
    "summary": "클릭에 짧고 정확한 응답",
    "instruction": "버튼 active 상태에서 scale(0.98), 100ms 복원을 적용한다. 클릭 즉시 기존 동작을 실행하고 애니메이션 종료를 기다리지 않는다. 로딩·비활성·중복 제출 방지 상태는 원래 로직과 연결한다."
  },
  {
    "id": "fx-20",
    "category": "호버·클릭",
    "title": "리플 · Ripple",
    "summary": "클릭 지점에서 퍼지는 파동",
    "instruction": "버튼 내부에만 지름이 확장되는 낮은 불투명도 원을 400ms 한 번 보여준다. 키보드 활성화는 중앙에서 시작하고 생성 노드는 종료 시 정리한다. 파동은 pointer-events:none, aria-hidden으로 기능을 방해하지 않는다."
  },
  {
    "id": "fx-21",
    "category": "호버·클릭",
    "title": "마그네틱 버튼 · Magnetic",
    "summary": "포인터에 살짝 반응하는 CTA",
    "instruction": "정밀 포인터 hover일 때만 버튼 내부 장식을 최대 6px 이동시킨다. 실제 버튼 클릭 영역·텍스트·포커스 링은 이동하지 않는다. 포인터 이탈 시 180ms 복원, 터치·키보드·동작 줄이기에서는 정적이다."
  },
  {
    "id": "fx-22",
    "category": "호버·클릭",
    "title": "3D 틸트 · Tilt",
    "summary": "카드가 포인터 방향으로 기울기",
    "instruction": "정밀 포인터에서만 rotateX/Y 각 ±5도 이하, perspective 900px로 장식 레이어를 기울인다. 읽을 텍스트·버튼은 안정적으로 유지한다. 이탈 시 원위치, 화면 밖 이벤트 계산은 중지하고 터치는 정적 카드로 제공한다."
  },
  {
    "id": "fx-23",
    "category": "호버·클릭",
    "title": "스포트라이트 · Spotlight",
    "summary": "카드 위 포인터 위치를 은은하게",
    "instruction": "카드 안에만 낮은 불투명도 radial-gradient 하이라이트를 배치한다. 포인터 이벤트는 requestAnimationFrame으로 묶고 CSS 변수로 좌표를 전달한다. 텍스트 대비와 기존 커서를 보존하고 포커스 시에는 고정 테두리로 같은 의미를 전달한다."
  },
  {
    "id": "fx-24",
    "category": "배경·장식",
    "title": "메시 그라디언트 · Mesh",
    "summary": "브랜드 컬러가 섞이는 배경",
    "instruction": "CSS 그라디언트 3개 이하로 정적 메시 배경을 만든다. 선택적인 8초 1회 이동은 배경 레이어 transform만 사용하고 본문에는 불투명 패널을 둔다. 지속 재생을 켤 경우 정지 버튼을 제공한다."
  },
  {
    "id": "fx-25",
    "category": "배경·장식",
    "title": "플로팅 · Floating",
    "summary": "작은 장식에 가벼운 부유감",
    "instruction": "장식 아이콘 3개 이하만 translateY ±6px, 4초 주기로 최대 한 주기 움직인다. 필수 정보·CTA는 움직이지 않는다. 반복을 명시적으로 켠 경우 정지 버튼을 두고 페이지가 숨겨지면 정지한다."
  },
  {
    "id": "fx-26",
    "category": "배경·장식",
    "title": "입자 배경 · Particles",
    "summary": "희미한 점으로 공간감 표현",
    "instruction": "장식 점 최대 30개를 canvas 한 개로 표현하고 모바일은 최대 12개 또는 정적 이미지로 대체한다. DPR 상한 2, 화면 밖·탭 비활성 시 중지. 클릭 기능 없는 배경은 pointer-events:none과 aria-hidden을 적용하며 정지 버튼을 제공한다."
  },
  {
    "id": "fx-27",
    "category": "배경·장식",
    "title": "SVG 선 그리기 · Draw line",
    "summary": "흐름·연결선을 순서대로 설명",
    "instruction": "직접 보유한 단순 SVG 경로의 실제 길이를 기준으로 stroke-dashoffset을 800ms 한 번 변화시킨다. 화살표 방향과 설명 순서를 일치시키고 SVG 미지원·동작 줄이기는 완성 경로를 표시한다. 의미 있는 도식에는 텍스트 설명을 함께 둔다."
  },
  {
    "id": "fx-28",
    "category": "전환·상태",
    "title": "아코디언 전환",
    "summary": "FAQ를 열고 닫는 흐름",
    "instruction": "기존 details/summary 또는 접근 가능한 버튼 구조를 유지한다. 펼침은 200ms 이내이며 동적 콘텐츠 높이를 안전하게 계산한다. aria-expanded, 키보드, 빠른 재클릭을 검증하고 닫힐 내용 안에 포커스가 있으면 트리거로 되돌린다."
  },
  {
    "id": "fx-29",
    "category": "전환·상태",
    "title": "탭 전환 · Tab transition",
    "summary": "분류 변경을 자연스럽게",
    "instruction": "선택된 패널만 160ms opacity 전환하고 선택 표시·aria-selected는 즉시 갱신한다. 기존 URL·뒤로가기·키보드 좌우 이동을 보존한다. 연속 선택 중 오래된 애니메이션을 취소하고 마지막 탭을 표시한다."
  },
  {
    "id": "fx-30",
    "category": "전환·상태",
    "title": "스켈레톤 · Skeleton",
    "summary": "실제 로딩의 빈 자리를 안내",
    "instruction": "실제 비동기 요청이 있는 구간에만 최종 레이아웃과 같은 크기의 정적 스켈레톤을 둔다. 필요하면 낮은 대비의 1회 쉬머만 적용한다. aria-busy와 한 번의 로딩 안내, 오류·재시도·빈 결과 상태를 제공하고 가짜 대기시간을 넣지 않는다."
  },
  {
    "id": "fx-31",
    "category": "전환·상태",
    "title": "페이지 전환 · View transition",
    "summary": "탐색 맥락을 잃지 않는 전환",
    "instruction": "지원 브라우저에서만 View Transition API로 본문을 180ms 교차 전환한다. 기능 탐지 후 미지원은 정상 탐색으로 대체한다. 뒤로가기·스크롤 복원·페이지 제목·초점 이동을 보존하고 링크 목적이나 URL을 바꾸지 않는다."
  },
  {
    "id": "fx-32",
    "category": "타이밍·조합",
    "title": "이징 · Easing",
    "summary": "시작과 끝의 속도를 조절",
    "instruction": "등장은 cubic-bezier(0.22,1,0.36,1) 400ms, 버튼 피드백은 ease-out 150ms, 퇴장은 ease-in 160ms를 CSS 변수로 분리한다. 위치·시간을 동시에 과도하게 바꾸지 말고 선형과 비교 가능한 작은 미리보기로 차이를 설명한다."
  },
  {
    "id": "fx-33",
    "category": "타이밍·조합",
    "title": "절제된 스프링 · Spring",
    "summary": "한 번의 반동으로 강조",
    "instruction": "강조 카드 하나만 scale 0.96→1.02→1, 500ms 총 길이로 한 번 수렴시킨다. 계속 튀는 루프는 금지하고 기존 라이브러리가 없다면 CSS keyframes로 구현한다. 글자나 로고 자체는 찌그러뜨리지 않는다."
  },
  {
    "id": "fx-34",
    "category": "타이밍·조합",
    "title": "히어로 통합 연출",
    "summary": "제목·설명·CTA를 한 흐름으로",
    "instruction": "제목은 400ms 페이드 인, 설명은 100ms 뒤 400ms 슬라이드 업, CTA는 200ms 뒤 300ms 등장으로 구성한다. 전체 700ms 이내, CTA는 즉시 클릭 가능. 주요 이미지·본문 렌더링을 지연하지 않고 배경 효과는 한 가지로 제한한다."
  },
  {
    "id": "fx-35",
    "category": "타이밍·조합",
    "title": "성과 섹션 통합 연출",
    "summary": "카드 등장과 숫자 강조 조합",
    "instruction": "성과 카드 최대 4개를 80ms 스태거로 등장시키고 각 카드가 보이면 검증된 숫자만 800ms 카운트업한다. 단위·기준일·출처를 함께 표시한다. 한 번만 실행하고 탭 복귀나 필터 변경으로 수치를 반복 초기화하지 않는다."
  },
  {
    "id": "fx-36",
    "category": "타이밍·조합",
    "title": "모션 접근성·성능 리팩터링",
    "summary": "기존 과한 효과를 안전하게 정리",
    "instruction": "현재 모션을 트리거·대상·지속시간·반복·성능비용 표로 조사한다. 중복 루프·강제 스크롤·과한 흔들림을 제거하고 transform/opacity 중심으로 수정한다. 동작 줄이기, JS 오류, 터치, 키보드, 느린 기기에서 정보와 기능을 보존하는 정적 대안을 구현한다."
  }
];
