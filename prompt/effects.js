/* Website effects prompt builder. No network requests or persistent storage. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  if (!$('effectsView')) return;
  let selected = websiteEffects[0], category = '전체';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const value = (id, fallback) => $(id).value.trim() || fallback;
  const normalize = value => value.toLocaleLowerCase().replace(/[\s·_-]+/g, '');
  function build(item) {
    return `당신은 접근성과 성능을 함께 고려하는 프론트엔드 개발자입니다. 기존 사이트에 「${item.title}」 효과를 추가하세요.\n\n1. 적용 범위\n사이트·페이지: ${value('effectsSite','[사이트·페이지]')}\n적용 요소: ${value('effectsTarget','[구체적인 제목·카드·배경·버튼]')}\n현재 기술: ${value('effectsStack','[현재 프로젝트의 기술 스택을 먼저 확인]')}\n브랜드·분위기: ${value('effectsBrand','[브랜드 색상·분위기]')}\n유지할 부분: ${value('effectsPreserve','기존 메뉴·본문·CTA·폼·URL·분석 이벤트')}\n현재 파일과 기존 효과를 먼저 조사하고 중복 효과는 추가하지 마세요. 요청한 요소에만 적용하며 다른 페이지·데이터·계정·권한·배포 설정을 임의 변경하지 마세요.\n\n2. 원하는 결과\n${item.summary}\n${item.instruction}\n${$('effectsIntensity').value==='subtle'?'움직임 강도는 차분하게: 템플릿의 이동거리·회전각·확대폭은 절반 수준부터 적용하고, 시간·정보·기능은 보존하세요. 순수 투명도와 정보형 진행률은 그대로 유지하세요.':'움직임 강도는 템플릿의 수치 범위 안에서 적용하고 과장된 반복을 추가하지 마세요.'}\n트리거, 시작·종료 상태, 지연, 지속시간, easing, 반복 여부를 수정 가능한 설정값으로 분리하세요. 효과가 정보의 의미를 바꾸지 않게 하세요.\n\n3. 구현 원칙\n기존 프레임워크와 라이브러리를 우선 활용하세요. 이 효과만을 위해 대형 의존성을 추가하지 말고 필요하다면 이유·용량 영향을 먼저 설명하세요. 기본은 CSS transform/opacity이며 스크롤 감지에는 IntersectionObserver, 연속 갱신에는 requestAnimationFrame을 사용하세요. 이벤트·타이머·observer는 화면 제거 시 정리하고 비활성 탭·화면 밖에서 불필요한 루프를 중지하세요. 레이아웃 측정과 쓰기를 반복 교차하지 말고 width/height·큰 blur의 매 프레임 변화를 피하세요.\n\n4. 반응형·접근성·실패 대비\n360px 모바일, 태블릿, 데스크톱 및 200% 확대에서 내용 잘림과 가로 넘침이 없게 하세요. hover 효과는 키보드 focus-visible과 터치 대안을 제공하며 필수 기능을 hover에만 숨기지 마세요. prefers-reduced-motion: reduce에서는 비필수 이동·반동·깜박임·자동 재생을 제거하고 완성 상태를 즉시 표시하세요. 문서의 읽기 순서·포커스·클릭 영역·명암 대비를 보존하세요. 장식은 aria-hidden과 pointer-events:none을 사용하고 보조기술에 중복 낭독하지 마세요. 반복 모션에는 정지 수단을 제공하며 빠른 점멸을 쓰지 마세요. JavaScript 실패·미지원 API에서도 본문과 핵심 행동은 작동해야 합니다.\n\n5. 납품과 검수\n변경한 파일·실행 방법·조절할 수치·정적 대체 동작을 설명하고 실제 동작하는 코드를 제공하세요. 첫 진입·재방문·빠른 반복 클릭·리사이즈·모바일 터치·키보드·동작 줄이기·스크립트 실패를 검증하세요. 기존 메뉴·링크·폼에 회귀가 없는지 확인하고 레이아웃 이동·스크롤 끊김·이벤트 누수도 점검하세요. 실제 실행한 테스트와 미확인 항목을 구분하고 측정하지 않은 성능 수치를 꾸미지 마세요. 실제 결과 화면과 구현 결과를 확인한 뒤 완료를 보고하세요.`;
  }
  function update() {
    $('effectsSelected').textContent = selected.title;
    $('effectsDetail').textContent = selected.instruction;
    $('effectsOutput').value = build(selected);
    $('effectsCopyStatus').textContent = '';
  }
  function render() {
    const query = normalize($('effectsSearch').value);
    const shown = websiteEffects.filter(item => (category === '전체' || category === item.category) && normalize([item.title,item.category,item.summary,item.instruction].join(' ')).includes(query));
    $('effectsCount').textContent = `${shown.length}개 표시 · 7개 분류 · 독자 작성 ${websiteEffects.length}개`;
    $('effectsGrid').innerHTML = shown.map(item => `<button class="effects-card${item.id===selected.id?' selected':''}" type="button" data-effect-id="${item.id}" aria-pressed="${item.id===selected.id}"><span class="effects-card-top">${esc(item.category)}<b>${item.id.slice(3)}</b></span><strong>${esc(item.title)}</strong><span>${esc(item.summary)}</span><small>${item.id===selected.id?'선택됨 · 아래에서 맞춤 설정':'선택하고 프롬프트 만들기 →'}</small></button>`).join('');
    $('effectsEmpty').hidden = shown.length > 0;
  }
  $('effectsFilters').innerHTML = ['전체',...new Set(websiteEffects.map(item=>item.category))].map(c=>`<button type="button" class="chip${c==='전체'?' active':''}" data-effect-category="${esc(c)}" aria-pressed="${c==='전체'}">${esc(c)}</button>`).join('');
  $('effectsFilters').addEventListener('click',event=>{
    const button=event.target.closest('[data-effect-category]');if(!button)return;
    category=button.dataset.effectCategory;
    for(const item of $('effectsFilters').children){item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));}
    render();
  });
  $('effectsSearch').addEventListener('input',render);
  $('effectsGrid').addEventListener('click',event=>{
    const button=event.target.closest('[data-effect-id]');if(!button)return;
    selected=websiteEffects.find(item=>item.id===button.dataset.effectId);render();update();
    $('effectsEditor').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    $('effectsSelected').focus({preventScroll:true});
  });
  $('effectsInputs').addEventListener('submit',event=>event.preventDefault());
  $('effectsInputs').addEventListener('input',update);
  $('effectsInputs').addEventListener('change',update);
  $('effectsReset').addEventListener('click',()=>{$('effectsInputs').reset();update();});
  $('effectsCopy').addEventListener('click',async()=>{
    const output=$('effectsOutput');
    try {
      await navigator.clipboard.writeText(output.value);
      $('effectsCopyStatus').textContent='현재 지시문을 복사했습니다. AI 개발 도구에 붙여 넣으세요.';
    } catch (_) {
      output.focus();output.select();
      $('effectsCopyStatus').textContent='자동 복사가 제한되어 전체 지시문을 선택했습니다. Ctrl+C 또는 ⌘C로 복사하세요.';
    }
  });
  render();update();
})();
