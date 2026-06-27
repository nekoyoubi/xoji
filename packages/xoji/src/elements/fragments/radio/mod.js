"use strict";
(() => {
  // packages/xoji/src/elements/fragments/radio/mod.ts
  function radioClass(b) {
    const tone = b.tone ?? "accent";
    const size = b.size ?? "md";
    return [
      "xoji-radio",
      `xoji-radio--${tone}`,
      size !== "md" && `xoji-radio--${size}`,
      b.invalid && "xoji-radio--invalid"
    ].filter(Boolean).join(" ");
  }
  function inner(b) {
    const name = b.name ?? null;
    const value = b.value ?? "on";
    const label = b.label ?? null;
    const labelledby = b.labelledby ?? null;
    const nameAttr = name !== null ? ` name="${name}"` : "";
    const valueAttr = ` value="${value}"`;
    const checkedAttr = b.checked ? " checked" : "";
    const disabledAttr = b.disabled ? " disabled" : "";
    const ariaInvalid = b.invalid ? ` aria-invalid="true"` : "";
    const ariaLabel = label && !labelledby ? ` aria-label="${label}"` : "";
    const ariaLabelledby = labelledby ? ` aria-labelledby="${labelledby}"` : "";
    const labelText = label !== null ? label : "";
    return `<input part="control" class="xoji-radio__control" type="radio"${nameAttr}${valueAttr}${checkedAttr}${disabledAttr}${ariaInvalid}${ariaLabel}${ariaLabelledby} /><span part="indicator" class="xoji-radio__indicator" aria-hidden="true"></span><span part="label" class="xoji-radio__label"><slot>${labelText}</slot></span>`;
  }
  hooks.fragment.mount("radio", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", radioClass(bindings));
    ops.replaceChildren("[data-radio]", inner(bindings));
  });
  hooks.fragment.update("radio", (bindings, ops) => {
    ops.setAttr("[data-root]", "class", radioClass(bindings));
    ops.setAttr(".xoji-radio__control", "value", bindings.value ?? "on");
  });
  xript.exports.register("select", (payload) => {
    const e = payload;
    if (e.disabled || e.ariaDisabled === "true") return {};
    if (e.checked === false) return {};
    return { selectRadio: true };
  });
})();
