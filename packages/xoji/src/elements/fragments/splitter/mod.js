"use strict";
(() => {
  // packages/xoji/src/elements/fragments/splitter/mod.ts
  function splitterClass(b) {
    const orientation = b.orientation === "horizontal" ? "horizontal" : "vertical";
    const size = b.size ?? "md";
    return [
      "xoji-splitter",
      `xoji-splitter--${orientation}`,
      size !== "md" && `xoji-splitter--${size}`,
      b.line && "xoji-splitter--line",
      b.disabled && "xoji-splitter--disabled"
    ].filter(Boolean).join(" ");
  }
  function inner(b) {
    const orientation = b.orientation === "horizontal" ? "horizontal" : "vertical";
    const name = b.labelledby ? ` aria-labelledby="${b.labelledby}"` : b.label ? ` aria-label="${b.label}"` : "";
    const disabled = b.disabled ? ` aria-disabled="true"` : "";
    const tabindex = b.disabled ? "" : ` tabindex="0"`;
    return `<div part="splitter" class="${splitterClass(b)}" role="separator" aria-orientation="${orientation}" aria-valuenow="${b.value ?? 0}" aria-valuemin="${b.min ?? 0}" aria-valuemax="${b.max ?? 0}"${name}${disabled}${tabindex}><span class="xoji-splitter__grip" part="grip" aria-hidden="true"></span></div>`;
  }
  hooks.fragment.mount("splitter", (bindings, ops) => {
    ops.replaceChildren("[data-splitter]", inner(bindings));
  });
  hooks.fragment.update("splitter", (bindings, ops) => {
    const orientation = bindings.orientation === "horizontal" ? "horizontal" : "vertical";
    ops.setAttr(".xoji-splitter", "class", splitterClass(bindings));
    ops.setAttr(".xoji-splitter", "aria-orientation", orientation);
    ops.setAttr(".xoji-splitter", "aria-valuenow", String(bindings.value ?? 0));
    ops.setAttr(".xoji-splitter", "aria-valuemin", String(bindings.min ?? 0));
    ops.setAttr(".xoji-splitter", "aria-valuemax", String(bindings.max ?? 0));
  });
  xript.exports.register("keydown", (payload, context) => {
    const e = payload;
    const ctx = context;
    if (e.disabled || e.ariaDisabled === "true") return {};
    const sign = ctx.reversed ? -1 : 1;
    const grow = ctx.axisIsX ? "ArrowRight" : "ArrowDown";
    const shrink = ctx.axisIsX ? "ArrowLeft" : "ArrowUp";
    switch (e.key) {
      case grow:
        return { nudge: sign, preventDefault: true };
      case shrink:
        return { nudge: -sign, preventDefault: true };
      case "PageUp":
        return { nudge: sign, forceAlt: true, preventDefault: true };
      case "PageDown":
        return { nudge: -sign, forceAlt: true, preventDefault: true };
      case "Home":
        return { jump: "min", preventDefault: true };
      case "End":
        return { jump: "max", preventDefault: true };
      default:
        return {};
    }
  });
  xript.exports.register("reset", (payload) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    return { reset: true };
  });
})();
