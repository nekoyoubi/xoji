import type { Size } from "../vocab.js";
import { escapeHtml, escapeAttr } from "./escape.js";

export interface TreeNode {
	label: string;
	value?: string;
	href?: string;
	expanded?: boolean;
	/** Pin a branch open: forced expanded, no twisty, and no collapse path. Renders as a permanent section header. */
	locked?: boolean;
	selected?: boolean;
	disabled?: boolean;
	children?: TreeNode[];
}

export interface TreeMarkupProps {
	items?: TreeNode[];
	size?: Size;
	label?: string | null;
	labelledby?: string | null;
}

/** The host-layout rule for a tree — the one `:host` rule, shared by the element's `styles()` and the SSR declarative shadow root. */
export const treeHostCss = ":host { display: block; }";

export function firstSelectedValue(nodes: TreeNode[]): string | null {
	for (const node of nodes) {
		if (node.selected) return node.value ?? node.label;
		if (node.children) {
			const found = firstSelectedValue(node.children);
			if (found !== null) return found;
		}
	}
	return null;
}

export function treeClass(props: TreeMarkupProps): string {
	const size = props.size ?? "md";
	return ["xoji-tree", size !== "md" && `xoji-tree--${size}`].filter(Boolean).join(" ");
}

function buildNodes(nodes: TreeNode[], level: number, selectedValue: string | null): string {
	return nodes
		.map((node) => {
			const hasChildren = !!(node.children && node.children.length);
			const value = node.value ?? node.label;
			const locked = (node.locked ?? false) && hasChildren;
			const expanded = locked ? true : (node.expanded ?? false);
			const selected = value === selectedValue;
			const disabled = node.disabled ?? false;
			const twisty = hasChildren && !locked
				? `<span class="xoji-tree__twisty" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" /></svg></span>`
				: `<span class="xoji-tree__twisty xoji-tree__twisty--leaf" aria-hidden="true"></span>`;
			const label = `<span class="xoji-tree__label">${escapeHtml(node.label)}</span>`;
			const isLink = !!node.href;
			const rowOpen = isLink
				? `<a class="xoji-tree__row" part="row" href="${escapeAttr(node.href as string)}" tabindex="-1" style="--tree-level: ${level}">`
				: `<div class="xoji-tree__row" part="row" style="--tree-level: ${level}">`;
			const rowClose = isLink ? "</a>" : "</div>";
			const group = hasChildren
				? `<ul class="xoji-tree__group" role="group"${expanded ? "" : " hidden"}>${buildNodes(node.children as TreeNode[], level + 1, selectedValue)}</ul>`
				: "";
			const expandedAttr = hasChildren ? ` aria-expanded="${String(expanded)}"` : "";
			const disabledAttr = disabled ? ` aria-disabled="true"` : "";
			const lockedAttr = locked ? ` data-locked="true"` : "";
			const itemClass = locked ? "xoji-tree__item xoji-tree__item--locked" : "xoji-tree__item";
			return `<li class="${itemClass}" role="treeitem"${expandedAttr} aria-selected="${String(selected)}"${disabledAttr}${lockedAttr} aria-level="${level}" data-value="${escapeAttr(value)}" tabindex="-1">${rowOpen}${twisty}${label}${rowClose}${group}</li>`;
		})
		.join("");
}

/**
 * The single source of a tree's shadow markup. The custom element renders it into
 * its shadow root at runtime; the `@xoji/astro` binding emits the same string into a
 * declarative shadow root at build. Both paths render one identical control from one
 * source — no per-binding reimplementation. Pure and DOM-free, so it is safe to
 * import in any environment (SSR included).
 */
export function treeMarkup(props: TreeMarkupProps): string {
	const items = props.items ?? [];
	const selectedValue = firstSelectedValue(items);
	const treeLabel = props.labelledby
		? ` aria-labelledby="${props.labelledby}"`
		: props.label
			? ` aria-label="${escapeAttr(props.label)}"`
			: "";
	return `<ul class="${treeClass(props)}" part="tree" role="tree"${treeLabel}>${buildNodes(items, 1, selectedValue)}</ul>`;
}
