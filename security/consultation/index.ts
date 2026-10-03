import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
import {makeHandler} from './handler.mjs';
import {createNotificationMailer} from './notification.mjs';
const url=Deno.env.get('SUPABASE_URL')||'';
const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')||'';
const anonKey=Deno.env.get('SUPABASE_ANON_KEY')||'';
const db=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
const userClient=(authorization:string)=>createClient(url,anonKey,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:authorization}}});
// User-approved notification contains no applicant or consultation data.
// Credentials and the existing sender configuration remain server-side only.
const getRecipient=async()=>{
  const {data,error}=await db.rpc('aiwith_notification_recipient');
  return error?'':data||'';
};
const sendMail=createNotificationMailer({apiKey:Deno.env.get('RESEND_API_KEY')||'',from:Deno.env.get('RESEND_FROM')||'AIWITH <onboarding@resend.dev>',getRecipient});
// Existing public-submit endpoint retains verify_jwt=false; list validates Auth + RLS.
Deno.serve(makeHandler({db,userClient,sendMail}));
