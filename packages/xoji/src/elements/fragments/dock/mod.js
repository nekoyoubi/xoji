"use strict";
(() => {
  // packages/xoji/src/elements/fragments/dock/mod.ts
  function dockClass(b) {
    const size = b.size ?? "md";
    return [
      "xoji-dock",
      b.side === "right" && "xoji-dock--right",
      size !== "md" && `xoji-dock--${size}`,
      b.tone && `xoji-dock--${b.tone}`,
      b.reverseEdge && "xoji-dock--edge-out",
      b.edgeWidth && `xoji-dock--edge-${b.edgeWidth}`
    ].filter(Boolean).join(" ");
  }
  function dockInner(b) {
    const header = b.label && !b.hideHeader ? `<div class="xoji-dock__header" part="header"><slot name="header">${b.label}</slot></div>` : `<slot name="header"></slot>`;
    return `${header}<div class="xoji-dock__body" part="body"><slot></slot></div><slot name="footer"></slot>`;
  }
  function dockHtml(b) {
    const tag = b.nav ? "nav" : "aside";
    const label = b.label ?? null;
    const labelAttr = label && !b.hasAriaLabel ? ` aria-label="${label}"` : "";
    return `<${tag} part="dock" class="${dockClass(b)}"${labelAttr}>${dockInner(b)}</${tag}>`;
  }
  hooks.fragment.mount("dock", (bindings, ops) => {
    ops.replaceChildren("[data-dock]", dockHtml(bindings));
  });
  hooks.fragment.update("dock", (bindings, ops) => {
    ops.setAttr('[part="dock"]', "class", dockClass(bindings));
    const label = bindings.label ?? null;
    if (label && !bindings.hideHeader) {
      ops.setText('slot[name="header"]', label);
    }
    if (label && !bindings.hasAriaLabel) {
      ops.setAttr('[part="dock"]', "aria-label", label);
    }
  });
})();
