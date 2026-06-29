/** An actionable menu row: a label, an optional value, and optional state/hint. */
export interface MenuAction {
	label: string;
	value?: string;
	disabled?: boolean;
	/** A trailing, muted, monospaced hint shown at the end of the row, e.g. an accelerator like `Ctrl+S`. Display-only; it is not part of the row's accessible name. */
	hint?: string;
}

/**
 * One entry in a menu's `items` array. An action row, a `{ separator: true }` divider, or a
 * `{ heading: string }` group label that opens a labeled section the following actions sit under.
 */
export type MenuItem = MenuAction | { separator: true } | { heading: string };

/** The host-layout rule for a menu — the one `:host` rule, shared by the element's `styles()` and the SSR declarative shadow root. */
export const menuHostCss = ":host { display: inline-block; }";
