interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface ClusterBindings {
	gap?: number;
	align?: string | null;
	justify?: string | null;
	nowrap?: boolean;
	inline?: boolean;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: ClusterBindings, ops: OpsBuilder) => void) => void };
};

function clusterClass(b: ClusterBindings): string {
	const gap = Math.min(Math.max(Math.trunc(b.gap ?? 2), 0), 8);
	return [
		"xoji-cluster",
		`xoji-cluster--gap-${gap}`,
		b.align && `xoji-cluster--align-${b.align}`,
		b.justify && `xoji-cluster--justify-${b.justify}`,
		b.nowrap && "xoji-cluster--nowrap",
		b.inline && "xoji-cluster--inline",
	]
		.filter(Boolean)
		.join(" ");
}

function clusterHtml(b: ClusterBindings): string {
	return `<div part="cluster" class="${clusterClass(b)}"><slot></slot></div>`;
}

hooks.fragment.mount("cluster", (bindings, ops) => {
	ops.replaceChildren("[data-cluster]", clusterHtml(bindings));
});

hooks.fragment.update("cluster", (bindings, ops) => {
	ops.setAttr('[part="cluster"]', "class", clusterClass(bindings));
});
