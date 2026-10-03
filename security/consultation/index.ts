import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
import {makeHandler} from './handler.mjs';
const url=Deno.env.get('SUPABASE_URL')||'';
const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')||'';
const anonKey=Deno.env.get('SUPABASE_ANON_KEY')||'';
const db=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
const userClient=(authorization:string)=>createClient(url,anonKey,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:authorization}}});
// External email disclosure is disabled pending explicit approval of data + recipient.
// Submissions remain stored for authenticated administrator review.
const sendMail=async()=> 'not_configured';
// Existing public-submit endpoint retains verify_jwt=false; list validates Auth + RLS.
Deno.serve(makeHandler({db,userClient,sendMail}));
