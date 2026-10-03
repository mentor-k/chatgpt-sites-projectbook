import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {makeHandler,validateSubmission,escapeHtml} from '../security/consultation/handler.mjs';
import {hardenHtml,cspForHtml} from './build-security.mjs';
const valid=()=>({action:'submit',name:'테스트 담당자',phone:'010-0000-0000',email:'fixture@example.test',message:'가상 테스트 문의',privacy:true,sourcePath:'/consultation/'});
const request=(payload,{origin='https://aiwith.kr',token='',contentType='application/json',method='POST',headers={}}={})=>new Request('https://example.test/consultation',{method,headers:{Origin:origin,'Content-Type':contentType,...(token?{Authorization:token}:{}),...headers},...(method==='POST'?{body:typeof payload==='string'?payload:JSON.stringify(payload)}:{})});
function harness(options={}){
  const state={inserted:0,read:0,mail:0,updated:[]};
  const db={rpc:async()=>({data:options.budget!==false,error:options.budgetError||null}),from:()=>({insert:()=>{state.inserted++;return{select:()=>({single:async()=>({data:options.insertError?null:{id:'fixture-row'},error:options.insertError||null})})}},update:value=>{state.updated.push(value);return{eq:async()=>({error:null})}}})};
  const userClient=()=>({auth:{getUser:async()=>({data:{user:options.user===false?null:{id:'fixture-user',is_anonymous:options.anonymous===true,user_metadata:{admin:true}}},error:options.authError||null})},rpc:async()=>({data:options.admin!==false,error:options.roleError||null}),from:()=>{state.read++;return{select:()=>({order:()=>({limit:async()=>({data:[{id:'fixture-row'}],error:null})})})}}});
  return{state,handler:makeHandler({db,userClient,sendMail:async()=>{state.mail++;if(options.mailError)throw Error('fixture failure');return 'sent'}})};
}
test('누락된 상담 분야는 기본값, 동의·전화·길이는 서버 검증',()=>{
  assert.equal(validateSubmission(valid()).topic,'AI 강의·워크숍 상담');
  for(const patch of [{privacy:false},{name:'x'.repeat(81)},{phone:'abc'},{email:'invalid'},{message:'x'.repeat(4001)},{website:'bot'},{sourcePath:'https://untrusted.test'}])assert.throws(()=>validateSubmission({...valid(),...patch}),/validation_failed/);
});
test('이메일 HTML escape',()=>assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;'));
test('다른 출처와 Origin 없는 요청은 거부',async()=>{const {handler}=harness();for(const origin of ['https://untrusted.test',''])assert.equal((await handler(request(valid(),{origin}))).status,403)});
test('www 도메인 preflight는 명시적으로 허용',async()=>{const {handler}=harness();const response=await handler(request(null,{origin:'https://www.aiwith.kr',method:'OPTIONS'}));assert.equal(response.status,204);assert.equal(response.headers.get('Access-Control-Allow-Origin'),'https://www.aiwith.kr')});
test('잘못된 JSON·타입·큰 요청 차단',async()=>{const {handler}=harness();assert.equal((await handler(request('{'))).status,400);assert.equal((await handler(request([]))).status,400);assert.equal((await handler(request(valid(),{contentType:'text/plain'}))).status,415);assert.equal((await handler(request('x'.repeat(32769)))).status,413)});
test('공용 비밀번호 필드를 보내도 JWT 없이는 상담 조회 불가',async()=>{const {handler,state}=harness();const response=await handler(request({action:'list',adminPassword:'FIXTURE_NOT_A_CREDENTIAL'}));assert.equal(response.status,401);assert.equal(state.read,0);assert.equal(response.headers.get('Cache-Control'),'no-store, max-age=0')});
test('위조 토큰·익명 사용자·일반 계정·역할 확인 오류는 fail closed',async()=>{
  for(const options of [{user:false},{authError:{}},{anonymous:true},{admin:false},{roleError:{}}]){
    const {handler,state}=harness(options);const response=await handler(request({action:'list'},{token:'Bearer FIXTURE_NOT_A_REAL_ACCESS_TOKEN'}));
    assert.ok([401,403].includes(response.status));assert.equal(state.read,0);
  }
});
test('검증된 관리자만 사용자 RLS 문맥으로 조회',async()=>{const {handler,state}=harness();const response=await handler(request({action:'list'},{token:'Bearer FIXTURE_NOT_A_REAL_ACCESS_TOKEN'}));assert.equal(response.status,200);assert.equal(state.read,1);assert.deepEqual((await response.json()).requests,[{id:'fixture-row'}])});
test('요청 예산 초과·예산 서버 오류 시 저장·발송 없음',async()=>{for(const options of [{budget:false},{budgetError:{}}]){const {handler,state}=harness(options);const response=await handler(request(valid()));assert.ok([429,503].includes(response.status));assert.equal(state.inserted,0);assert.equal(state.mail,0)}});
test('정상 문의는 한 번 저장하고 메일 상태 반영',async()=>{const {handler,state}=harness();assert.equal((await handler(request(valid()))).status,200);assert.equal(state.inserted,1);assert.equal(state.mail,1);assert.deepEqual(state.updated,[{email_status:'sent'}])});
test('메일 실패가 저장된 문의를 잃게 하지 않음',async()=>{const {handler}=harness({mailError:true});const response=await handler(request(valid()));assert.equal(response.status,200);assert.equal((await response.json()).email_status,'failed')});
test('DB 실패에서 내부 오류·개인정보 노출 없음',async()=>{const {handler,state}=harness({insertError:{message:'PRIVATE_ERROR'}});const response=await handler(request(valid()));assert.equal(response.status,503);assert.equal(state.mail,0);assert.equal(await response.text(),'{"error":"database_error"}')});
test('CSP는 인라인 스크립트 hash를 사용하며 재실행이 동일',()=>{const html='<html><head><title>fixture</title></head><body><script>const fixture=1;</script></body></html>';const result=hardenHtml(html);assert.equal(hardenHtml(result),result);assert.match(result,/sha256-/);assert.match(result,/object-src &#39;none&#39;|object-src 'none'/);assert.doesNotMatch(cspForHtml(html),/script-src[^;]*unsafe-inline/)});
test('공개 코드에서 기존 비밀번호 검증·상담 로컬 저장 제거',()=>{const site=fs.readFileSync(new URL('../site.js',import.meta.url),'utf8'),admin=fs.readFileSync(new URL('../admin/admin.js',import.meta.url),'utf8');assert.doesNotMatch(site,/adminHash|requestAdminPassword|aiwith_consultations/);assert.doesNotMatch(admin,/adminPassword|ADMIN_HASH|sessionStorage/);assert.match(admin,/AIWITH_ADMIN_READY/);assert.match(admin,/listConsultations/)});
