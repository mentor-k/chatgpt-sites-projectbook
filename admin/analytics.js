/* AIWITH central access analytics: aggregate only low-risk pageview metadata. */
(() => {
  'use strict';
  const api = window.AIWITH_SUPABASE;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fmt = (value) => { try { return new Intl.DateTimeFormat('ko-KR',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value)); } catch (_) { return '-'; } };
  const dateKey = (value) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0,10); };
  const daysAgo = (days) => { const date = new Date(); date.setHours(0,0,0,0); date.setDate(date.getDate() - (days - 1)); return date.toISOString(); };
  const deviceLabel = { mobile:'모바일', tablet:'태블릿', desktop:'데스크톱' };
  const waitForAdmin = (tries = 0) => {
    if (document.querySelector('#pageviewTrend') && document.documentElement.style.visibility !== 'hidden') init();
    else if (tries < 240) setTimeout(() => waitForAdmin(tries + 1), 50);
  };
  const localFallback = () => {
    try {
      const raw = JSON.parse(localStorage.getItem('aiwith_pageviews') || '{}');
      const now = new Date().toISOString();
      return Object.entries(raw).filter(([key]) => !key.startsWith('__')).flatMap(([path,count]) => Array.from({length:Math.min(Number(count)||0, 1000)}, () => ({ path, device_type:'desktop', created_at:now, referrer:null })));
    } catch (_) { return []; }
  };
  function init() {
    if (document.body.dataset.analyticsReady) return;
    document.body.dataset.analyticsReady = 'true';
    const range = document.querySelector('#analyticsRange');
    const source = document.querySelector('#analyticsSource');
    const refresh = document.querySelector('#refreshAnalytics');
    const load = async () => {
      const days = range.value === 'all' ? null : Number(range.value);
      let rows = [];
      let central = false;
      try {
        if (!api?.listPageviews) throw new Error('central analytics unavailable');
        rows = await api.listPageviews({ since: days ? daysAgo(days) : undefined });
        central = true;
      } catch (_) {
        rows = localFallback();
      }
      render(rows, central, days);
    };
    refresh?.addEventListener('click', load);
    range?.addEventListener('change', load);
    load();
  }
  function render(rows, central, days) {
    const sorted = [...rows].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    const total = sorted.length;
    const daySet = new Set(sorted.map((row) => dateKey(row.created_at)).filter(Boolean));
    const latest = sorted[0]?.created_at;
    document.querySelector('#metricTotal').textContent = total.toLocaleString('ko-KR');
    document.querySelector('#metricUniqueDays').textContent = daySet.size.toLocaleString('ko-KR');
    document.querySelector('#metricUpdated').textContent = latest ? fmt(latest) : '-';
    const source = document.querySelector('#analyticsSource');
    source.textContent = central ? '중앙 통계: Supabase page_views · IP 주소는 저장하지 않습니다.' : '현재 중앙 통계를 불러오지 못해 이 브라우저의 임시 집계를 표시하고 있습니다.';
    const daily = aggregate(sorted, (row) => dateKey(row.created_at));
    const route = aggregate(sorted, (row) => row.path || '/');
    const devices = aggregate(sorted, (row) => row.device_type || 'desktop');
    const refs = aggregate(sorted, (row) => {
      if (!row.referrer) return '직접 방문';
      try { return new URL(row.referrer).hostname.replace(/^www\./,'') || '직접 방문'; } catch (_) { return '기타 유입'; }
    });
    drawTrend(daily, days || Math.max(14, Math.min(31, daySet.size || 14)));
    drawBars(route, document.querySelector('#pageviewBars'), 8, '회');
    drawDonut(devices);
    drawRanks(refs, document.querySelector('#referrerList'), 7);
    const detail = document.querySelector('#pageviewList');
    const routeRows = Object.entries(route).sort((a,b) => b[1]-a[1]);
    detail.innerHTML = routeRows.length ? routeRows.map(([path,count]) => {
      const last = sorted.find((row) => (row.path || '/') === path)?.created_at;
      return '<div class="commit-item"><b>'+esc(path)+'</b><small>'+count.toLocaleString('ko-KR')+'회 · 최근 '+esc(fmt(last))+'</small></div>';
    }).join('') : '<p>선택한 기간에 기록된 접속이 없습니다.</p>';
  }
  const aggregate = (rows, keyFn) => rows.reduce((out,row) => { const key=keyFn(row)||'기타'; out[key]=(out[key]||0)+1; return out; }, {});
  function drawTrend(values, count) {
    const canvas = document.querySelector('#pageviewTrend');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const width = Math.max(500, canvas.clientWidth || 900); const height = 280; const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio,0,0,ratio,0,0); ctx.clearRect(0,0,width,height);
    const keys=[]; const today=new Date(); today.setHours(0,0,0,0);
    for(let i=count-1;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);keys.push(d.toISOString().slice(0,10));}
    const data=keys.map((key)=>values[key]||0); const max=Math.max(1,...data); const left=42,right=16,top=18,bottom=38; const chartW=width-left-right,chartH=height-top-bottom;
    ctx.font='11px Pretendard, Arial, sans-serif'; ctx.lineWidth=1; ctx.strokeStyle='#e2e9f2'; ctx.fillStyle='#718198';
    for(let i=0;i<=3;i++){const y=top+chartH-(chartH*i/3);ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(width-right,y);ctx.stroke();ctx.fillText(String(Math.round(max*i/3)),4,y+4);}
    const points=data.map((value,index)=>[left+(chartW*(index/(Math.max(1,keys.length-1)))),top+chartH-(value/max)*chartH]);
    ctx.beginPath(); points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.lineTo(points.at(-1)?.[0]||left,top+chartH);ctx.lineTo(points[0]?.[0]||left,top+chartH);ctx.closePath();ctx.fillStyle='rgba(46,108,246,.12)';ctx.fill();
    ctx.beginPath(); points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle='#2e6cf6';ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle='#718198'; const labelStep=Math.max(1,Math.ceil(keys.length/6)); keys.forEach((key,i)=>{if(i%labelStep===0||i===keys.length-1)ctx.fillText(key.slice(5).replace('-','.'),points[i][0]-12,height-12);});
    document.querySelector('#pageviewTrendLegend').textContent='총 '+data.reduce((a,b)=>a+b,0).toLocaleString('ko-KR')+'회 · 날짜별 방문 이벤트';
  }
  function drawBars(values, root, limit, suffix) {
    const entries=Object.entries(values).sort((a,b)=>b[1]-a[1]).slice(0,limit); const max=entries[0]?.[1]||1;
    root.innerHTML=entries.length?entries.map(([label,value])=>'<div class="bar-row"><div><b>'+esc(label)+'</b><span>'+value.toLocaleString('ko-KR')+suffix+'</span></div><i><em style="width:'+Math.max(5,Math.round(value/max*100))+'%"></em></i></div>').join(''):'<p>기록 없음</p>';
  }
  function drawDonut(values) {
    const root=document.querySelector('#deviceChart'); const legend=document.querySelector('#deviceLegend'); const entries=Object.entries(values).sort((a,b)=>b[1]-a[1]); const total=entries.reduce((sum,item)=>sum+item[1],0); const colors=['#2e6cf6','#19a974','#f28c28']; let cursor=0;
    const stops=entries.map(([key,value],i)=>{const start=cursor;cursor+=total?value/total*100:0;return colors[i%colors.length]+' '+start+'% '+cursor+'%';}); root.style.background=stops.length?'conic-gradient('+stops.join(',')+')':'#e8eef6'; root.innerHTML='<span>'+total.toLocaleString('ko-KR')+'<small>전체</small></span>';
    legend.innerHTML=entries.length?entries.map(([key,value],i)=>'<div><i style="background:'+colors[i%colors.length]+'"></i><span>'+esc(deviceLabel[key]||key)+'</span><b>'+Math.round(value/total*100)+'%</b></div>').join(''):'<p>기록 없음</p>';
  }
  function drawRanks(values, root, limit) { const entries=Object.entries(values).sort((a,b)=>b[1]-a[1]).slice(0,limit); root.innerHTML=entries.length?entries.map(([label,value],i)=>'<div class="rank-row"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+esc(label)+'</span><em>'+value.toLocaleString('ko-KR')+'회</em></div>').join(''):'<p>유입 경로 기록 없음</p>'; }
  waitForAdmin();
})();
