"use strict";
(() => {
  // packages/xoji/src/elements/fragments/tooltip/mod.ts
  function tooltipClass(b) {
    const cls = ["xoji-tooltip", `xoji-tooltip--${b.placement ?? "top"}`];
    if (b.tone) cls.push(`xoji-tooltip--${b.tone}`);
    if (b.variant === "soft" || b.variant === "solid") cls.push(`xoji-tooltip--${b.variant}`);
    if (b.mode === "rich") cls.push("xoji-tooltip--rich");
    if (b.size === "md") cls.push("xoji-tooltip--md");
    return cls.join(" ");
  }
  function body(b) {
    const text = b.text ?? null;
    return text !== null ? text : `<slot name="content"></slot>`;
  }
  function contentInner(b) {
    return `<span class="xoji-tooltip__arrow" part="arrow" aria-hidden="true"></span>${body(b)}`;
  }
  hooks.fragment.mount("tooltip", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", tooltipClass(bindings));
    ops.setAttr("[data-content]", "id", bindings.contentId ?? "");
    ops.setAttr("[data-content]", "data-open", String(bindings.open ?? false));
    ops.replaceChildren("[data-content]", contentInner(bindings));
  });
  hooks.fragment.update("tooltip", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", tooltipClass(bindings));
    ops.setAttr("[data-content]", "data-open", String(bindings.open ?? false));
    ops.replaceChildren("[data-content]", contentInner(bindings));
  });
})();
