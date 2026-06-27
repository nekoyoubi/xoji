"use strict";
(() => {
  // packages/xoji/src/elements/fragments/form-group/mod.ts
  function escape(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function groupClass(b) {
    const size = b.size ?? "md";
    return ["xoji-form-group", b.invalid && "xoji-form-group--invalid", size !== "md" && `xoji-form-group--${size}`].filter(Boolean).join(" ");
  }
  function inner(b) {
    const label = b.label ?? "";
    const description = b.description ?? "";
    const error = b.error ?? "";
    const invalid = b.invalid === true;
    const required = b.required === true;
    const labelFor = b.hasFor ? ` for="${b.controlTarget ?? ""}"` : "";
    const labelHidden = label.length === 0 ? " hidden" : "";
    const requiredHidden = required ? "" : " hidden";
    const descriptionHidden = description.length === 0 ? " hidden" : "";
    const errorHidden = !invalid || error.length === 0 ? " hidden" : "";
    return `<label class="xoji-form-group__label" part="label" data-label id="${b.labelId ?? ""}"${labelFor}${labelHidden}><span data-label-text>${escape(label)}</span><span class="xoji-form-group__required" part="required-indicator" data-required aria-hidden="true"${requiredHidden}>*</span></label><span class="xoji-form-group__description" part="description" data-description id="${b.descriptionId ?? ""}"${descriptionHidden}>${escape(description)}</span><div class="xoji-form-group__control" part="control"><slot></slot></div><span class="xoji-form-group__error" part="error" data-error id="${b.errorId ?? ""}" role="alert"${errorHidden}>${escape(error)}</span>`;
  }
  hooks.fragment.mount("form-group", (bindings, ops) => {
    ops.setAttr("[data-group]", "class", groupClass(bindings));
    ops.replaceChildren("[data-group]", inner(bindings));
  });
  hooks.fragment.update("form-group", (bindings, ops) => {
    const label = bindings.label ?? "";
    const description = bindings.description ?? "";
    const error = bindings.error ?? "";
    const invalid = bindings.invalid === true;
    const required = bindings.required === true;
    ops.setAttr("[data-group]", "class", groupClass(bindings));
    ops.setText("[data-label-text]", label);
    ops.toggle("[data-label]", label.length > 0);
    ops.toggle("[data-required]", required);
    if (bindings.hasFor) ops.setAttr("[data-label]", "for", bindings.controlTarget ?? "");
    ops.setText("[data-description]", description);
    ops.toggle("[data-description]", description.length > 0);
    ops.setText("[data-error]", error);
    ops.toggle("[data-error]", invalid && error.length > 0);
  });
})();
