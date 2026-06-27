"use strict";
(() => {
  // packages/xoji/src/elements/fragments/toolbar/mod.ts
  function toolbarClass(b) {
    const size = b.size ?? "md";
    return ["xoji-toolbar", size !== "md" && `xoji-toolbar--${size}`, b.sticky && "xoji-toolbar--sticky", b.bare && "xoji-toolbar--bare"].filter(Boolean).join(" ");
  }
  function titleMarkup(b) {
    const heading = b.heading ?? null;
    if (heading === null) return "";
    const href = b.href ?? null;
    if (href !== null) {
      return `<a class="xoji-toolbar__title" part="title" href="${href}">${heading}</a>`;
    }
    return `<span class="xoji-toolbar__title" part="title">${heading}</span>`;
  }
  function inner(b) {
    return '<div class="xoji-toolbar__group xoji-toolbar__group--start" part="group"><slot name="start"></slot></div>' + titleMarkup(b) + '<slot></slot><div class="xoji-toolbar__group xoji-toolbar__group--center" part="group"><slot name="center"></slot></div><div class="xoji-toolbar__group xoji-toolbar__group--end" part="group"><slot name="end"></slot></div>';
  }
  function toolbarHtml(b) {
    const tag = b.landmark ? "header" : "div";
    const nameAttr = b.landmark && b.heading ? ` aria-label="${b.heading}"` : "";
    return `<${tag} part="toolbar" class="${toolbarClass(b)}"${nameAttr}>${inner(b)}</${tag}>`;
  }
  hooks.fragment.mount("toolbar", (bindings, ops) => {
    ops.replaceChildren("[data-toolbar]", toolbarHtml(bindings));
  });
  hooks.fragment.update("toolbar", (bindings, ops) => {
    ops.setAttr('[part="toolbar"]', "class", toolbarClass(bindings));
    const heading = bindings.heading ?? null;
    if (heading !== null) {
      ops.setText('[part="title"]', heading);
      const href = bindings.href ?? null;
      if (href !== null) ops.setAttr('[part="title"]', "href", href);
    }
    if (bindings.landmark) ops.setAttr('[part="toolbar"]', "aria-label", heading ?? "");
  });
})();
