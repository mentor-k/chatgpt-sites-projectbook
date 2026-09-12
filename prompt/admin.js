/* Prompt Lab server-authenticated admin client. Secrets never live in this file. */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const API_BASE = (window.PROMPTLAB_API_BASE || "/api").replace(/\/+$/, "");
  const defaultNotices = [
    { id: "welcome-2026", title: "프롬프트랩 운영 안내", category: "운영", body: "검색·조합한 프롬프트는 사실·출처·저작권·개인정보를 최종 확인한 뒤 사용해 주세요.", date: "2026-09-01", pinned: true, published: true },
    { id: "workflow-update", title: "웹·앱·쇼핑몰 구축 메뉴 업데이트", category: "업데이트", body: "기획→구조설계→개발→검수→저장소→배포 단계별 프롬프트를 추가했습니다.", date: "2026-08-28", pinned: false, published: true }
  ];
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const fmt = (v) => { try { return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(v)); } catch (_) { return "-"; } };
  async function api(path, options = {}) {
    const opts = Object.assign({ credentials: "include", headers: {} }, options);
    opts.headers = Object.assign({ Accept: "application/json" }, opts.headers || {});
    if (opts.body && typeof opts.body !== "string") { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(opts.body); }
    const response = await fetch(API_BASE + path, opts);
    const text = await response.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch (_) { data = { message: text }; }
    if (!response.ok) { const error = new Error((data && data.message) || ("API " + response.status)); error.status = response.status; throw error; }
    return data;
  }
  function showPanel(on) {
    $("adminGate")?.classList.toggle("hidden", on);
    $("adminPanel")?.classList.toggle("hidden", !on);
    if (on) { loadAll(); }
  }
  function message(text, tone = "") {
    const node = $("adminMessage"); if (node) { node.textContent = text || ""; node.dataset.tone = tone; }
  }
  function renderUsage(data = {}) {
    const usage = data.usage || data || {};
    $("statVisits").textContent = usage.visits || 0;
    $("statCopies").textContent = usage.copies || 0;
    $("statSearches").textContent = usage.searches || 0;
    $("statNoticeViews").textContent = usage.notice_views || usage.noticeViews || 0;
    $("statLast").textContent = usage.last ? fmt(usage.last) : (usage.events?.[0]?.at ? fmt(usage.events[0].at) : "-");
    const breakdown = $("metricBreakdown");
    const rows = [["방문", usage.visits], ["복사", usage.copies], ["검색", usage.searches], ["공지 노출", usage.notice_views || usage.noticeViews]];
    if (breakdown) breakdown.innerHTML = rows.map(([label, value]) => "<div><span>" + esc(label) + "</span><b>" + esc(value || 0) + "</b></div>").join("");
    const log = $("usageLog"), events = Array.isArray(usage.events) ? usage.events.slice(0, 30) : [];
    if (log) log.innerHTML = events.length ? events.map((e) => "<p><b>" + esc(e.type || "이벤트") + "</b> · " + esc(e.label || "") + "<br><small>" + esc(fmt(e.at)) + "</small></p>").join("") : "<p>표시할 사용 기록이 없습니다.</p>";
  }
  function renderNotices(items) {
    const list = Array.isArray(items) ? items : (items?.notices || defaultNotices);
    const root = $("noticeAdminList"); if (!root) return;
    root.innerHTML = list.length ? list.map((n) => "<article class="notice-admin-item"><div><b>" + esc(n.title) + "</b><small>" + esc(n.category || "공지") + " · " + esc(n.date || "") + (n.published === false ? " · 비공개" : "") + "</small></div><button class="secondary" data-edit-notice="" + esc(n.id) + "">수정</button></article>").join("") : "<p>등록된 공지가 없습니다.</p>";
    root._items = list;
  }
  function fillNotice(n = {}) {
    $("noticeId").value = n.id || ""; $("noticeTitle").value = n.title || ""; $("noticeCategory").value = n.category || "운영"; $("noticeDate").value = n.date || new Date().toISOString().slice(0, 10); $("noticeBody").value = n.body || ""; $("noticePinned").checked = Boolean(n.pinned); $("noticePublished").checked = n.published !== false;
  }
  async function loadAll() {
    try { renderUsage(await api("/admin/usage")); } catch (e) { if (e.status === 401) return showPanel(false); message("통계 API를 불러오지 못했습니다."); }
    try { renderNotices(await api("/admin/notices")); } catch (_) { renderNotices(defaultNotices); }
    await loadCommits();
  }
  async function loadCommits() {
    const log = $("devLog"); if (!log) return; log.innerHTML = "<p>수정 기록을 불러오는 중…</p>";
    try {
      const data = await api("/admin/commits");
      const commits = Array.isArray(data) ? data : (data.commits || []);
      log.innerHTML = commits.length ? commits.map((c) => "<p><b>" + esc(c.title || c.message || "수정 기록") + "</b><br><small>" + esc(fmt(c.date || c.committed_at)) + " · " + esc(c.author || "GitHub") + "</small></p>").join("") : "<p>표시할 수정 기록이 없습니다.</p>";
    } catch (_) { log.innerHTML = "<p>수정 기록을 불러오지 못했습니다.</p>"; }
  }
  async function checkSession() { try { await api("/admin/session"); showPanel(true); } catch (_) { showPanel(false); } }
  $("adminLoginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); const pin = $("adminPin").value.trim(); if (!pin) return message("관리자 PIN을 입력하세요.");
    const button = $("adminLogin"); button.disabled = true; button.textContent = "확인 중…";
    try { await api("/admin/login", { method: "POST", body: { pin } }); $("adminPin").value = ""; message(""); showPanel(true); }
    catch (e) { message(e.status === 429 ? "잠시 후 다시 시도해 주세요." : "인증 서버에서 확인하지 못했습니다."); }
    finally { button.disabled = false; button.textContent = "인증"; }
  });
  $("adminLogout")?.addEventListener("click", async () => { try { await api("/admin/logout", { method: "POST" }); } catch (_) {} showPanel(false); message("잠금 처리했습니다."); });
  $("refreshAdmin")?.addEventListener("click", loadAll); $("refreshDevLog")?.addEventListener("click", loadCommits);
  $("downloadExcel")?.addEventListener("click", async () => { try { const r = await fetch(API_BASE + "/admin/export", { credentials: "include" }); if (!r.ok) throw new Error(); const blob = await r.blob(); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "prompt-lab.xlsx"; a.click(); URL.revokeObjectURL(url); } catch (_) { message("인증된 관리자만 다운로드할 수 있습니다."); } });
  document.querySelectorAll("[data-admin-view]").forEach((tab) => tab.addEventListener("click", () => { document.querySelectorAll("[data-admin-view]").forEach((x) => { const active = x === tab; x.classList.toggle("active", active); x.setAttribute("aria-selected", String(active)); }); document.querySelectorAll(".admin-screen").forEach((screen) => screen.classList.toggle("hidden", screen.id !== "admin" + tab.dataset.adminView.charAt(0).toUpperCase() + tab.dataset.adminView.slice(1) + "View")); }));
  $("newNotice")?.addEventListener("click", () => fillNotice({}));
  $("cancelNotice")?.addEventListener("click", () => { fillNotice({}); $("noticeMessage").textContent = ""; });
  $("noticeAdminList")?.addEventListener("click", (event) => { const button = event.target.closest("[data-edit-notice]"); if (!button) return; const item = ($("noticeAdminList")._items || []).find((n) => String(n.id) === String(button.dataset.editNotice)); if (item) fillNotice(item); });
  $("noticeForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const notice = { id: $("noticeId").value || undefined, title: $("noticeTitle").value.trim(), category: $("noticeCategory").value, date: $("noticeDate").value, body: $("noticeBody").value.trim(), pinned: $("noticePinned").checked, published: $("noticePublished").checked };
    if (!notice.title || !notice.date || !notice.body) { $("noticeMessage").textContent = "제목·게시일·내용을 입력하세요."; return; }
    try { const data = await api("/admin/notices", { method: "POST", body: notice }); renderNotices(data); $("noticeMessage").textContent = "서버에 저장되었습니다."; }
    catch (_) { $("noticeMessage").textContent = "공지 저장 API를 확인해 주세요."; }
  });
  document.querySelectorAll(".admin-tab").forEach((tab) => tab.addEventListener("click", () => { if (tab.dataset.adminView === "notices") api("/admin/notices").then(renderNotices).catch(() => {}); }));
  checkSession();
})();
