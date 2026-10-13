/* Facebook / Threads / link copy, initialized only on public article surfaces. */
(() => {
  'use strict';
  if (window.AIWithSharebars) { window.AIWithSharebars.refresh(); return; }
  const VERSION = '20261013-share-1';
  let sequence = 0;
  const normalizeTitle = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const httpURL = (value) => {
    try { const url = new URL(value, location.href); return /^https?:$/.test(url.protocol) ? url : null; }
    catch (_) { return null; }
  };
  const pageURL = () => {
    const current = new URL(location.href);
    // The legacy card-news page canonical is its archive. Preserve the actual post identity.
    if (/^\/cardnews\/view\/?$/.test(current.pathname) && current.searchParams.get('slug')) {
      const detail = new URL(current.pathname, current.origin);
      detail.searchParams.set('slug', current.searchParams.get('slug'));
      return detail.href;
    }
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const url = (canonical && httpURL(canonical)) || current;
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) url.searchParams.delete(key);
    return url.href;
  };
  const icons = {
    facebook: '<svg class="aiwith-sharebar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.8l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8Z"/></svg>',
    threads: '<svg class="aiwith-sharebar__icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M19 6.5C17.5 4.2 15.1 3 12 3c-5 0-8 3.4-8 9s3 9 8 9c4.5 0 7.5-2.4 7.5-6 0-3-2.6-4.7-6-4.7-2.7 0-4.5 1.2-4.5 3.1 0 1.7 1.3 2.7 3.1 2.7 2.6 0 3.5-2.1 3.5-4.8 0-3-1.3-4.3-3.5-4.3-1.3 0-2.4.5-3.2 1.4"/></svg>',
    copy: '<svg class="aiwith-sharebar__icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/></g></svg>'
  };
  const buttonContent = (button, icon, label) => {
    button.innerHTML = icons[icon];
    const text = document.createElement('span'); text.textContent = label; button.appendChild(text);
    button.className = 'aiwith-sharebar__button';
  };
  const legacyCopy = (value) => {
    const focused = document.activeElement;
    const selection = window.getSelection();
    const ranges = selection ? Array.from({length: selection.rangeCount}, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
    const textarea = document.createElement('textarea');
    textarea.value = value; textarea.readOnly = true; textarea.className = 'aiwith-sharebar__copy-buffer';
    textarea.setAttribute('aria-label', '복사할 게시글 주소');
    document.body.appendChild(textarea);
    let copied = false;
    try { textarea.select(); textarea.setSelectionRange(0, value.length); copied = document.execCommand('copy'); }
    catch (_) { copied = false; }
    finally {
      textarea.remove();
      if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)); }
      if (focused?.focus) focused.focus({preventScroll:true});
    }
    return copied;
  };
  const mount = (target, {title, url}) => {
    if (!target || target.querySelector(':scope > .aiwith-sharebar') || !httpURL(url)) return;
    if (!document.querySelector('link[data-aiwith-sharebar-style]')) {
      const style = document.createElement('link'); style.rel = 'stylesheet'; style.href = '/sharebars.css?v=' + VERSION;
      style.dataset.aiwithSharebarStyle = ''; document.head.appendChild(style);
    }
    const bar = document.createElement('section'); bar.className = 'aiwith-sharebar'; bar.setAttribute('aria-label', '이 글 공유하기');
    const label = document.createElement('p'); label.className = 'aiwith-sharebar__label'; label.textContent = '이 글 공유하기'; bar.appendChild(label);
    const actions = document.createElement('div'); actions.className = 'aiwith-sharebar__actions'; bar.appendChild(actions);
    const links = [
      ['facebook', '페이스북', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)],
      ['threads', '스레드', 'https://www.threads.com/intent/post?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url)]
    ];
    links.forEach(([icon, text, href]) => {
      const link = document.createElement('a'); buttonContent(link, icon, text);
      link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', text + '에 이 글 공유하기 (새 창)'); actions.appendChild(link);
    });
    const copy = document.createElement('button'); copy.type = 'button'; buttonContent(copy, 'copy', '링크 복사'); actions.appendChild(copy);
    const status = document.createElement('p'); status.className = 'aiwith-sharebar__status'; status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true'); bar.appendChild(status);
    const manual = document.createElement('label'); manual.className = 'aiwith-sharebar__manual'; manual.hidden = true;
    manual.textContent = '아래 주소를 길게 누르거나 선택해 직접 복사해 주세요.';
    const input = document.createElement('input'); input.type = 'text'; input.readOnly = true; input.value = url;
    input.id = 'aiwith-share-url-' + (++sequence); manual.htmlFor = input.id; manual.appendChild(input); bar.appendChild(manual);
    input.addEventListener('click', () => input.select());
    copy.addEventListener('click', async () => {
      if (copy.disabled) return;
      copy.disabled = true; status.textContent = ''; manual.hidden = true;
      let copied = false;
      try { if (window.isSecureContext && navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); copied = true; } }
      catch (_) { /* Denied clipboard permission can still allow the legacy selection copy. */ }
      if (!copied) copied = legacyCopy(url);
      copy.disabled = false;
      if (!bar.isConnected) return;
      status.textContent = copied ? '링크가 복사되었습니다.' : '자동 복사를 완료하지 못했습니다. 아래 주소를 직접 복사해 주세요.';
      if (!copied) { manual.hidden = false; input.focus(); input.select(); }
    });
    target.appendChild(bar);
  };
  const noticeID = (title) => {
    let hash = 2166136261;
    for (const char of title) hash = Math.imul(hash ^ char.codePointAt(0), 16777619);
    return 'notice-' + (hash >>> 0).toString(36);
  };
  const refresh = () => {
    document.querySelectorAll('article.column-reading').forEach(article => mount(article, {
      title: normalizeTitle(article.querySelector('h1')?.textContent || document.title), url: pageURL()
    }));
    document.querySelectorAll('.cardnews-detail-section').forEach(article => mount(article, {
      title: normalizeTitle(document.querySelector('.cardnews-detail-hero h1')?.textContent || document.title), url: pageURL()
    }));
    document.querySelectorAll('.notice-grid > article.content-card').forEach(article => {
      const title = normalizeTitle(article.querySelector('h3')?.textContent);
      if (!title) return;
      if (!article.id) article.id = noticeID(title);
      const url = new URL(pageURL()); url.hash = article.id;
      mount(article, {title, url:url.href});
    });
  };
  const start = () => {
    refresh();
    const root = document.querySelector('main');
    if (root) new MutationObserver(records => {
      if (records.some(record => !record.target.closest?.('.aiwith-sharebar') && [...record.addedNodes].some(node => node.nodeType === 1 && !node.classList.contains('aiwith-sharebar')))) refresh();
    }).observe(root, {childList:true, subtree:true});
  };
  window.AIWithSharebars = {refresh};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
