(() => {
  'use strict';
  const api = () => window.AIWITH_SUPABASE;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const fmt = (value) => { try { return new Intl.DateTimeFormat('ko-KR', { dateStyle:'medium' }).format(new Date(value)); } catch (_) { return ''; } };
  const image = (card) => esc(card?.url || api()?.toPublicUrl(card?.image_path) || '');
  const renderPreview = (posts) => {
    const root = document.querySelector('[data-cardnews-preview]');
    const latest = (posts || []).filter((post) => post?.cards?.length >= 5).slice(0, 4);
    if (!root || !latest.length) return;
    const row = root.querySelector('.cardnews-preview-row');
    row.classList.add('cardnews-preview-topics');
    row.innerHTML = latest.map((post) => {
      const href = `/cardnews/view/?slug=${encodeURIComponent(post.slug)}`;
      const cards = post.cards.slice(0, 5).map((card, index) => `<span class="cardnews-preview-gallery-card"><img src="${image(card)}" alt="${esc(post.title)} ${index + 1}장" loading="lazy"><em>${String(index + 1).padStart(2, '0')}</em></span>`).join('');
      return `<article class="cardnews-preview-post"><a href="${href}" aria-label="${esc(post.title)} 5장 전체 보기"><div class="cardnews-preview-gallery">${cards}</div><div class="cardnews-preview-post-copy"><small>AIWITH · CARD NEWS · 5 CARDS</small><b>${esc(post.title)}</b><p>${esc(post.summary)}</p><span class="cardnews-preview-detail">5장 전체 보기 →</span></div></a></article>`;
    }).join('');
    const meta = root.querySelector('.cardnews-preview-meta');
    if (meta) meta.innerHTML = `<div><b>최신 카드뉴스 ${latest.length}개</b><span>각 주제의 상세보기에서 5장 전체를 확인할 수 있습니다.</span></div><a class="text-link" href="/cardnews/">카드뉴스 전체보기 →</a>`;
  };
  const renderBoard = (posts) => {
    const root = document.querySelector('[data-cardnews-board]');
    if (!root || !posts.length) return;
    root.innerHTML = `<div class="cardnews-board-head"><div><p class="kicker">PUBLISHED · ${String(posts.length).padStart(2, '0')}</p><h2>카드뉴스 게시판</h2></div><span class="board-count">${posts.length}개 주제 · 5장 세트</span></div>${posts.map((post) => { const href = `/cardnews/view/?slug=${encodeURIComponent(post.slug)}`; const cover = post.cards[0]; return `<article class="cardnews-board-item"><a class="cardnews-cover" href="${href}"><img src="${image(cover)}" alt="${esc(post.title)} 대표 카드" loading="lazy"><span>5 CARDS</span></a><div class="cardnews-board-copy"><p class="kicker">AIWITH · CARD NEWS</p><h3>${esc(post.title)}</h3><p>${esc(post.summary)}</p><div class="cardnews-board-tags"><span>AIWITH</span><span>5장 카드뉴스</span><span>멘토K 인사이트</span></div><a class="button primary" href="${href}">5장 전체 보기</a></div></article>`; }).join('')}`;
  };
  const renderDetail = (post) => {
    const root = document.querySelector('[data-cardnews-detail]');
    if (!root || !post) return;
    root.innerHTML = `<section class="page-hero cardnews-detail-hero"><p class="kicker">MENTOR K CARD NEWS · 5 CARDS</p><h1>${esc(post.title)}</h1><p>${esc(post.summary)}</p><a class="text-link" href="/cardnews/">← 카드뉴스 게시판으로</a></section><section class="page-section cardnews-detail-section"><div class="cardnews-detail-head"><div><p class="kicker">AIWITH CARD NEWS</p><h2>5장으로 읽는 ${esc(post.title)}</h2></div><span>${fmt(post.published_at || post.created_at)}</span></div><div class="cardnews-gallery">${post.cards.slice(0, 5).map((card, index) => `<figure><img src="${image(card)}" alt="${esc(card.alt_text || post.title + ' ' + (index + 1) + '장')}" loading="lazy"><figcaption>${String(index + 1).padStart(2, '0')} · ${esc(card.alt_text || 'AIWITH 카드뉴스')}</figcaption></figure>`).join('')}</div></section>`;
  };
  const run = async () => {
    if (!api()?.getClient?.()) return;
    try {
      const slug = new URLSearchParams(location.search).get('slug');
      if (slug && document.querySelector('[data-cardnews-detail]')) renderDetail(await api().getBySlug(slug));
      const posts = await api().listPublished();
      renderPreview(posts);
      renderBoard(posts);
    } catch (error) {
      console.warn('AIWITH 카드뉴스 중앙 콘텐츠를 불러오지 못했습니다.', error);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
