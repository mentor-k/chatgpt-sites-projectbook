/* Lightweight central pageview tracker. No IP address or personal profile is stored. */
(() => {
  'use strict';
  const path = location.pathname.replace(/\/index\.html$/, '/') || '/';
  const send = () => window.AIWITH_SUPABASE?.trackPageview?.({ path }).catch(() => {});
  if (window.AIWITH_SUPABASE?.trackPageview) send();
  else {
    const load = (src, done) => { const script = document.createElement('script'); script.src = src; script.onload = done; script.onerror = () => {}; document.head.appendChild(script); };
    load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', () => load('/supabase-client.js?v=20260915-4', send));
  }
})();
