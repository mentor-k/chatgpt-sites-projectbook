import test from 'node:test';
import assert from 'node:assert/strict';
import {createNotificationMailer,ADMIN_URL,SUBJECT,TEXT} from '../security/consultation/notification.mjs';
import {makeHandler} from '../security/consultation/handler.mjs';
const RECIPIENT='notification-recipient@example.test';
const getRecipient=async()=>RECIPIENT;
test('알림은 승인된 수신자·고정 안내·관리자 링크만 전송',async()=>{
  let outbound;
  const send=createNotificationMailer({apiKey:'FIXTURE_NOT_A_REAL_RESEND_KEY',getRecipient,fetchImpl:async(url,options)=>{outbound={url,...options};return new Response(JSON.stringify({id:'fixture-accepted'}),{status:200})}});
  await send({name:'PRIVATE_NAME',phone:'PRIVATE_PHONE',email:'PRIVATE_EMAIL',organization:'PRIVATE_ORG',message:'PRIVATE_MESSAGE',id:'PRIVATE_ID',attachment_path:'PRIVATE_ATTACHMENT',to:'unapproved@example.test'});
  assert.equal(outbound.url,'https://api.resend.com/emails');
  assert.deepEqual(JSON.parse(outbound.body),{from:'AIWITH <onboarding@resend.dev>',to:[RECIPIENT],subject:SUBJECT,text:TEXT});
  assert.equal(ADMIN_URL,'https://aiwith.kr/admin/');
  assert.doesNotMatch(outbound.body,/PRIVATE_|unapproved|reply_to|attachments|tags|headers/);
});
test('키가 없거나 발신자 헤더가 잘못되면 외부 전송 없음',async()=>{
  let calls=0;const fetchImpl=async()=>{calls++;return new Response('{}')};
  assert.equal(await createNotificationMailer({fetchImpl})(),'not_configured');
  assert.equal(await createNotificationMailer({apiKey:'FIXTURE',from:'sender@example.test\r\nInjected: value',fetchImpl})(),'failed');
  assert.equal(calls,0);
});
test('실패·응답 오류·시간 초과를 발송 성공으로 보고하지 않음',async()=>{
  for(const fetchImpl of [async()=>new Response('{}',{status:403}),async()=>new Response('{}'),async()=>{throw Error('timeout')}]){
    assert.equal(await createNotificationMailer({apiKey:'FIXTURE',getRecipient,fetchImpl})(),'failed');
  }
});
test('Resend 발송 수락만 sent로 기록',async()=>{
  const send=createNotificationMailer({apiKey:'FIXTURE',getRecipient,fetchImpl:async()=>new Response('{"id":"fixture-accepted"}',{status:200})});
  assert.equal(await send(),'sent');
});
test('비공개 수신 설정이 없거나 여러 주소가 입력되면 외부 전송 없음',async()=>{
  let calls=0;const fetchImpl=async()=>{calls++;return new Response('{}')};
  for(const getRecipient of [async()=>'',async()=>null,async()=>RECIPIENT+',other@example.test']){
    assert.equal(await createNotificationMailer({apiKey:'FIXTURE',getRecipient,fetchImpl})(),'not_configured');
  }
  assert.equal(calls,0);
});
test('상담 저장 후 메일 함수는 인자 없이 호출하며 실패해도 상담 유지',async()=>{
  let received,updates=[];
  const db={rpc:async()=>({data:true,error:null}),from:()=>({insert:()=>({select:()=>({single:async()=>({data:{id:'fixture-row'},error:null})})}),update:value=>{updates.push(value);return{eq:async()=>({error:null})}}})};
  const handler=makeHandler({db,userClient:()=>{throw Error('unexpected')},sendMail:async(...args)=>{received=args;return 'failed'}});
  const response=await handler(new Request('https://example.test/',{method:'POST',headers:{Origin:'https://aiwith.kr','Content-Type':'application/json'},body:JSON.stringify({action:'submit',name:'PRIVATE_NAME',phone:'010-0000-0000',message:'PRIVATE_MESSAGE',privacy:true})}));
  assert.equal(response.status,200);assert.deepEqual(received,[]);assert.deepEqual(updates,[{email_status:'failed'}]);
  assert.equal((await response.json()).ok,true);
});
