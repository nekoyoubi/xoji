"use strict";
(() => {
  // packages/xoji/src/elements/fragments/dialog/mod.ts
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>';
  function dialogClass(b) {
    const size = b.size ?? "md";
    return ["xoji-dialog", size !== "md" && `xoji-dialog--${size}`].filter(Boolean).join(" ");
  }
  function titleId(b) {
    return `${b.elementId ?? "xoji-dialog"}-title`;
  }
  function inner(b) {
    const heading = b.heading ?? null;
    const label = b.label ?? null;
    const labelledby = b.labelledby ?? null;
    const closeLabel = b.closeLabel ?? "Close";
    const showCloseButton = !b.noCloseButton;
    const labelAttr = labelledby ? ` aria-labelledby="${labelledby}"` : heading ? ` aria-labelledby="${titleId(b)}"` : label ? ` aria-label="${label}"` : "";
    const closeButton = showCloseButton ? `<button type="button" class="xoji-dialog__close" part="close" aria-label="${closeLabel}">${CLOSE_ICON}</button>` : "";
    const titleMarkup = heading ? `<h2 class="xoji-dialog__title" id="${titleId(b)}">${heading}</h2>` : "";
    const header = `<header class="xoji-dialog__header" part="header"><slot name="header">${titleMarkup}</slot>${closeButton}</header>`;
    return `<dialog class="${dialogClass(b)}" part="dialog"${labelAttr}>` + header + `<div class="xoji-dialog__body" part="body"><slot></slot></div><footer class="xoji-dialog__footer" part="footer"><slot name="footer"></slot></footer></dialog>`;
  }
  hooks.fragment.mount("dialog", (bindings, ops) => {
    ops.replaceChildren("[data-dialog]", inner(bindings));
  });
  hooks.fragment.update("dialog", (bindings, ops) => {
    ops.setAttr(".xoji-dialog", "class", dialogClass(bindings));
    if (bindings.heading) ops.setText(".xoji-dialog__title", bindings.heading);
  });
  xript.exports.register("requestClose", (payload) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    return { requestClose: true };
  });
})();
