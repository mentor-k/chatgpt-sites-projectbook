import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const findings=[];let files=0;
function visit(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
  if(item.name.startsWith('.')||item.name==='node_modules')continue;
  const file=path.join(dir,item.name),relative=path.relative(ROOT,file);
  if(item.isDirectory()){visit(file);continue}
  if(!/\.(?:js|mjs|ts|html|json|sql)$/.test(item.name)&&item.name!=='index.template')continue;
  const text=fs.readFileSync(file,'utf8');files++;
  const credential=/\b(?:adminPassword|ADMIN_PASSWORD)\s*[:=]\s*["']([^"']+)["']/g;
  for(const match of text.matchAll(credential))if(!match[1].startsWith('FIXTURE_'))findings.push({file:relative,issue:'Hardcoded administrator credential/verifier'});
  if(/\b(?:ADMIN_HASH|adminHash|ADMIN_PASSWORD_HASH)\s*=\s*["'][a-f0-9]{64}["']/i.test(text))findings.push({file:relative,issue:'Hardcoded administrator verifier'});
  if(/sb_secret_[A-Za-z0-9_-]{12,}/.test(text))findings.push({file:relative,issue:'Secret API key in source'});
  for(const match of text.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)){try{if(JSON.parse(Buffer.from(match[0].split('.')[1],'base64url').toString()).role==='service_role')findings.push({file:relative,issue:'Service-role JWT in source'})}catch{}}
  if(/sessionStorage\.setItem\(['"]aiwith_admin_access/.test(text))findings.push({file:relative,issue:'Browser-only administrator permission flag'});
  if(/@supabase\/supabase-js@2["'\s<]/.test(text))findings.push({file:relative,issue:'Unpinned Supabase dependency'});
  if(item.name.endsWith('.html')&&! /http-equiv="Content-Security-Policy"/.test(text))findings.push({file:relative,issue:'CSP missing'});
}}
visit(ROOT);console.log(JSON.stringify({files,findings}));if(findings.length)process.exitCode=1;
