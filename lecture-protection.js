(() => {
  'use strict';
  const selector = '#slideView';
  const protect = () => {
    const root = document.querySelector(selector);
    if (!root) return;
    root.classList.add('lecture-content-protected');
    root.querySelectorAll('canvas, img').forEach((element) => {
      element.setAttribute('draggable', 'false');
      element.addEventListener('dragstart', (event) => event.preventDefault(), { once: true });
    });
  };
  const blockInsideLesson = (event) => {
    if (event.target.closest && event.target.closest(selector)) event.preventDefault();
  };
  ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach((type) => {
    document.addEventListener(type, blockInsideLesson, true);
  });
  document.addEventListener('keydown', (event) => {
    if (!event.target.closest || !event.target.closest(selector)) return;
    if ((event.ctrlKey || event.metaKey) && ['c', 's', 'u', 'p'].includes(event.key.toLowerCase())) event.preventDefault();
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', protect);
  else protect();
  new MutationObserver(protect).observe(document.body, { childList: true, subtree: true });
})();
