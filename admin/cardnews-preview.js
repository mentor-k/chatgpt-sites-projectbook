(() => {
  'use strict';
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const init = () => {
    const form = document.querySelector('#cardnewsForm');
    const live = document.querySelector('#cardnewsLivePreview');
    if (!form || !live || live.dataset.ready === 'true') return;
    live.dataset.ready = 'true';
    const title = form.elements.title;
    const summary = form.elements.summary;
    const inputs = ['card01','card02','card03','card04','card05'].map((name) => form.querySelector('input[name="'+name+'"]'));
    const uploadPreview = document.querySelector('#cardnewsUploadPreview');
    const render = () => {
      const fallbackImages = [...(uploadPreview?.querySelectorAll('img') || [])];
      const cards = inputs.map((input, index) => {
        const file = input?.files?.[0];
        return file ? URL.createObjectURL(file) : (fallbackImages[index]?.src || '');
      });
      live.innerHTML = '<div class="cardnews-live-head"><small>공개 화면 미리보기</small><h3>'+esc(title?.value.trim() || '카드뉴스 주제')+'</h3><p>'+esc(summary?.value.trim() || '소개 문구가 이곳에 그대로 표시됩니다.')+'</p></div><div class="cardnews-live-cards">'+cards.map((src,index) => src ? '<figure><img src="'+esc(src)+'" alt="'+(index+1)+'장 미리보기"><figcaption>'+(index+1)+'장</figcaption></figure>' : '<span>이미지 '+(index+1)+'장</span>').join('')+'</div>';
    };
    [title, summary].forEach((field) => field?.addEventListener('input', render));
    inputs.forEach((input) => input?.addEventListener('change', render));
    new MutationObserver(render).observe(uploadPreview || form, {childList:true,subtree:true});
    render();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  new MutationObserver(init).observe(document.body, {childList:true,subtree:true});
})();
