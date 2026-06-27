"use strict";
(() => {
  // packages/xoji/src/elements/fragments/switch/mod.ts
  function switchClass(b) {
    const size = b.size ?? "md";
    const tone = b.tone ?? "accent";
    return [
      "xoji-switch",
      `xoji-switch--${tone}`,
      size !== "md" && `xoji-switch--${size}`,
      b.shape === "square" && "xoji-switch--square",
      b.orientation === "vertical" && "xoji-switch--vertical",
      b.reverse && "xoji-switch--reverse",
      b.labelSide === "end" && "xoji-switch--label-end",
      b.disabled && "xoji-switch--disabled"
    ].filter(Boolean).join(" ");
  }
  function stateLabel(b) {
    const text = (b.checked ? b.onLabel : b.offLabel) ?? null;
    return text;
  }
  function inner(b) {
    const checked = b.checked ?? false;
    const disabled = b.disabled ?? false;
    const uid = b.elementId ?? "xoji-switch";
    const labelId = `${uid}-label`;
    const stateId = `${uid}-state`;
    const stateText = stateLabel(b);
    const hasState = stateText !== null;
    let nameAttr = "";
    if (b.labelledby) nameAttr = ` aria-labelledby="${b.labelledby}"`;
    else if (b.label) nameAttr = ` aria-labelledby="${labelId}"`;
    else if (hasState) nameAttr = ` aria-labelledby="${stateId}"`;
    const disabledAttr = disabled ? ' disabled aria-disabled="true"' : "";
    const leadingLabel = b.label ? `<span class="xoji-switch__label" part="label" id="${labelId}">${b.label}</span>` : "";
    const trailingState = hasState ? `<span class="xoji-switch__state" part="state" id="${stateId}">${stateText}</span>` : "";
    return leadingLabel + `<button class="xoji-switch__track" part="track" type="button" role="switch" aria-checked="${String(checked)}"${nameAttr}${disabledAttr}><span class="xoji-switch__thumb" part="thumb" aria-hidden="true"></span></button>` + trailingState;
  }
  hooks.fragment.mount("switch", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", switchClass(bindings));
    ops.replaceChildren("[data-switch]", inner(bindings));
  });
  hooks.fragment.update("switch", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", switchClass(bindings));
    ops.setAttr('[role="switch"]', "aria-checked", String(bindings.checked ?? false));
    const text = stateLabel(bindings);
    if (text !== null) ops.setText('[part="state"]', text);
  });
  xript.exports.register("toggle", (payload) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    return { toggleChecked: true };
  });
  xript.exports.register("keyToggle", (payload) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") return { toggleChecked: true, preventDefault: true };
    return {};
  });
})();
