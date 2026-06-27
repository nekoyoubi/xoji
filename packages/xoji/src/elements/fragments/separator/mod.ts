interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface SeparatorBindings {
	orientation?: string;
	variant?: string;
	size?: string;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: SeparatorBindings, ops: OpsBuilder) => void) => void };
};

function separatorClass(b: SeparatorBindings): string {
	return [
		"xoji-separator",
		b.variant === "with-label" && "xoji-separator--with-label",
		b.orientation === "vertical" && "xoji-separator--vertical",
		b.size === "thin" && "xoji-separator--thin",
	]
		.filter(Boolean)
		.join(" ");
}

function separatorHtml(b: SeparatorBindings): string {
	const ariaOrientation = b.orientation === "vertical" ? ' aria-orientation="vertical"' : "";
	if (b.variant === "with-label") {
		return `<div part="separator" class="${separatorClass(b)}" role="separator"${ariaOrientation}><span class="xoji-separator__label" part="label"><slot></slot></span></div>`;
	}
	return `<div part="separator" class="${separatorClass(b)}" aria-hidden="true"></div>`;
}

hooks.fragment.mount("separator", (bindings, ops) => {
	ops.replaceChildren("[data-separator]", separatorHtml(bindings));
});

hooks.fragment.update("separator", (bindings, ops) => {
	ops.setAttr('[part="separator"]', "class", separatorClass(bindings));
});
