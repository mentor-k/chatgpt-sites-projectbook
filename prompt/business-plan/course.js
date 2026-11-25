"use strict";
document.addEventListener("click", async (ev) => {
  const button = ev.target.closest("button[data-copy-prompt], button[data-reset]");
  if (!button) return;
  const input = document.getElementById(button.dataset.copyPrompt || button.dataset.reset);
  const status = button.parentElement.querySelector(".bp-status");
  if (button.dataset.reset) { input.value = input.defaultValue; status.textContent = "원문으로 되돌렸습니다."; return; }
  if (!input.value.trim()) { status.textContent = "복사할 내용을 입력하세요."; input.focus(); return; }
  try { await navigator.clipboard.writeText(input.value); status.textContent = "복사했습니다."; }
  catch { input.focus(); input.select(); status.textContent = "선택했습니다. 기기의 복사 기능을 사용하세요."; }
});
for (const area of document.querySelectorAll(".bp-prompt textarea")) area.addEventListener("input", () => {
  area.parentElement.querySelector(".bp-status").textContent = "";
});
