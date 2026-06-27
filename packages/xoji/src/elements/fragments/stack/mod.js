"use strict";
(() => {
  // packages/xoji/src/elements/fragments/stack/mod.ts
  function stackClass(b) {
    const gap = Math.min(Math.max(Math.trunc(b.gap ?? 4), 0), 8);
    return [
      "xoji-stack",
      `xoji-stack--gap-${gap}`,
      b.align && `xoji-stack--align-${b.align}`,
      b.justify && `xoji-stack--justify-${b.justify}`,
      b.inline && "xoji-stack--inline"
    ].filter(Boolean).join(" ");
  }
  function stackHtml(b) {
    return `<div part="stack" class="${stackClass(b)}"><slot></slot></div>`;
  }
  hooks.fragment.mount("stack", (bindings, ops) => {
    ops.replaceChildren("[data-stack]", stackHtml(bindings));
  });
  hooks.fragment.update("stack", (bindings, ops) => {
    ops.setAttr('[part="stack"]', "class", stackClass(bindings));
  });
})();
