interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface SkeletonBindings {
	shape?: string;
	size?: string;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: SkeletonBindings, ops: OpsBuilder) => void) => void };
};

function skeletonClass(b: SkeletonBindings): string {
	const shape = b.shape ?? "text";
	const size = b.size ?? "md";
	return ["xoji-skeleton", `xoji-skeleton--${shape}`, size !== "md" && `xoji-skeleton--${size}`]
		.filter(Boolean)
		.join(" ");
}

function skeletonHtml(b: SkeletonBindings): string {
	return `<div part="skeleton" class="${skeletonClass(b)}" aria-hidden="true"></div>`;
}

hooks.fragment.mount("skeleton", (bindings, ops) => {
	ops.replaceChildren("[data-skeleton]", skeletonHtml(bindings));
});

hooks.fragment.update("skeleton", (bindings, ops) => {
	ops.setAttr('[part="skeleton"]', "class", skeletonClass(bindings));
});
