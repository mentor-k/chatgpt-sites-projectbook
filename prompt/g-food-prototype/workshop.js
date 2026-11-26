(() => {
  "use strict";
  const industry = document.getElementById("gf-industry");
  const product = document.getElementById("gf-product");
  const status = document.getElementById("gf-copy-status");
  const fields = Array.from(document.querySelectorAll("[data-gf-template]"));
  if (!industry || !product || !status || !fields.length) return;
  const original = new Map(fields.map(field => [field, field.value]));
  const last = new Map(original);
  let timer;
  const show = message => {
    status.hidden = false;
    status.textContent = message;
    clearTimeout(timer);
    timer = setTimeout(() => { status.hidden = true; }, 5500);
  };
  const update = () => {
    for (const field of fields) {
      const prev = last.get(field);
      const next = original.get(field)
        .replace(/^업종: \( \)$/m, () => "업종: " + (industry.value.trim() || "( )"))
        .replace(/^제품명: \( \)$/m, () => "제품명: " + (product.value.trim() || "( )"));
      if (prev === field.value) {
        field.value = next;
      } else {
        const prevHeader = prev.split("\n").filter(line => /^(업종|제품명): /.test(line));
        const nextHeader = next.split("\n").filter(line => /^(업종|제품명): /.test(line));
        let current = field.value.split("\n");
        for (let i = 0; i < prevHeader.length; i++) {
          const index = current.indexOf(prevHeader[i]);
          if (index >= 0) current[index] = nextHeader[i];
        }
        const merged = current.join("\n");
        if (merged !== field.value) field.value = merged;
      }
      last.set(field, next);
    }
  };
  for (const input of [industry, product]) input.addEventListener("input", update);
  update();
  document.querySelectorAll("button[data-gf-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const field = document.getElementById("prompt-" + button.dataset.gfCopy);
      if (!field || !field.value.trim()) return;
      try {
        if (!navigator.clipboard) throw Error("Clipboard unavailable");
        await navigator.clipboard.writeText(field.value);
        show("프롬프트를 복사했습니다");
      } catch {
        field.focus();
        field.select();
        let copied = false;
        try { copied = document.execCommand("copy"); } catch {}
        show(copied ? "프롬프트를 복사했습니다" : "텍스트를 선택했습니다. Ctrl+C 또는 ⌘C로 복사하세요");
      }
    });
  });
})();

(() => {
  "use strict";
  const dialog = document.getElementById("gf-form-dialog");
  const frame = document.getElementById("gf-form-frame");
  const standalone = document.getElementById("gf-form-standalone");
  const close = document.getElementById("gf-form-close");
  if (!dialog || typeof dialog.showModal !== "function" || !frame || !standalone || !close) return;
  let trigger;
  for (const a of document.querySelectorAll("a[data-gf-preview]")) {
    a.setAttribute("aria-haspopup", "dialog");
    a.addEventListener("click", event => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      trigger = a;
      standalone.href = a.href;
      frame.src = a.href;
      dialog.showModal();
      document.documentElement.classList.add("gf-scroll-lock");
      close.focus();
    });
  }
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("gf-scroll-lock");
    trigger?.focus();
  });
  window.addEventListener("message", event => {
    if (event.origin === location.origin && event.source === frame.contentWindow &&
        event.data === "gfood-preview-close" && dialog.open) dialog.close();
  });
})();
