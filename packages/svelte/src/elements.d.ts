import type { HTMLAttributes } from "svelte/elements";

type XojiAttributes<T extends EventTarget = HTMLElement> = HTMLAttributes<T>;

interface XojiButtonAttributes extends XojiAttributes {
	variant?: "accent" | "neutral" | "danger";
	size?: "sm" | "md" | "lg";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

interface XojiFieldAttributes extends XojiAttributes {
	label?: string;
	placeholder?: string;
	value?: string;
	type?: string;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	error?: string;
}

interface XojiCardAttributes extends XojiAttributes {
	overlay?: boolean;
}

interface XojiBadgeAttributes extends XojiAttributes {
	tone?: string;
}

interface XojiSwitchAttributes extends XojiAttributes {
	checked?: boolean;
	disabled?: boolean;
	label?: string;
	labelledby?: string;
}

interface XojiAlertAttributes extends XojiAttributes {
	tone?: "success" | "warn" | "danger" | "info";
}

interface XojiLinkAttributes extends XojiAttributes {
	href?: string;
	target?: string;
	rel?: string;
}

interface XojiCodeAttributes extends XojiAttributes {
	lang?: string;
	code?: string;
	preload?: boolean;
}

declare module "svelte/elements" {
	interface SvelteHTMLElements {
		"xoji-button": XojiButtonAttributes;
		"xoji-field": XojiFieldAttributes;
		"xoji-card": XojiCardAttributes;
		"xoji-badge": XojiBadgeAttributes;
		"xoji-switch": XojiSwitchAttributes;
		"xoji-alert": XojiAlertAttributes;
		"xoji-link": XojiLinkAttributes;
		"xoji-code": XojiCodeAttributes;
	}
}
