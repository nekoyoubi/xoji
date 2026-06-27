import type { ComponentManifest } from "./types.js";

const htmlExample = `<xoji-app-shell skip-link>
	<header slot="toolbar" class="xoji-toolbar">App title and global actions</header>
	<nav slot="left" class="xoji-panel">Primary navigation</nav>

	<h1>Page content</h1>
	<p>Everything in the default slot lands in the scrollable main column.</p>

	<aside slot="right" class="xoji-panel">Contextual details</aside>
	<footer slot="statusbar" class="xoji-statusbar">Ready</footer>
</xoji-app-shell>`;

const svelteExample = `<script lang="ts">
	import { AppShell } from "@xoji/svelte";
</script>

<AppShell skipLink>
	{#snippet toolbar()}
		<header class="xoji-toolbar">App title and global actions</header>
	{/snippet}
	{#snippet left()}
		<nav class="xoji-panel">Primary navigation</nav>
	{/snippet}

	<h1>Page content</h1>
	<p>Everything in the default slot lands in the scrollable main column.</p>

	{#snippet right()}
		<aside class="xoji-panel">Contextual details</aside>
	{/snippet}
	{#snippet statusbar()}
		<footer class="xoji-statusbar">Ready</footer>
	{/snippet}
</AppShell>`;

const astroExample = `---
import { AppShell } from "@xoji/astro";
---

<AppShell skipLink>
	<header slot="toolbar" class="xoji-toolbar">App title and global actions</header>
	<nav slot="left" class="xoji-panel">Primary navigation</nav>

	<h1>Page content</h1>
	<p>Everything in the default slot lands in the scrollable main column.</p>

	<aside slot="right" class="xoji-panel">Contextual details</aside>
	<footer slot="statusbar" class="xoji-statusbar">Ready</footer>
</AppShell>`;

export const appShellManifest: ComponentManifest = {
	id: "app-shell",
	name: "AppShell",
	category: "shell",
	summary: "The three-row application scaffold: toolbar over a left/main/right body over a status bar.",
	description:
		"AppShell is the outermost layout frame for a full-screen application. It establishes a three-row grid (a top toolbar, a flexible body, and a bottom status bar) where the body is itself a three-column grid of a left rail, a scrollable main column, and a right rail. Every region is an optional named slot, so the same scaffold collapses cleanly from a full IDE-style layout down to a bare main column. The main region is a real `<main>` landmark that owns the only scroll, keeping the chrome pinned. An optional skip link, hidden until focused, lets keyboard users jump straight past the chrome to the content. It carries no chrome of its own: the Astro and HTML bindings emit the same light-DOM structure, and the custom element is a transparent `display: contents` host that contributes nothing to the layout.",
	bindings: ["html", "svelte", "astro"],
	anatomy: [
		{
			name: "app",
			description: "The outer three-row grid filling the viewport, carrying the body background and base typography.",
			selector: ".xoji-app",
			tokens: [
				"--body-bg",
				"--fg-0",
				"--font-sans",
				"--text-body",
				"--leading-normal",
			],
		},
		{
			name: "body",
			description: "The middle row split into the left rail, the main column, and the right rail.",
			selector: ".xoji-app__body",
		},
		{
			name: "main",
			description: "The scrollable `<main>` landmark and skip-link target; takes the remaining space.",
			selector: ".xoji-main",
			tokens: ["--space-5"],
		},
		{
			name: "skip-link",
			description: "The keyboard-only jump link, off-screen until focused, sliding into the top-left when it is.",
			selector: ".xoji-app__skip-link",
			tokens: [
				"--font-sans",
				"--text-sm",
				"--weight-medium",
				"--leading-tight",
				"--accent",
				"--accent-fg",
				"--border-thin",
				"--radius-md",
				"--space-2",
				"--space-3",
				"--space-4",
				"--duration-fast",
				"--ease-standard",
			],
		},
	],
	props: [
		{
			name: "skipLink",
			type: "string | boolean",
			description:
				"Renders a skip link targeting the main region. `true` uses the default label; a string overrides it. The Astro binding also accepts a `skip-link` slot for richer content.",
			bindings: ["html", "svelte", "astro"],
		},
	],
	variants: [],
	sizes: [],
	states: [
		{
			name: "main-focus",
			description: "The main region after the skip link moves focus to it; an inset ring marks the landing.",
			selector: ".xoji-main:focus-visible",
			tokens: ["--border-normal", "--border-thick", "--ring"],
		},
		{
			name: "skip-link-focus",
			description: "The skip link revealed on keyboard focus, sliding into view with the standard ring.",
			selector: ".xoji-app__skip-link:focus-visible",
			tokens: ["--border-normal", "--border-thick", "--ring"],
		},
	],
	slots: [
		{
			name: "default",
			description: "The main content, rendered inside the scrollable `<main>` landmark.",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "toolbar",
			description: "The top row; typically a Toolbar with the app title and global actions.",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "left",
			description: "The left rail; typically navigation.",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "right",
			description: "The right rail; typically contextual detail.",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "statusbar",
			description: "The bottom row; typically a Statusbar.",
			bindings: ["html", "svelte", "astro"],
		},
		{
			name: "skip-link",
			description: "Custom content for the skip link (Astro only); falls back to a default label otherwise.",
			bindings: ["astro"],
		},
	],
	consumedTokens: [
		"--body-bg",
		"--fg-0",
		"--font-sans",
		"--text-body",
		"--text-sm",
		"--leading-normal",
		"--leading-tight",
		"--weight-medium",
		"--accent",
		"--accent-fg",
		"--border-thin",
		"--border-normal",
		"--border-thick",
		"--radius-md",
		"--ring",
		"--space-2",
		"--space-3",
		"--space-4",
		"--space-5",
		"--duration-fast",
		"--ease-standard",
	],
	composition: [
		"Fill the `toolbar` slot with Toolbar and the `statusbar` slot with Statusbar for the matching chrome.",
		"Use Panel in the `left` / `right` slots for collapsible rails.",
		"Mount one AppShell per application; nest layout components inside the main slot rather than nesting shells.",
	],
	a11y: [
		"The main content is a native `<main>` landmark, so assistive tech can jump to it directly.",
		"The optional skip link is the first focusable element and targets `#main` (which carries `tabindex=\"-1\"`), letting keyboard users bypass the chrome.",
		"The skip link is positioned off-screen and only slides into view on `:focus-visible`, so it stays out of the visual layout until needed.",
		"`<main>` receives a focus ring when the skip link moves focus to it, confirming the landing point.",
		"The custom element host is `display: contents`, so it adds no box and never disturbs the landmark or grid structure.",
	],
	examples: [
		{
			id: "full-scaffold",
			title: "Full application scaffold",
			description: "Toolbar, left and right rails, scrollable main, a status bar, and a skip link.",
			source: { html: htmlExample, svelte: svelteExample, astro: astroExample },
		},
	],
};
