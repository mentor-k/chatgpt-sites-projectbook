(() => {
  "use strict";
  const ADMIN_PIN_HASH = "e45870b5e5716bad459290561eaedf47972c65c9cb3d4f50762f46bf45e8f898";
  const USAGE_KEY = "promptLabUsageV1";
  const NOTICE_KEY = "promptLabNoticesV1";
  const SESSION_KEY = "promptLabAdminSessionUntil";
  const SESSION_MS = 8 * 60 * 60 * 1000;
  const $ = id => document.getElementById(id);
  const typeNames = {visits:"접속", copies:"복사", searches:"검색", download:"다운로드", notice_views:"공지 노출", notice_clicks:"공지 클릭", cta_clicks:"CTA 클릭"};
  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const formatTime = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? "-" : d.toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"}); };
  const today = () => new Date().toISOString().slice(0,10);
  const defaultNotices = [
    {id:"welcome-2026",title:"프롬프트랩 운영 안내",category:"운영",body:"검색·조합한 프롬프트는 결과를 그대로 믿기보다 사실·출처·저작권·개인정보를 최종 확인한 뒤 사용해 주세요.",date:"2026-09-01",pinned:true,published:true},
    {id:"workflow-update",title:"웹·앱·쇼핑몰 구축 메뉴 업데이트",category:"업데이트",body:"기획→구조설계→개발→검수→저장소→배포 단계별 실전 프롬프트를 추가했습니다.",date:"2026-08-28",pinned:false,published:true},
    {id:"image-astra",title:"GPT Image 2.5·Astra 활용 가이드 추가",category:"자료",body:"이미지 치트키, 모션그래픽, 숏폼·광고·상품영상 제작 프롬프트를 한글로 정리했습니다.",date:"2026-08-20",pinned:false,published:true}
  ];
  function readUsage(){ try { const u=JSON.parse(localStorage.getItem(USAGE_KEY)||"null"); return u&&typeof u==="object" ? Object.assign({visits:0,copies:0,searches:0,notice_views:0,notice_clicks:0,events:[]},u) : {visits:0,copies:0,searches:0,notice_views:0,notice_clicks:0,events:[]}; } catch(_) { return {visits:0,copies:0,searches:0,notice_views:0,notice_clicks:0,events:[]}; } }
  function readNotices(){ try { const raw=localStorage.getItem(NOTICE_KEY); if(raw!==null){ const n=JSON.parse(raw); if(Array.isArray(n)) return n; } } catch(_){} try{localStorage.setItem(NOTICE_KEY,JSON.stringify(defaultNotices));}catch(_){} return defaultNotices.slice(); }
  function saveNotices(n){ try{localStorage.setItem(NOTICE_KEY,JSON.stringify(n)); return true;}catch(_){return false;} }
  function hasSession(){ try { return Number(localStorage.getItem(SESSION_KEY)||0)>Date.now(); } catch(_){ return false; } }
  function setSession(on){ try{ if(on) localStorage.setItem(SESSION_KEY,String(Date.now()+SESSION_MS)); else localStorage.removeItem(SESSION_KEY); }catch(_){} }
  async function verifyPin(pin){ if(!window.crypto||!window.crypto.subtle||!window.TextEncoder) return false; const digest=await window.crypto.subtle.digest("SHA-256",new TextEncoder().encode(pin)); const hex=Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,"0")).join(""); return hex===ADMIN_PIN_HASH; }
  function showPanel(on){ $("adminGate").classList.toggle("hidden",on); $("adminPanel").classList.toggle("hidden",!on); if(on){setSession(true); renderAll();} }
  function renderMetrics(){
    const u=readUsage();
    [["statVisits","visits"],["statCopies","copies"],["statSearches","searches"],["statNoticeViews","notice_views"]].forEach(pair=>{if($(pair[0])) $(pair[0]).textContent=String(u[pair[1]]||0);});
    const last=Array.isArray(u.events)&&u.events.length?u.events[0].at:""; if($("statLast")) $("statLast").textContent=last?formatTime(last):"-";
    const totals={}; Object.keys(typeNames).forEach(k=>{if(Number(u[k])) totals[k]=Number(u[k]);}); const totalValues=Object.values(totals); const max=Math.max(1,...totalValues);
    if($("metricBreakdown")) $("metricBreakdown").innerHTML=Object.keys(typeNames).filter(k=>totals[k]||["visits","copies","searches"].includes(k)).map(k=>{const n=totals[k]||0; return "<div class=\"metric-row\"><span><b>"+esc(typeNames[k])+"</b><small>"+n+"회</small></span><i><em style=\"width:"+Math.round(n/max*100)+"%\"></em></i></div>";}).join("");
    const log=$("usageLog"); const events=Array.isArray(u.events)?u.events.slice(0,30):[]; if(log) log.innerHTML=events.length?events.map(e=>"<p><b>"+esc(typeNames[e.type]||e.type)+"</b> · "+esc(e.label)+"<br><small>"+esc(formatTime(e.at))+"</small></p>").join(""):"<p>아직 사용 기록이 없습니다.</p>";
  }
  function resetForm(){ $("noticeId").value=""; $("noticeTitle").value=""; $("noticeCategory").value="운영"; $("noticeDate").value=today(); $("noticeBody").value=""; $("noticePinned").checked=false; $("noticePublished").checked=true; if($("noticeMessage")) $("noticeMessage").textContent=""; }
  function renderNoticeAdmin(){
    const root=$("noticeAdminList"); if(!root) return;
    const notices=readNotices().sort((a,b)=>Number(Boolean(b.pinned))-Number(Boolean(a.pinned))||String(b.date||"").localeCompare(String(a.date||"")));
    root.innerHTML=notices.length?notices.map(n=>"<article class=\"notice-admin-item\"><div><span class=\"badge\">"+esc(n.category||"공지")+"</span> "+(n.pinned?"<span class=\"pin-label\">고정</span>":"")+(n.published===false?"<span class=\"private-label\">비공개</span>":"")+"<h4>"+esc(n.title)+"</h4><p>"+esc(n.body)+"</p><small>"+esc(n.date||"")+"</small></div><div class=\"notice-row-actions\"><button class=\"secondary edit-notice\" data-id=\""+esc(n.id)+"\">수정</button><button class=\"secondary delete-notice\" data-id=\""+esc(n.id)+"\">삭제</button></div></article>").join(""):"<p class=\"admin-muted\">등록된 공지가 없습니다.</p>";
  }
  function editNotice(id){ const n=readNotices().find(x=>x.id===id); if(!n)return; $("noticeId").value=n.id; $("noticeTitle").value=n.title||""; $("noticeCategory").value=n.category||"운영"; $("noticeDate").value=n.date||today(); $("noticeBody").value=n.body||""; $("noticePinned").checked=Boolean(n.pinned); $("noticePublished").checked=n.published!==false; $("noticeTitle").focus(); window.scrollTo({top:$("noticeForm").getBoundingClientRect().top+window.scrollY-80,behavior:"smooth"}); }
  function saveNotice(event){ event.preventDefault(); const title=$("noticeTitle").value.trim(), body=$("noticeBody").value.trim(); if(!title||!body){$("noticeMessage").textContent="제목과 내용을 입력하세요.";return;} const list=readNotices(), id=$("noticeId").value||("notice-"+Date.now()); const value={id,title,category:$("noticeCategory").value,date:$("noticeDate").value||today(),body,pinned:$("noticePinned").checked,published:$("noticePublished").checked}; const idx=list.findIndex(n=>n.id===id); if(idx>=0) list[idx]=value; else list.push(value); if(!saveNotices(list)){$("noticeMessage").textContent="브라우저 저장소에 저장하지 못했습니다.";return;} $("noticeMessage").textContent="저장했습니다. 메인 화면에서 확인하세요."; resetForm(); renderNoticeAdmin(); }
  function deleteNotice(id){ const n=readNotices().find(x=>x.id===id); if(!n)return; if(!window.confirm("‘"+n.title+"’ 공지를 삭제할까요?"))return; saveNotices(readNotices().filter(x=>x.id!==id)); renderNoticeAdmin(); }
  async function renderDevLog(){ const log=$("devLog"); if(!log)return; log.innerHTML="<p>GitHub 수정 기록을 불러오는 중…</p>"; try{ const response=await fetch("https://api.github.com/repos/mentor-k/chatgpt-sites-projectbook/commits?path=prompt-lab&per_page=12",{headers:{Accept:"application/vnd.github+json"}}); if(!response.ok)throw new Error(); const commits=await response.json(); log.innerHTML=commits.length?commits.map(c=>{const title=c.commit&&c.commit.message?c.commit.message.split("\n")[0]:"수정 기록";const date=c.commit&&c.commit.author?c.commit.author.date:"";const author=c.author&&c.author.login?c.author.login:(c.commit&&c.commit.author?c.commit.author.name:"GitHub");return "<p><b>"+esc(title)+"</b><br><small>"+esc(formatTime(date))+" · "+esc(author)+"</small></p>";}).join(""):"<p>표시할 수정 기록이 없습니다.</p>"; }catch(_){ log.innerHTML="<p>GitHub 기록을 불러오지 못했습니다. 새로고침해 주세요.</p>"; } }
  function renderAll(){renderMetrics();renderNoticeAdmin();renderDevLog();}
  document.addEventListener("DOMContentLoaded",()=>{
    $("adminLoginForm").addEventListener("submit",async e=>{e.preventDefault();const pin=$("adminPin").value.trim();if(!pin){$("adminMessage").textContent="PIN을 입력하세요.";return;}const button=$("adminLogin");button.disabled=true;button.textContent="확인 중…";try{if(await verifyPin(pin)){ $("adminPin").value="";$("adminMessage").textContent="";showPanel(true);}else $("adminMessage").textContent="PIN이 올바르지 않습니다.";}catch(_){$("adminMessage").textContent="HTTPS에서 다시 시도해 주세요.";}finally{button.disabled=false;button.textContent="인증";}});
    $("adminLogout").addEventListener("click",()=>{setSession(false);showPanel(false);$("adminPin").focus();});
    $("refreshAdmin").addEventListener("click",renderAll);
    $("downloadExcel").addEventListener("click",()=>{const a=document.createElement("a");a.href="prompt-lab.xlsx";a.download="prompt-lab.xlsx";document.body.appendChild(a);a.click();a.remove();});
    $("noticeForm").addEventListener("submit",saveNotice); $("newNotice").addEventListener("click",resetForm); $("cancelNotice").addEventListener("click",resetForm);
    $("noticeAdminList").addEventListener("click",e=>{const edit=e.target.closest(".edit-notice"),del=e.target.closest(".delete-notice");if(edit)editNotice(edit.dataset.id);if(del)deleteNotice(del.dataset.id);});
    resetForm(); if(hasSession()) showPanel(true); else showPanel(false);
  });
})();
