"use strict";
(() => {
  // packages/xoji/src/elements/fragments/swatch/mod.ts
  function esc(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function swatchClass(b) {
    const size = b.size ?? "md";
    return [
      "xoji-swatch",
      size !== "md" && `xoji-swatch--${size}`,
      b.interactive && "xoji-swatch--interactive",
      b.selected && "xoji-swatch--selected"
    ].filter(Boolean).join(" ");
  }
  function detailsMarkup(b) {
    if (!b.showsDetails) return "";
    const rows = (b.detailRows ?? []).map(
      (row) => `<span class="xoji-swatch__detail-model" part="detail-model">${esc(row.model)}</span><span class="xoji-swatch__detail-value" part="detail-value">${esc(row.value)}</span>`
    ).join("");
    const id = b.detailsId ?? "xoji-swatch-details";
    return `<span class="xoji-swatch__details" part="details" id="${id}" role="tooltip">${rows}</span>`;
  }
  function bodyMarkup(b) {
    const color = esc(b.color ?? "transparent");
    const dot = `<span class="xoji-swatch__dot" part="dot" style="background:${color}" aria-hidden="true"></span>`;
    const label = b.label ? `<span class="xoji-swatch__label" part="label">${esc(b.label)}</span>` : "";
    const value = b.value ? `<span class="xoji-swatch__value" part="value">${esc(b.value)}</span>` : "";
    return `${dot}${label}${value}${detailsMarkup(b)}`;
  }
  function describedBy(b) {
    return b.showsDetails ? ` aria-describedby="${b.detailsId ?? "xoji-swatch-details"}"` : "";
  }
  function accessibleName(b) {
    return b.label ?? b.value ?? b.color;
  }
  function inner(b) {
    const body = bodyMarkup(b);
    if (!b.interactive) {
      const focusable = b.showsDetails ? ` tabindex="0"` : "";
      return `<span part="swatch" class="${swatchClass(b)}"${focusable}${describedBy(b)}>${body}</span>`;
    }
    const ariaPressed = ` aria-pressed="${String(!!b.selected)}"`;
    const name = accessibleName(b);
    const ariaLabel = !b.label && name ? ` aria-label="${esc(name)}"` : "";
    return `<button part="swatch" type="button" class="${swatchClass(b)}"${ariaPressed}${ariaLabel}${describedBy(b)}>${body}</button>`;
  }
  hooks.fragment.mount("swatch", (bindings, ops) => {
    ops.replaceChildren("[data-swatch]", inner(bindings));
  });
  hooks.fragment.update("swatch", (bindings, ops) => {
    ops.setAttr('[part="swatch"]', "class", swatchClass(bindings));
    if (bindings.interactive) ops.setAttr('[part="swatch"]', "aria-pressed", String(!!bindings.selected));
    ops.setAttr('[part="dot"]', "style", `background:${bindings.color ?? "transparent"}`);
    if (bindings.label) ops.setText('[part="label"]', bindings.label);
    if (bindings.value) ops.setText('[part="value"]', bindings.value);
    if (bindings.interactive && !bindings.label) {
      const name = accessibleName(bindings);
      if (name) ops.setAttr('[part="swatch"]', "aria-label", name);
    }
  });
  xript.exports.register("select", (payload, context) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    const ctx = context ?? {};
    return {
      emit: {
        type: "select",
        detail: { color: ctx.color ?? null, label: ctx.label ?? null, value: ctx.value ?? null }
      }
    };
  });
})();
