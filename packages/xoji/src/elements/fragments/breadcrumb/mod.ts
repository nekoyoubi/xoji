interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
}

interface BreadcrumbItem {
	label?: string;
	href?: string;
	current?: boolean;
}

interface BreadcrumbBindings {
	items?: BreadcrumbItem[];
	separator?: string;
	tone?: string;
	size?: string;
	label?: string;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: BreadcrumbBindings, ops: OpsBuilder) => void) => void };
};

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function escapeAttr(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function breadcrumbClass(bindings: BreadcrumbBindings): string {
	const tone = bindings.tone ?? "accent";
	const size = bindings.size ?? "md";
	return ["xoji-breadcrumb", `xoji-breadcrumb--${tone}`, size !== "md" && `xoji-breadcrumb--${size}`]
		.filter(Boolean)
		.join(" ");
}

function separatorMarkup(separator: string): string {
	return `<li class="xoji-breadcrumb__separator" part="separator" aria-hidden="true">${escapeHtml(separator)}</li>`;
}

function list(bindings: BreadcrumbBindings): string {
	const items = bindings.items ?? [];
	// no items → project the consumer's own `<li>` rows through a native `<slot>`; a
	// `display:contents` passthrough keeps them flowing as the `<ol>`'s children
	if (items.length === 0) return '<span class="xoji-slot"><slot></slot></span>';
	const separator = bindings.separator ?? "/";
	const lastIndex = items.length - 1;
	return items
		.map((item, index) => {
			const isCurrent = item.current === true || (item.current === undefined && index === lastIndex);
			const label = escapeHtml(item.label ?? "");
			const cell =
				item.href && !isCurrent
					? `<a class="xoji-breadcrumb__link" part="item" href="${escapeAttr(item.href)}">${label}</a>`
					: isCurrent
						? `<span class="xoji-breadcrumb__current" part="item" aria-current="page">${label}</span>`
						: `<span class="xoji-breadcrumb__current" part="item">${label}</span>`;
			const row = `<li class="xoji-breadcrumb__item" part="item-wrap">${cell}</li>`;
			return index < lastIndex ? `${row}${separatorMarkup(separator)}` : row;
		})
		.join("");
}

/** Build the whole list once — the expensive `replaceChildren` rebuild. */
hooks.fragment.mount("breadcrumb", (bindings, ops) => {
	ops.setAttr("[data-root]", "class", breadcrumbClass(bindings));
	ops.setAttr("[data-root]", "aria-label", bindings.label ?? "Breadcrumb");
	ops.replaceChildren("[data-list]", list(bindings));
});

/** A presentational change — patch the existing nodes, never rebuild the list. */
hooks.fragment.update("breadcrumb", (bindings, ops) => {
	ops.setAttr("[data-root]", "class", breadcrumbClass(bindings));
	ops.setAttr("[data-root]", "aria-label", bindings.label ?? "Breadcrumb");
});
