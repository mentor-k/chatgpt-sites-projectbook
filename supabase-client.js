/* AIWITH Supabase client. Only the publishable key is embedded in this public site. */
(() => {
  'use strict';
  const URL = 'https://ypowbfahoywmkyeaheph.supabase.co';
  const KEY = 'sb_publishable_l6gPu6bqJITJUr4DML-x_Q_3Mts857D';
  let client = null;
  const getClient = () => {
    if (!client && window.supabase?.createClient) {
      client = window.supabase.createClient(URL, KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    }
    return client;
  };
  const toPublicUrl = (path) => {
    if (!path) return '';
    if (/^(https?:|data:|blob:|\/)/i.test(path)) return path;
    const api = getClient();
    return api ? api.storage.from('cardnews').getPublicUrl(path).data.publicUrl : path;
  };
  const ordered = (posts) => (posts || []).map((post) => ({
    ...post,
    summary: post.description || '',
    seo_title: post.seo_title || '', seo_description: post.seo_description || '', aeo_summary: post.aeo_summary || '', geo_summary: post.geo_summary || '', keywords: post.keywords || [], optimization_summary: post.geo_summary || post.aeo_summary || post.seo_description || '',
    cards: (post.cardnews_cards || []).sort((a, b) => a.card_index - b.card_index).map((card) => ({ ...card, url: toPublicUrl(card.image_path) }))
  }));
  const listPublished = async () => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    const { data, error } = await api.from('cardnews_posts')
      .select('id,title,description,seo_title,seo_description,aeo_summary,geo_summary,keywords,slug,status,published_at,sort_order,created_by,created_at,updated_at,cardnews_cards(id,card_index,image_path,alt_text)')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false });
    if (error) throw error;
    return ordered(data);
  };
  const listOwned = async () => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    const { data, error } = await api.from('cardnews_posts')
      .select('id,title,description,slug,status,published_at,sort_order,created_by,created_at,updated_at,cardnews_cards(id,card_index,image_path,alt_text)')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return ordered(data);
  };
  const getBySlug = async (slug) => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    const { data, error } = await api.from('cardnews_posts')
      .select('id,title,description,slug,status,published_at,sort_order,created_by,created_at,updated_at,cardnews_cards(id,card_index,image_path,alt_text)')
      .eq('slug', slug).eq('status', 'published').maybeSingle();
    if (error) throw error;
    return ordered(data ? [data] : [])[0] || null;
  };
  const slugify = (value) => String(value || 'cardnews').toLowerCase().trim()
    .replace(/[^a-z0-9가-힣\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 70) || 'cardnews';
  const dataUrlToBlob = async (dataUrl) => {
    const response = await fetch(dataUrl);
    return response.blob();
  };
  const savePost = async ({ id = null, title, summary, seoTitle = '', seoDescription = '', aeoSummary = '', geoSummary = '', optimizationSummary = '', files, existingCards = [] }) => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    const { data: authData } = await api.auth.getSession();
    const keywordList = Array.isArray(keywords) ? keywords : String(keywords || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 30);
    const user = authData?.session?.user;
    if (!user) throw new Error('AUTH_REQUIRED');
    let post;
    if (id) {
      const { data, error } = await api.from('cardnews_posts').update({ title, description: summary, seo_title: seoTitle || title, seo_description: optimizationSummary || seoDescription, aeo_summary: optimizationSummary || aeoSummary, geo_summary: optimizationSummary || geoSummary, keywords: keywordList, updated_at: new Date().toISOString(), status: 'published', published_at: new Date().toISOString() }).eq('id', id).select().single();
      if (error) throw error;
      post = data;
    } else {
      const base = slugify(title);
      const slug = `${base}-${Date.now().toString(36)}`;
      const { data, error } = await api.from('cardnews_posts').insert({ title, description: summary, seo_title: seoTitle || title, seo_description: optimizationSummary || seoDescription, aeo_summary: optimizationSummary || aeoSummary, geo_summary: optimizationSummary || geoSummary, keywords: keywordList, slug: status: 'published', published_at: new Date().toISOString(), created_by: user.id }).select().single();
      if (error) throw error;
      post = data;
    }
    const old = id ? (await api.from('cardnews_cards').select('id,card_index,image_path').eq('post_id', post.id).order('card_index')).data || [] : [];
    const next = [];
    for (let i = 0; i < 5; i += 1) {
      const file = files[i];
      let imagePath = old.find((card) => card.card_index === i + 1)?.image_path || existingCards[i]?.image_path || '';
      if (file) {
        const path = `${user.id}/${post.id}/${String(i + 1).padStart(2, '0')}.webp`;
        const blob = file.blob || await dataUrlToBlob(file.dataUrl);
        const { error } = await api.storage.from('cardnews').upload(path, blob, { contentType: 'image/webp', upsert: true, cacheControl: '3600' });
        if (error) throw error;
        imagePath = path;
      }
      if (!imagePath) throw new Error('CARD_IMAGE_REQUIRED');
      next.push({ post_id: post.id, card_index: i + 1, image_path: imagePath, alt_text: `${title} ${i + 1}장`, created_by: user.id });
    }
    if (id) {
      const { error } = await api.from('cardnews_cards').delete().eq('post_id', post.id);
      if (error) throw error;
    }
    const { error: cardError } = await api.from('cardnews_cards').insert(next);
    if (cardError) throw cardError;
    const removed = old.map((card) => card.image_path).filter((path) => path && !next.some((card) => card.image_path === path) && !/^https?:/i.test(path));
    if (removed.length) await api.storage.from('cardnews').remove(removed);
    return { ...post, description: summary, seo_title: seoTitle || title, seo_description: optimizationSummary || seoDescription, aeo_summary: optimizationSummary || aeoSummary, geo_summary: optimizationSummary || geoSummary, keywords: keywordList, optimization_summary: optimizationSummary, cards: next.map((card) => ({ ...card, url: toPublicUrl(card.image_path) })) };
  };
  const deletePost = async (id) => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    const { data: cards, error: cardError } = await api.from('cardnews_cards').select('image_path').eq('post_id', id);
    if (cardError) throw cardError;
    const paths = (cards || []).map((card) => card.image_path).filter((path) => path && !/^https?:/i.test(path));
    if (paths.length) await api.storage.from('cardnews').remove(paths);
    const { error } = await api.from('cardnews_posts').delete().eq('id', id);
    if (error) throw error;
  };
  const classifyDevice = (width = window.innerWidth) => width <= 640 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
  const trackPageview = async ({ path = location.pathname, referrer = document.referrer, userAgent = navigator.userAgent, viewportWidth = window.innerWidth } = {}) => {
    const api = getClient();
    if (!api) return { skipped: true };
    const cleanPath = String(path || '/').slice(0, 240);
    const cleanReferrer = referrer ? String(referrer).slice(0, 500) : null;
    const { error } = await api.from('page_views').insert({
      path: cleanPath,
      referrer: cleanReferrer,
      user_agent: String(userAgent || '').slice(0, 500) || null,
      device_type: classifyDevice(Number(viewportWidth) || window.innerWidth),
      viewport_width: Math.max(1, Math.min(10000, Number(viewportWidth) || window.innerWidth))
    });
    if (error) throw error;
    return { ok: true };
  };
  const listPageviews = async ({ since } = {}) => {
    const api = getClient();
    if (!api) throw new Error('Supabase client is unavailable');
    let query = api.from('page_views').select('id,path,referrer,device_type,viewport_width,created_at').order('created_at', { ascending: false }).limit(10000);
    if (since) query = query.gte('created_at', since);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  };
  window.AIWITH_SUPABASE = { URL, getClient, toPublicUrl, listPublished, listOwned, getBySlug, savePost, deletePost, trackPageview, listPageviews };
})();
