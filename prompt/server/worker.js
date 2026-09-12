/* Prompt Lab admin API for a serverless Worker.
   Required secrets/bindings:
   - ADMIN_PIN_HASH: SHA-256 hex of ADMIN_PIN_SALT + ":" + PIN
   - ADMIN_PIN_SALT, SESSION_TTL_SECONDS (optional), GITHUB_REPO (optional)
   - ADMIN_KV: KV namespace for sessions, notices and aggregate usage
   - ADMIN_FILES: private R2 bucket containing prompt-lab.xlsx
*/
const ALLOWED_ORIGINS = new Set(["https://aiwith.kr", "https://www.aiwith.kr"]);

function cors(request) {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://aiwith.kr";
  return { "Access-Control-Allow-Origin": allow, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": "Content-Type, Accept", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Vary": "Origin" };
}
function json(request, body, status = 200, headers = {}) { return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...cors(request), ...headers } }); }
function cookieMap(request) { const value = request.headers.get("Cookie") || ""; return Object.fromEntries(value.split(";").map(v => v.trim().split("=")).filter(v => v.length === 2).map(([k, val]) => [k, decodeURIComponent(val)])); }
function cookie(name, value, maxAge) { return name + "=" + encodeURIComponent(value) + "; Max-Age=" + maxAge + "; Path=/; HttpOnly; Secure; SameSite=Lax"; }
async function digest(value) { const data = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return [...new Uint8Array(data)].map(b => b.toString(16).padStart(2, "0")).join(""); }
function equal(a, b) { if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false; let n = 0; for (let i = 0; i < a.length; i++) n |= a.charCodeAt(i) ^ b.charCodeAt(i); return n === 0; }
async function readJson(request) { try { return await request.json(); } catch (_) { return {}; } }
async function session(request, env) { const token = cookieMap(request).pl_admin; if (!token || !env.ADMIN_KV) return null; const record = await env.ADMIN_KV.get("session:" + token, "json"); return record && record.expiresAt > Date.now() ? record : null; }
async function requireSession(request, env) { return (await session(request, env)) ? null : json(request, { message: "인증이 필요합니다." }, 401); }
async function rateLimit(request, env) {
  if (!env.ADMIN_KV) return false;
  const source = request.headers.get("CF-Connecting-IP") || "anonymous";
  const key = "login-attempt:" + await digest(source);
  const item = await env.ADMIN_KV.get(key, "json") || { count: 0 };
  if (item.count >= 5) return true;
  await env.ADMIN_KV.put(key, JSON.stringify({ count: item.count + 1 }), { expirationTtl: 300 });
  return false;
}
async function handle(request, env) {
  const url = new URL(request.url), path = url.pathname.replace(/\/+$/, "") || "/";
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(request) });
  if (path === "/events" && request.method === "POST") {
    if (!env.ADMIN_KV) return json(request, { ok: true });
    const body = await readJson(request), type = String(body.type || "event").slice(0, 32), label = String(body.label || "").slice(0, 80);
    const usage = await env.ADMIN_KV.get("usage", "json") || { visits: 0, copies: 0, searches: 0, notice_views: 0, events: [] };
    const key = type === "visit" ? "visits" : type === "copy" ? "copies" : type === "search" ? "searches" : type === "notice_view" ? "notice_views" : null;
    if (key) usage[key] = Number(usage[key] || 0) + 1;
    usage.events = Array.isArray(usage.events) ? usage.events : [];
    usage.events.unshift({ type, label, at: new Date().toISOString() });
    usage.events = usage.events.slice(0, 200);
    await env.ADMIN_KV.put("usage", JSON.stringify(usage));
    return json(request, { ok: true }, 202);
  }
  if (path === "/admin/login" && request.method === "POST") {
    if (await rateLimit(request, env)) return json(request, { message: "잠시 후 다시 시도해 주세요." }, 429);
    const { pin } = await readJson(request);
    if (!env.ADMIN_PIN_HASH || !env.ADMIN_PIN_SALT || !env.ADMIN_KV || typeof pin !== "string" || pin.length < 4) return json(request, { message: "인증 서버가 준비되지 않았습니다." }, 503);
    const actual = await digest(env.ADMIN_PIN_SALT + ":" + pin);
    if (!equal(actual, String(env.ADMIN_PIN_HASH).toLowerCase())) return json(request, { message: "인증 정보가 올바르지 않습니다." }, 401);
    const token = crypto.randomUUID() + crypto.randomUUID().replaceAll("-", "");
    const ttl = Math.max(900, Number(env.SESSION_TTL_SECONDS || 28800));
    await env.ADMIN_KV.put("session:" + token, JSON.stringify({ createdAt: Date.now(), expiresAt: Date.now() + ttl * 1000 }), { expirationTtl: ttl });
    return json(request, { ok: true, expiresAt: Date.now() + ttl * 1000 }, 200, { "Set-Cookie": cookie("pl_admin", token, ttl) });
  }
  if (path === "/admin/session" && request.method === "GET") return (await session(request, env)) ? json(request, { authenticated: true }) : json(request, { authenticated: false }, 401);
  if (path === "/admin/logout" && request.method === "POST") {
    const token = cookieMap(request).pl_admin; if (token && env.ADMIN_KV) await env.ADMIN_KV.delete("session:" + token);
    return json(request, { ok: true }, 200, { "Set-Cookie": cookie("pl_admin", "", 0) });
  }
  const denied = await requireSession(request, env); if (denied) return denied;
  if (path === "/admin/usage" && request.method === "GET") return json(request, await env.ADMIN_KV.get("usage", "json") || { visits: 0, copies: 0, searches: 0, notice_views: 0, events: [] });
  if (path === "/admin/notices" && request.method === "GET") return json(request, await env.ADMIN_KV.get("notices", "json") || []);
  if (path === "/admin/notices" && request.method === "POST") {
    const incoming = await readJson(request); if (!incoming.title || !incoming.body || !incoming.date) return json(request, { message: "필수 항목을 확인하세요." }, 400);
    const notices = await env.ADMIN_KV.get("notices", "json") || [];
    const item = { ...incoming, id: incoming.id || crypto.randomUUID(), title: String(incoming.title).slice(0, 100), body: String(incoming.body).slice(0, 600), updatedAt: new Date().toISOString() };
    const next = [item, ...notices.filter(n => n.id !== item.id)].slice(0, 100);
    await env.ADMIN_KV.put("notices", JSON.stringify(next)); return json(request, next);
  }
  if (path === "/admin/commits" && request.method === "GET") {
    const repo = env.GITHUB_REPO || "mentor-k/chatgpt-sites-projectbook";
    const response = await fetch("https://api.github.com/repos/" + repo + "/commits?per_page=12", { headers: { Accept: "application/vnd.github+json", "User-Agent": "promptlab-admin-api" } });
    if (!response.ok) return json(request, { commits: [] });
    const commits = await response.json();
    return json(request, { commits: commits.map(c => ({ title: c.commit?.message?.split("\n")[0] || "수정 기록", date: c.commit?.author?.date || "", author: c.author?.login || c.commit?.author?.name || "GitHub" })) });
  }
  if (path === "/admin/export" && request.method === "GET") {
    if (!env.ADMIN_FILES) return json(request, { message: "비공개 엑셀 저장소가 연결되지 않았습니다." }, 503);
    const file = await env.ADMIN_FILES.get("prompt-lab.xlsx"); if (!file) return json(request, { message: "파일이 없습니다." }, 404);
    return new Response(file.body, { headers: { ...cors(request), "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition": "attachment; filename=prompt-lab.xlsx", "Cache-Control": "private, no-store" } });
  }
  return json(request, { message: "Not found" }, 404);
}
export default { fetch: handle };
