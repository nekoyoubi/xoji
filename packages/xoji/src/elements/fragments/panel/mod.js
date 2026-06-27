"use strict";
(() => {
  // packages/xoji/src/elements/fragments/panel/mod.ts
  var MARKER = '<span class="xoji-panel__marker" part="marker" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M9 6l6 6-6 6V6Z" /></svg></span>';
  function level(b) {
    const raw = Number(b.level);
    return raw >= 1 && raw <= 6 ? Math.trunc(raw) : 2;
  }
  function isCollapsible(b) {
    return (b.variant ?? "default") === "collapsible";
  }
  var ACTIONS_SLOT = `<span class="xoji-slot" data-slot="actions"><slot name="actions"></slot></span>`;
  function hasHeader(b) {
    return (b.title ?? "") !== "" || b.hasActions === true;
  }
  function panelClass(b) {
    const variant = b.variant ?? "default";
    return ["xoji-panel", variant !== "default" && `xoji-panel--${variant}`, b.scrollable && "xoji-panel--scroll"].filter(Boolean).join(" ");
  }
  function body(b) {
    const bodyAttrs = b.scrollable ? ` tabindex="0" role="region" aria-label="${b.title || b.label || "Scrollable content"}"` : "";
    return `<div class="xoji-panel__body" part="body"${bodyAttrs}><slot></slot></div><div class="xoji-panel__footer" part="footer"><slot name="footer"></slot></div>`;
  }
  function inner(b) {
    const uid = b.titleId ?? "xoji-panel";
    if (isCollapsible(b)) {
      const expanded = b.open ? "true" : "false";
      return `<div class="xoji-panel__header xoji-panel__header--toggle" part="header"><button class="xoji-panel__toggle" part="toggle" type="button" aria-expanded="${expanded}" aria-controls="${uid}-region">${MARKER}<span class="xoji-panel__title" part="title" id="${uid}">${b.title ?? ""}</span></button>${ACTIONS_SLOT}</div><div class="xoji-panel__collapse" part="collapse" id="${uid}-region" role="region" aria-labelledby="${uid}"${b.open ? "" : " hidden"}>${body(b)}</div>`;
    }
    const tag = `h${level(b)}`;
    const heading = b.title ? `<${tag} class="xoji-panel__title" part="title" id="${uid}">${b.title}</${tag}>` : "";
    const header = hasHeader(b) ? `<header class="xoji-panel__header" part="header">${heading}<span class="xoji-panel__spacer" part="spacer"></span>${ACTIONS_SLOT}</header>` : "";
    return `${header}${body(b)}`;
  }
  function applyName(bindings, ops) {
    const uid = bindings.titleId ?? "xoji-panel";
    const named = !isCollapsible(bindings) && !!bindings.title;
    const labelled = !isCollapsible(bindings) && !bindings.title && !!bindings.label;
    ops.setAttr("[data-root]", "aria-labelledby", named ? uid : "");
    ops.setAttr("[data-root]", "aria-label", labelled ? bindings.label ?? "" : "");
  }
  hooks.fragment.mount("panel", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", panelClass(bindings));
    applyName(bindings, ops);
    ops.replaceChildren("[data-panel]", inner(bindings));
  });
  hooks.fragment.update("panel", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", panelClass(bindings));
    applyName(bindings, ops);
    if (isCollapsible(bindings)) {
      const open = bindings.open === true;
      ops.setAttr(".xoji-panel__toggle", "aria-expanded", String(open));
      ops.toggle(".xoji-panel__collapse", open);
    }
  });
  xript.exports.register("togglePanel", () => {
    return { toggleOpen: true };
  });
})();
