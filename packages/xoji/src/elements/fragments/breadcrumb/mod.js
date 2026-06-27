"use strict";
(() => {
  // packages/xoji/src/elements/fragments/breadcrumb/mod.ts
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function breadcrumbClass(bindings) {
    const tone = bindings.tone ?? "accent";
    const size = bindings.size ?? "md";
    return ["xoji-breadcrumb", `xoji-breadcrumb--${tone}`, size !== "md" && `xoji-breadcrumb--${size}`].filter(Boolean).join(" ");
  }
  function separatorMarkup(separator) {
    return `<li class="xoji-breadcrumb__separator" part="separator" aria-hidden="true">${escapeHtml(separator)}</li>`;
  }
  function list(bindings) {
    const items = bindings.items ?? [];
    if (items.length === 0) return '<span class="xoji-slot"><slot></slot></span>';
    const separator = bindings.separator ?? "/";
    const lastIndex = items.length - 1;
    return items.map((item, index) => {
      const isCurrent = item.current === true || item.current === void 0 && index === lastIndex;
      const label = escapeHtml(item.label ?? "");
      const cell = item.href && !isCurrent ? `<a class="xoji-breadcrumb__link" part="item" href="${escapeAttr(item.href)}">${label}</a>` : isCurrent ? `<span class="xoji-breadcrumb__current" part="item" aria-current="page">${label}</span>` : `<span class="xoji-breadcrumb__current" part="item">${label}</span>`;
      const row = `<li class="xoji-breadcrumb__item" part="item-wrap">${cell}</li>`;
      return index < lastIndex ? `${row}${separatorMarkup(separator)}` : row;
    }).join("");
  }
  hooks.fragment.mount("breadcrumb", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", breadcrumbClass(bindings));
    ops.setAttr("[data-root]", "aria-label", bindings.label ?? "Breadcrumb");
    ops.replaceChildren("[data-list]", list(bindings));
  });
  hooks.fragment.update("breadcrumb", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", breadcrumbClass(bindings));
    ops.setAttr("[data-root]", "aria-label", bindings.label ?? "Breadcrumb");
  });
})();
