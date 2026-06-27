"use strict";
(() => {
  // packages/xoji/src/elements/fragments/skeleton/mod.ts
  function skeletonClass(b) {
    const shape = b.shape ?? "text";
    const size = b.size ?? "md";
    return ["xoji-skeleton", `xoji-skeleton--${shape}`, size !== "md" && `xoji-skeleton--${size}`].filter(Boolean).join(" ");
  }
  function skeletonHtml(b) {
    return `<div part="skeleton" class="${skeletonClass(b)}" aria-hidden="true"></div>`;
  }
  hooks.fragment.mount("skeleton", (bindings, ops) => {
    ops.replaceChildren("[data-skeleton]", skeletonHtml(bindings));
  });
  hooks.fragment.update("skeleton", (bindings, ops) => {
    ops.setAttr('[part="skeleton"]', "class", skeletonClass(bindings));
  });
})();
