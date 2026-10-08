import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const VERSION='20261003-security-1';
const SITE_VERSION='20261008-menu-1';
export function cspForHtml(html){
  const hashes=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match=>! /\bsrc\s*=/i.test(match[1])&&match[2].trim())
    .map(match=>"'sha256-"+createHash('sha256').update(match[2]).digest('base64')+"'");
  return ["default-src 'self'","base-uri 'none'","object-src 'none'","form-action 'self'",
    "script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com "+[...new Set(hashes)].join(' '),
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
    "font-src 'self' data: https://cdn.jsdelivr.net https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://ypowbfahoywmkyeaheph.supabase.co wss://ypowbfahoywmkyeaheph.supabase.co https://api.github.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "worker-src 'self' blob: https://cdnjs.cloudflare.com",
    "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com",
    'upgrade-insecure-requests'].map(v=>v.trim()).join('; ');
}
export function hardenHtml(html){
  let result=html.replace(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>\s*/gi,'')
    .replace(/<meta\b[^>]*name=["']referrer["'][^>]*>\s*/gi,'');
  result=result.replace(/(<head\b[^>]*>)\s*/i,'$1');
  result=result.replace(/@supabase\/supabase-js@2(?=["'\s<])/g,'@supabase/supabase-js@2.117.2');
  result=result.replace(/\/(site|supabase-client|analytics-tracker)\.js\?v=[^"'\s<]+/g,(_,name)=>'/'+name+'.js?v='+(name==='site'?SITE_VERSION:VERSION));
  result=result.replace(/\/admin\/(admin|auth|central-cardnews|analytics)\.js\?v=[^"'\s<]+/g,(_,name)=>'/admin/'+name+'.js?v='+VERSION);
  const policy=cspForHtml(result).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  return result.replace(/<head\b[^>]*>/i,match=>match+'\n<meta http-equiv="Content-Security-Policy" content="'+policy+'">\n<meta name="referrer" content="strict-origin-when-cross-origin">\n');
}
export function hardenSite(root=ROOT){
  let updated=0;
  const visit=directory=>{
    for(const item of fs.readdirSync(directory,{withFileTypes:true})){
      if(item.name.startsWith('.')||['node_modules','security'].includes(item.name))continue;
      const file=path.join(directory,item.name);
      if(item.isDirectory())visit(file);
      else if(item.name.endsWith('.html')||item.name==='index.template'){
        const old=fs.readFileSync(file,'utf8'),next=hardenHtml(old);
        if(next!==old){fs.writeFileSync(file,next);updated++}
      }
    }
  };
  visit(root);return {updated};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(hardenSite());
