import type { Size, FullTone } from "../vocab.js";
import { escapeHtml, escapeAttr } from "./escape.js";

export interface BreadcrumbItem {
	label: string;
	href?: string;
	current?: boolean;
}

export interface BreadcrumbMarkupProps {
	items?: BreadcrumbItem[];
	separator?: string;
	tone?: FullTone;
	size?: Size;
	label?: string;
}

/** The host-layout rule for a breadcrumb — the one `:host` rule, shared by the element's `styles()` and the SSR declarative shadow root. */
export const breadcrumbHostCss = ":host { display: block; }";

export function breadcrumbClass(props: BreadcrumbMarkupProps): string {
	const tone = props.tone ?? "accent";
	const size = props.size ?? "md";
	return ["xoji-breadcrumb", `xoji-breadcrumb--${tone}`, size !== "md" && `xoji-breadcrumb--${size}`]
		.filter(Boolean)
		.join(" ");
}

function separatorMarkup(separator: string): string {
	return `<li class="xoji-breadcrumb__separator" part="separator" aria-hidden="true">${escapeHtml(separator)}</li>`;
}

function inner(props: BreadcrumbMarkupProps): string {
	const items = props.items ?? [];
	if (items.length === 0) {
		return `<ol class="xoji-breadcrumb__list" part="list"><slot></slot></ol>`;
	}
	const separator = props.separator ?? "/";
	const lastIndex = items.length - 1;
	const rows = items.map((item, index) => {
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
	});
	return `<ol class="xoji-breadcrumb__list" part="list">${rows.join("")}</ol>`;
}

/**
 * The single source of a breadcrumb's shadow markup. The custom element renders it
 * into its shadow root at runtime; the `@xoji/astro` binding emits the same string
 * into a declarative shadow root at build. Data-driven: pass the parsed `items`
 * array and the function maps over it exactly as the element does. Pure and
 * DOM-free, so it is safe to import in any environment (SSR included).
 */
export function breadcrumbMarkup(props: BreadcrumbMarkupProps): string {
	const label = props.label ?? "Breadcrumb";
	return `<nav part="breadcrumb" class="${breadcrumbClass(props)}" aria-label="${escapeAttr(label)}">${inner(props)}</nav>`;
}
