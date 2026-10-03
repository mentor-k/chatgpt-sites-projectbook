const ORIGINS=new Set(['https://aiwith.kr','https://www.aiwith.kr']);
export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function validateSubmission(p){
  const text=(key,max,required=false)=>{
    if(p[key]!==undefined&&typeof p[key]!=='string')throw Error('validation_failed');
    const value=(p[key]??'').trim();
    if(value.length>max||(required&&!value)||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))throw Error('validation_failed');
    return value;
  };
  const name=text('name',80,true),organization=text('organization',160),phone=text('phone',40,true),email=text('email',254),message=text('message',4000,true);
  const topic=text('topic',80)||'AI 강의·워크숍 상담';
  const sourcePath=text('sourcePath',240);
  if(phone.length<3||! /^[+()\d\s.-]+$/.test(phone)||email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||! [true,'on','true'].includes(p.privacy)||sourcePath&&!/^\/(?!\/)[^\r\n]*$/.test(sourcePath)||text('website',200))throw Error('validation_failed');
  return {name,organization:organization||null,phone,email:email||null,topic,message,source_path:sourcePath||null,privacy_agreed:true,email_status:'pending'};
}
async function readPayload(request){
  if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))throw Error('unsupported_media_type');
  if(Number(request.headers.get('content-length'))>32768)throw Error('payload_too_large');
  const reader=request.body?.getReader();if(!reader)throw Error('invalid_json');
  let size=0;const parts=[];
  for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();throw Error('payload_too_large')}parts.push(value)}
  const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length}
  let p;try{p=JSON.parse(new TextDecoder().decode(bytes))}catch{throw Error('invalid_json')}
  if(!p||typeof p!=='object'||Array.isArray(p))throw Error('invalid_json');return p;
}
export function makeHandler({db,userClient,sendMail}){
  return async request=>{
    const origin=request.headers.get('origin')||'';
    const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store, max-age=0','X-Content-Type-Options':'nosniff','Vary':'Origin'};
    if(ORIGINS.has(origin))Object.assign(headers,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info','Access-Control-Allow-Methods':'POST, OPTIONS'});
    const json=(body,status=200,extra={})=>new Response(JSON.stringify(body),{status,headers:{...headers,...extra}});
    if(!ORIGINS.has(origin))return json({error:'origin_not_allowed'},403);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
    if(request.method!=='POST')return json({error:'method_not_allowed'},405);
    try{
      const p=await readPayload(request);
      if(p.action==='list'){
        const authorization=request.headers.get('authorization')||'';
        if(!/^Bearer [A-Za-z0-9._-]{20,4096}$/.test(authorization))return json({error:'unauthorized'},401);
        const client=userClient(authorization);
        const {data:identity,error:authError}=await client.auth.getUser(authorization.slice(7));
        if(authError||!identity?.user||identity.user.is_anonymous)return json({error:'unauthorized'},401);
        const {data:admin,error:roleError}=await client.rpc('aiwith_is_admin');
        if(roleError||admin!==true)return json({error:'forbidden'},403);
        // The signed-in user's RLS context, not service-role privileges, reads PII.
        const {data,error}=await client.from('consultation_requests').select('id,name,organization,phone,email,topic,message,email_status,source_path,created_at,attachment_name,attachment_path').order('created_at',{ascending:false}).limit(100);
        if(error)return json({error:'database_error'},503);
        return json({requests:data||[]});
      }
      if(p.action!=='submit')return json({error:'unknown_action'},400);
      const row=validateSubmission(p);
      const {data:allowed,error:budgetError}=await db.rpc('aiwith_consume_budget',{p_key:'consultation-submit',p_window_seconds:3600,p_limit:60});
      if(budgetError)return json({error:'temporarily_unavailable'},503);
      if(allowed!==true)return json({error:'rate_limited'},429,{'Retry-After':'3600'});
      const {data:inserted,error}=await db.from('consultation_requests').insert(row).select('id,created_at').single();
      if(error||!inserted)return json({error:'database_error'},503);
      let emailStatus='not_configured';
      try{emailStatus=await sendMail(row)}catch{emailStatus='failed'}
      await db.from('consultation_requests').update({email_status:emailStatus}).eq('id',inserted.id);
      return json({ok:true,id:inserted.id,email_sent:emailStatus==='sent',email_status:emailStatus});
    }catch(error){
      const code=error?.message;
      const status={validation_failed:400,invalid_json:400,unsupported_media_type:415,payload_too_large:413}[code];
      return json({error:status?code:'temporarily_unavailable'},status||503);
    }
  };
}
