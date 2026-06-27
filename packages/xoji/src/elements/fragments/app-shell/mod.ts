interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface AppShellBindings {
	skipLink?: boolean;
	skipLinkText?: string;
	bodyStyle?: string | null;
	mainId?: string | null;
}

function escapeAttr(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: AppShellBindings, ops: OpsBuilder) => void) => void };
};

function skipText(b: AppShellBindings): string {
	const explicit = b.skipLinkText;
	return explicit && explicit.length > 0 ? explicit : "Skip to main content";
}

function mainId(b: AppShellBindings): string {
	const explicit = b.mainId;
	return explicit && explicit.length > 0 ? explicit : "main";
}

function appInner(b: AppShellBindings): string {
	const id = mainId(b);
	const skip = b.skipLink
		? `<a part="skip-link" class="xoji-app__skip-link" href="#${escapeAttr(id)}">${escapeAttr(skipText(b))}</a>`
		: "";
	return (
		skip +
		'<slot name="toolbar"></slot>' +
		'<div data-body class="xoji-app__body"><slot name="left"></slot>' +
		`<main part="main" id="${escapeAttr(id)}" class="xoji-main" tabindex="0"><slot></slot></main>` +
		'<slot name="right"></slot></div>' +
		'<slot name="statusbar"></slot>'
	);
}

hooks.fragment.mount("app-shell", (bindings, ops) => {
	ops.replaceChildren("[data-app]", appInner(bindings));
	if (bindings.bodyStyle) ops.setAttr("[data-body]", "style", bindings.bodyStyle);
});

hooks.fragment.update("app-shell", (bindings, ops) => {
	ops.setAttr("[data-body]", "style", bindings.bodyStyle ?? "");
});
