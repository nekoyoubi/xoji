"use strict";
(() => {
  // packages/xoji/src/elements/fragments/card-link/mod.ts
  function cardLinkClass(b) {
    return [
      "xoji-card",
      "xoji-card-link",
      b.overlay && "xoji-card--overlay",
      b.interactive && "xoji-card--interactive",
      b.compact && "xoji-card--compact"
    ].filter(Boolean).join(" ");
  }
  function cardLinkHtml(b) {
    const href = b.href ?? "#";
    const target = b.target ?? null;
    const rel = b.rel ?? null;
    const attrs = [`href="${href}"`, target ? `target="${target}"` : "", rel ? `rel="${rel}"` : ""].filter(Boolean).join(" ");
    return `<a part="card" class="${cardLinkClass(b)}" ${attrs}><div class="xoji-card__header" part="header"><slot name="header"></slot></div><div class="xoji-card__body" part="body"><slot></slot></div><div class="xoji-card__footer" part="footer"><slot name="footer"></slot></div></a>`;
  }
  hooks.fragment.mount("card-link", (bindings, ops) => {
    ops.replaceChildren("[data-card-link]", cardLinkHtml(bindings));
  });
  hooks.fragment.update("card-link", (bindings, ops) => {
    ops.setAttr('[part="card"]', "class", cardLinkClass(bindings));
    ops.setAttr('[part="card"]', "href", bindings.href ?? "#");
  });
})();
