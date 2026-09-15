(() => {
  'use strict';
  const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const makeSummary = (form) => {
    const title = clean(form.elements.title?.value);
    const subtitle = clean(form.elements.subtitle?.value);
    const intro = clean(form.elements.summary?.value);
    const body = clean(form.elements.body?.value);
    const source = intro || body || subtitle;
    const focus = source ? source.slice(0, 92).replace(/[.!?。！？]+$/, '') : '핵심 내용과 실전 활용 방법';
    const subject = title || '이번 콘텐츠';
    return subject + '의 핵심 내용과 활용 방법을 이해하기 쉽게 정리합니다. ' + focus + '을(를) 바탕으로 검색·질문·AI 추천에 필요한 정보를 한눈에 제공합니다.';
  };
  const init = () => {
    document.querySelectorAll('[data-generate-optimization]').forEach((button) => {
      if (button.dataset.ready === 'true') return;
      button.dataset.ready = 'true';
      button.addEventListener('click', () => {
        const form = button.closest('form');
        const field = form?.elements.optimization_summary;
        if (!form || !field) return;
        field.value = makeSummary(form);
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.focus();
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  new MutationObserver(init).observe(document.body, { childList: true, subtree: true });
})();
