import type { ComponentManifest } from "./types.js";

const htmlExample = `<xoji-tree label="Documentation"></xoji-tree>

<script>
	document.querySelector("xoji-tree").items = [
		{
			label: "Guides",
			expanded: true,
			children: [
				{ label: "Getting started", href: "/guides/start", selected: true },
				{ label: "Theming", href: "/guides/theming" },
			],
		},
		{
			label: "Reference",
			children: [{ label: "Engine", href: "/reference/engine" }],
		},
	];
</script>`;

const svelteExample = `<script lang="ts">
	import { Tree } from "@xoji/svelte";

	const items = [
		{
			label: "Guides",
			expanded: true,
			children: [
				{ label: "Getting started", href: "/guides/start", selected: true },
				{ label: "Theming", href: "/guides/theming" },
			],
		},
		{ label: "Reference", children: [{ label: "Engine", href: "/reference/engine" }] },
	];
</script>

<Tree label="Documentation" {items} onselect={(e) => console.log(e.detail.value)} />`;

const astroExample = `---
import { Tree } from "@xoji/astro";

const items = [
	{
		label: "Guides",
		expanded: true,
		children: [
			{ label: "Getting started", href: "/guides/start", selected: true },
			{ label: "Theming", href: "/guides/theming" },
		],
	},
	{ label: "Reference", children: [{ label: "Engine", href: "/reference/engine" }] },
];
---

<Tree label="Documentation" items={items} />`;

export const treeManifest: ComponentManifest = {
	id: "tree",
	name: "Tree",
	category: "navigation",
	summary: "A hierarchical, keyboard-navigable list of expandable nodes built from a data array.",
	description:
		"Tree renders a nested hierarchy from an `items` array. Each node carries a `label`, an optional `value`, `href`, and `children`, plus flags for `expanded`, `selected`, and `disabled`. It builds the WAI-ARIA tree pattern: a `role=\"tree\"` with nested `role=\"group\"` levels and `role=\"treeitem\"` nodes carrying `aria-level`, `aria-expanded`, and `aria-selected`, with a single roving tab stop so the whole tree is one Tab stop and the arrow keys walk it. A twisty rotates on expand. A node with an `href` renders its row as a link whether or not it has children, so a branch can be both navigable and a group; the row navigates while the twisty (and Left/Right) work the children. A branch without an `href` is a pure container that toggles on click. Being data-driven keeps it robust across the bindings and a natural fit for a file or navigation tree. Three sizes (`sm`, `md`, `lg`) scale the row density.",
	bindings: ["html", "svelte", "astro"],
	anatomy: [
		{
			name: "tree",
			description: "The `role=\"tree\"` root list holding the top-level nodes.",
			selector: ".xoji-tree",
			tokens: ["--font-sans", "--text-sm", "--fg-1"],
		},
		{
			name: "row",
			description: "A node's clickable row, indented by its level; a `<div>`, or an `<a>` when the node has an `href`.",
			selector: ".xoji-tree__row",
			tokens: [
				"--space-1",
				"--space-2",
				"--space-4",
				"--radius-sm",
				"--fg-0",
				"--fg-2",
				"--state-hover",
				"--accent-bg",
				"--accent-text",
				"--weight-medium",
				"--border-normal",
				"--border-thick",
				"--ring",
				"--fg-disabled",
				"--duration-fast",
				"--ease-standard",
			],
		},
		{
			name: "twisty",
			description: "The disclosure caret on parent nodes; rotates 90° when the node is expanded, hidden on leaves.",
			selector: ".xoji-tree__twisty",
			tokens: ["--fg-3", "--duration-fast", "--ease-standard"],
		},
		{
			name: "group",
			description: "A nested `role=\"group\"` list of child nodes; `hidden` when its parent is collapsed.",
			selector: ".xoji-tree__group",
			tokens: [],
		},
	],
	props: [
		{ name: "items", type: "TreeNode[]", description: "The node hierarchy. Each `TreeNode` has a `label` and optional `value`, `href`, `children`, `expanded`, `selected`, and `disabled`. Passed as a property in the bindings (serialized to JSON for the element).", bindings: ["html", "svelte", "astro"] },
		{ name: "size", type: "Size", default: "md", description: "Row density: `sm`, `md`, or `lg`.", bindings: ["html", "svelte", "astro"], options: ["sm", "md", "lg"] },
		{ name: "label", type: "string", description: "Accessible name for the tree, applied as `aria-label`.", bindings: ["html", "svelte", "astro"] },
		{ name: "labelledby", type: "string", description: "Id of an external element naming the tree; takes precedence over `label`.", bindings: ["html", "svelte", "astro"] },
	],
	variants: [],
	sizes: [
		{ name: "sm", description: "Compact rows.", className: "xoji-tree--sm" },
		{ name: "md", description: "Default.", className: "xoji-tree", isDefault: true },
		{ name: "lg", description: "Roomy rows.", className: "xoji-tree--lg" },
	],
	states: [
		{
			name: "selected",
			description: "The chosen node: its row takes the accent background and text. When the theme's `--selection-cue` resolves to `marker` (a high-contrast or redundant-cues algorithm), a non-color check glyph is added so selection never rests on color alone.",
			selector: ".xoji-tree__item[aria-selected=\"true\"] > .xoji-tree__row",
			tokens: ["--accent-bg", "--accent-text", "--selection-cue", "--weight-medium"],
		},
		{
			name: "row-hover",
			description: "Pointer over a row: the hover tint.",
			selector: ".xoji-tree__row:hover",
			tokens: ["--state-hover", "--fg-0"],
		},
		{
			name: "expanded",
			description: "An open parent: the twisty rotates and the child group shows.",
			selector: ".xoji-tree__item[aria-expanded=\"true\"]",
			tokens: [],
		},
		{
			name: "focus-visible",
			description: "Keyboard focus on a node: an inset token ring on its row.",
			selector: ".xoji-tree__item:focus-visible > .xoji-tree__row",
			tokens: ["--border-normal", "--border-thick", "--ring"],
		},
		{
			name: "disabled",
			description: "A locked node: muted and non-interactive.",
			selector: ".xoji-tree__item[aria-disabled=\"true\"] > .xoji-tree__row",
			tokens: ["--fg-disabled"],
		},
	],
	slots: [],
	consumedTokens: [
		"--font-sans",
		"--text-sm",
		"--text-body",
		"--fg-0",
		"--fg-1",
		"--fg-2",
		"--fg-3",
		"--fg-disabled",
		"--accent-bg",
		"--accent-text",
		"--selection-cue",
		"--weight-medium",
		"--state-hover",
		"--ring",
		"--border-normal",
		"--border-thick",
		"--radius-sm",
		"--space-1",
		"--space-2",
		"--space-4",
		"--duration-fast",
		"--ease-standard",
	],
	composition: [
		"Feed it a `value` per node and listen for the `select` event to drive a detail pane or route.",
		"Give leaf nodes an `href` to render them as links: the natural shape for a docs or file-navigation sidebar.",
		"For a flat set of collapsible sections rather than a hierarchy, reach for Accordion instead.",
	],
	a11y: [
		"Builds the WAI-ARIA tree pattern: a `role=\"tree\"` containing `role=\"treeitem\"` nodes and nested `role=\"group\"` levels, each item carrying `aria-level`, `aria-selected`, and (on parents) `aria-expanded`.",
		"A single roving tab stop makes the whole tree one Tab stop; Up/Down move between visible nodes, Right expands or steps into a node, Left collapses or steps out to the parent, and Home/End jump to the first and last.",
		"Enter or Space activates a node: selecting it, toggling a parent, or following a leaf's link.",
		"A node marked `disabled` is announced and cannot be selected or toggled.",
		"Focus shows an inset token ring on the node's row plus a transparent outline the forced-colors base rule promotes to a real system outline.",
		"Selection carries a non-color channel on demand: when the theme sets `--selection-cue: marker`, the selected row gains a check glyph alongside the color, satisfying WCAG 1.4.1 (color is not the only differentiator). The algorithm decides. High-contrast emits `marker` by default, and any algorithm can opt in via the `cues` knob.",
	],
	examples: [
		{
			id: "docs-tree",
			title: "A documentation tree",
			description: "An expanded Guides branch with a selected page and links, beside a collapsed Reference branch.",
			source: { html: htmlExample, svelte: svelteExample, astro: astroExample },
		},
	],
};
