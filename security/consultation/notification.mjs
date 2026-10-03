// Approved outbound data: fixed notice and fixed administrator URL only.
// This mailer accepts no consultation data, record IDs, attachments or caller-selected recipients.
export const ADMIN_URL='https://aiwith.kr/admin/';
export const SUBJECT='새 상담 접수';
export const TEXT='새 상담 접수\n관리자 링크: '+ADMIN_URL;
export function createNotificationMailer({apiKey='',from='AIWITH <onboarding@resend.dev>',getRecipient=async()=>'',fetchImpl=fetch}={}){
  return async()=>{
    if(!apiKey)return 'not_configured';
    if(typeof from!=='string'||/[\r\n]/.test(from)||!from.trim())return 'failed';
    try{
      const recipient=await getRecipient();
      if(typeof recipient!=='string'||recipient.length>254||!/^[^<>\s,;@]+@[^<>\s,;@]+\.[^<>\s,;@]+$/.test(recipient))return 'not_configured';
      const response=await fetchImpl('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Content-Type':'application/json',Authorization:'Bearer '+apiKey},
        body:JSON.stringify({from:from.trim(),to:[recipient],subject:SUBJECT,text:TEXT}),
        signal:AbortSignal.timeout(8000)
      });
      if(!response.ok)return 'failed';
      const accepted=await response.json();
      return typeof accepted?.id==='string'&&accepted.id?'sent':'failed';
    }catch{return 'failed'}
  };
}
