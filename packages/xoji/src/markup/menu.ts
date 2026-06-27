import { escapeHtml, escapeAttr } from "./escape.js";

export type MenuItem =
	| { label: string; value?: string; disabled?: boolean; separator?: false }
	| { separator: true };

export interface MenuMarkupProps {
	items?: MenuItem[];
	label?: string | null;
	/** Stable id seed for the popover and the trigger's `aria-controls` wiring. */
	popupId: string;
}

/** The host-layout rule for a menu — the one `:host` rule, shared by the element's `styles()` and the SSR declarative shadow root. */
export const menuHostCss = ":host { display: inline-block; }";

export function menuClass(): string {
	return "xoji-menu";
}

function buildItems(items: MenuItem[]): string {
	return items
		.map((item) => {
			if (item.separator) {
				return `<div class="xoji-menu__separator" role="separator"></div>`;
			}
			const value = item.value ?? item.label;
			const disabled = item.disabled ?? false;
			const disabledAttr = disabled ? ` aria-disabled="true"` : "";
			return `<button type="button" class="xoji-menu__item" role="menuitem" tabindex="-1"${disabledAttr} data-value="${escapeAttr(value)}" data-label="${escapeAttr(item.label)}">${escapeHtml(item.label)}</button>`;
		})
		.join("");
}

/**
 * The single source of a menu's shadow markup. The custom element renders it into
 * its shadow root at runtime; the `@xoji/astro` binding emits the same string into a
 * declarative shadow root at build. Both paths render one identical control from one
 * source — no per-binding reimplementation. Pure and DOM-free, so it is safe to
 * import in any environment (SSR included).
 */
export function menuMarkup(props: MenuMarkupProps): string {
	const popupId = props.popupId;
	const label = props.label ?? "Menu";
	const trigger = `<button type="button" class="xoji-menu__trigger" part="trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="${popupId}" popovertarget="${popupId}">${escapeHtml(label)}</button>`;
	const popup = `<div class="xoji-menu__popup" part="popup" id="${popupId}" popover role="menu" aria-label="${escapeAttr(label)}">${buildItems(props.items ?? [])}</div>`;
	return `<span class="xoji-menu" part="menu">${trigger}${popup}</span>`;
}
