import type { ComponentManifest } from "./types.js";

const htmlExample = `<xoji-menu label="File"></xoji-menu>

<script>
	const menu = document.querySelector("xoji-menu");
	menu.items = [
		{ label: "New", value: "new" },
		{ label: "Open…", value: "open" },
		{ separator: true },
		{ label: "Save", value: "save" },
		{ label: "Save As…", value: "save-as", disabled: true },
		{ separator: true },
		{ label: "Close", value: "close" },
	];
	menu.addEventListener("select", (e) => console.log(e.detail));
</script>`;

const svelteExample = `<script lang="ts">
	import { Menu } from "@xoji/svelte";

	const items = [
		{ label: "New", value: "new" },
		{ label: "Open…", value: "open" },
		{ separator: true },
		{ label: "Save", value: "save" },
		{ label: "Save As…", value: "save-as", disabled: true },
		{ separator: true },
		{ label: "Close", value: "close" },
	];
</script>

<Menu label="File" {items} onselect={(e) => console.log(e.detail)} />`;

const astroExample = `---
import { Menu } from "@xoji/astro";

const items = [
	{ label: "New", value: "new" },
	{ label: "Open…", value: "open" },
	{ separator: true },
	{ label: "Save", value: "save" },
	{ label: "Save As…", value: "save-as", disabled: true },
	{ separator: true },
	{ label: "Close", value: "close" },
];
---

<Menu label="File" items={items} />`;

export const menuManifest: ComponentManifest = {
	id: "menu",
	name: "Menu",
	category: "overlay",
	summary: "A menu button: a trigger that opens an anchored popup list of actions.",
	description:
		"Menu is the app-menu shape: a labeled trigger (a File button, a kebab, a profile name) that opens a floating list of actions under it. It builds the WAI-ARIA menu button pattern: the trigger carries `aria-haspopup=\"menu\"` and `aria-expanded`, and the popup is a `role=\"menu\"` of `role=\"menuitem\"` actions with a single roving focus, so the keyboard walks it like a native menu. Like Tree, it is data-driven: an `items` array of `{ label, value?, disabled?, separator? }` drives the markup, and a `separator` item renders a `role=\"separator\"` divider rather than an action. The popup uses the native Popover API, so it renders in the top layer and escapes any clipping or stacking context an ancestor would otherwise impose, positioned under the trigger (and flipped up when there is no room below). Choosing an action fires a `select` event with the item's `value`, `label`, and `index` and closes the menu; the engine never navigates, the consumer decides what an action does. Its chrome (the overlay surface, the elevation, the accent-tinted active row) is derived, so a menu frames its actions in the theme's own voice.",
	bindings: ["html", "svelte", "astro"],
	anatomy: [
		{
			name: "menu",
			description: "The wrapper holding the trigger and its popover.",
			selector: ".xoji-menu",
		},
		{
			name: "trigger",
			description:
				"The menu button: carries `aria-haspopup`, `aria-expanded`, and the `popovertarget` that opens the popup.",
			selector: ".xoji-menu__trigger",
			tokens: [
				"--space-1",
				"--space-3",
				"--font-sans",
				"--text-sm",
				"--fg-1",
				"--fg-0",
				"--bg-1",
				"--border-thin",
				"--line",
				"--radius-md",
				"--state-hover",
				"--state-selected",
				"--ring",
				"--border-normal",
				"--border-thick",
				"--duration-fast",
				"--ease-standard",
			],
		},
		{
			name: "popup",
			description:
				"The `role=\"menu\"` floating surface, rendered in the top layer via the Popover API so it escapes ancestor clipping.",
			selector: ".xoji-menu__popup",
			tokens: [
				"--space-1",
				"--font-sans",
				"--text-sm",
				"--surface-overlay",
				"--surface-overlay-border",
				"--border-thin",
				"--radius-md",
				"--elevation-3",
			],
		},
		{
			name: "item",
			description: "An action: a `role=\"menuitem\"` button. Takes the accent tint on hover/focus.",
			selector: ".xoji-menu__item",
			tokens: [
				"--space-1",
				"--space-2",
				"--space-3",
				"--fg-1",
				"--fg-disabled",
				"--accent-bg",
				"--accent-text",
				"--radius-sm",
				"--duration-fast",
				"--ease-standard",
			],
		},
		{
			name: "separator",
			description: "A `role=\"separator\"` divider rendered for a `separator` item.",
			selector: ".xoji-menu__separator",
			tokens: ["--border-thin", "--line", "--space-1", "--space-2"],
		},
	],
	props: [
		{
			name: "items",
			type: "MenuItem[]",
			description:
				"The action list. Each `MenuItem` has a `label` and optional `value`, `disabled`, and `separator`. A `{ separator: true }` item renders a divider. Passed as a property in the bindings (serialized to JSON for the element).",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "label",
			type: "string",
			description: "The trigger text, also the popup's accessible name (e.g. \"File\").",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "open",
			type: "boolean",
			default: "false",
			description: "Reflects (and controls) whether the menu is open.",
			bindings: ["html", "svelte"],
		},
	],
	variants: [],
	sizes: [],
	states: [
		{
			name: "expanded",
			description: "The trigger while its menu is open. Takes the selected tint.",
			selector: '.xoji-menu__trigger[aria-expanded="true"]',
			tokens: ["--state-selected", "--fg-0"],
		},
		{
			name: "item-active",
			description: "The hovered or keyboard-focused action: the accent-tinted row.",
			selector: ".xoji-menu__item:hover, .xoji-menu__item:focus-visible",
			tokens: ["--accent-bg", "--accent-text"],
		},
		{
			name: "item-disabled",
			description: "A locked action: muted and non-interactive, skipped by arrow navigation.",
			selector: '.xoji-menu__item[aria-disabled="true"]',
			tokens: ["--fg-disabled"],
		},
	],
	slots: [],
	consumedTokens: [
		"--space-1",
		"--space-2",
		"--space-3",
		"--font-sans",
		"--text-sm",
		"--fg-0",
		"--fg-1",
		"--fg-disabled",
		"--bg-1",
		"--surface-overlay",
		"--surface-overlay-border",
		"--accent-bg",
		"--accent-text",
		"--line",
		"--state-hover",
		"--state-selected",
		"--ring",
		"--border-thin",
		"--border-normal",
		"--border-thick",
		"--radius-sm",
		"--radius-md",
		"--elevation-3",
		"--duration-fast",
		"--ease-standard",
	],
	composition: [
		"Drop one in a Toolbar to build a classic app menu bar: a File, Edit, View row of menu buttons.",
		"Use a kebab or gear `label` for a row-level or panel-level actions menu.",
		"Listen for `select` and switch on `detail.value` to run the chosen action; the menu closes itself.",
	],
	a11y: [
		"Builds the WAI-ARIA menu button pattern: the trigger carries `aria-haspopup=\"menu\"`, `aria-expanded`, and `aria-controls`; the popup is a `role=\"menu\"` of `role=\"menuitem\"` actions named by the trigger label.",
		"From the trigger, Enter / Space / Down open the menu and focus the first action; Up opens and focuses the last.",
		"In the menu, Up/Down move between enabled actions (wrapping), Home/End jump to the first/last, Enter/Space activates the focused action, Tab closes the menu, and Escape closes it and returns focus to the trigger.",
		"Disabled actions carry `aria-disabled` and are skipped by arrow navigation and not activatable.",
		"A single roving focus keeps the menu a coherent keyboard surface. Clicking outside closes it (the Popover API's light-dismiss); clicking an action activates it.",
	],
	examples: [
		{
			id: "file-menu",
			title: "A File menu",
			description: "A menu button opening a list with a disabled action and separators between groups.",
			source: { html: htmlExample, svelte: svelteExample, astro: astroExample },
		},
	],
};
