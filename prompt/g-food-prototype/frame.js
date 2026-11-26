(() => {
  if (window.parent === window) return;
  const close = () => window.parent.postMessage("gfood-preview-close", location.origin);
  const button = document.getElementById("close-preview");
  const back = document.getElementById("go-workshop");
  if (button) { button.hidden = false; button.addEventListener("click", close); }
  if (back) back.hidden = true;
  document.addEventListener("keydown", event => { if (event.key === "Escape") { event.preventDefault(); close(); } });
})();
