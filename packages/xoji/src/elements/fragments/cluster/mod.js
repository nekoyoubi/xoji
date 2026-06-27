"use strict";
(() => {
  // packages/xoji/src/elements/fragments/cluster/mod.ts
  function clusterClass(b) {
    const gap = Math.min(Math.max(Math.trunc(b.gap ?? 2), 0), 8);
    return [
      "xoji-cluster",
      `xoji-cluster--gap-${gap}`,
      b.align && `xoji-cluster--align-${b.align}`,
      b.justify && `xoji-cluster--justify-${b.justify}`,
      b.nowrap && "xoji-cluster--nowrap",
      b.inline && "xoji-cluster--inline"
    ].filter(Boolean).join(" ");
  }
  function clusterHtml(b) {
    return `<div part="cluster" class="${clusterClass(b)}"><slot></slot></div>`;
  }
  hooks.fragment.mount("cluster", (bindings, ops) => {
    ops.replaceChildren("[data-cluster]", clusterHtml(bindings));
  });
  hooks.fragment.update("cluster", (bindings, ops) => {
    ops.setAttr('[part="cluster"]', "class", clusterClass(bindings));
  });
})();
