"use strict";
function composeBeginnerPrompt(caseText, stepText) {
 const scenario = caseText.trim();
 const instructions = stepText.trim().replace(/\[선택(?:한)?\s*사례(?:\s*또는 내 사업[^\]]*)?\]/gu,"사례 입력문");
 return scenario && instructions ? "[사례 입력문]\n" + scenario + "\n\n[첫 실습 지시]\n" + instructions : "";
}
document.addEventListener("click", async (event) => {
 const button=event.target.closest("button[data-beginner-copy]");
 if(!button)return;
 const block=button.closest(".bp-beginner-launch");
 const status=block.querySelector(".bp-first-status");
 const preview=block.querySelector(".bp-first-preview");
 const fallback=preview.querySelector("textarea");
 const currentCase=document.getElementById(button.dataset.beginnerCopy);
 const currentStep=document.getElementById("beginner-step-text");
 const text=composeBeginnerPrompt(currentCase.value,currentStep.value);
 status.textContent="";
 if(!text){preview.hidden=true;status.textContent="사례 또는 첫 지시가 비어 있습니다. 입력하거나 사례 원문을 되돌리세요.";return;}
 fallback.value=text;
 try {
  await navigator.clipboard.writeText(text);
  preview.hidden=true;
  status.textContent="사례와 첫 프롬프트를 복사했습니다. AI 채팅에 붙여 넣으세요.";
 } catch (_) {
  preview.hidden=false;
  preview.open=true;
  fallback.focus();
  fallback.select();
  status.textContent="자동 복사를 사용할 수 없습니다. 선택된 문장을 직접 복사하세요.";
 }
});
function revealPracticeCase() {
 const id=window.location.hash.slice(1);
 if(!/^case-(?:[abc]|hardware|sw|energy|agri)$/.test(id))return;
 const card=document.getElementById(id);
 if(card && card.matches("#cases details.bp-prompt"))card.open=true;
}
window.addEventListener("hashchange", revealPracticeCase);
revealPracticeCase();
