interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface KbdBindings {
	size?: string;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: KbdBindings, ops: OpsBuilder) => void) => void };
};

function kbdClass(b: KbdBindings): string {
	const size = b.size ?? "md";
	return ["xoji-kbd", size !== "md" && `xoji-kbd--${size}`].filter(Boolean).join(" ");
}

function kbdHtml(b: KbdBindings): string {
	return `<kbd part="kbd" class="${kbdClass(b)}"><slot></slot></kbd>`;
}

hooks.fragment.mount("kbd", (bindings, ops) => {
	ops.replaceChildren("[data-kbd]", kbdHtml(bindings));
});

hooks.fragment.update("kbd", (bindings, ops) => {
	ops.setAttr('[part="kbd"]', "class", kbdClass(bindings));
});
