import type { ComponentManifest } from "./types.js";

const htmlExample = `<xoji-kbd>Ctrl</xoji-kbd>
<xoji-kbd>K</xoji-kbd>

<xoji-kbd size="sm">Esc</xoji-kbd>
<xoji-kbd size="lg">Enter</xoji-kbd>`;

const svelteExample = `<script lang="ts">
	import { Kbd } from "@xoji/svelte";
</script>

<Kbd>Ctrl</Kbd>
<Kbd>K</Kbd>`;

const astroExample = `---
import Kbd from "@xoji/astro/Kbd.astro";
---

<Kbd>Ctrl</Kbd>
<Kbd>K</Kbd>`;

export const kbdManifest: ComponentManifest = {
	id: "kbd",
	name: "Kbd",
	category: "data-display",
	summary: "A keycap for the keys in a shortcut.",
	description:
		"Kbd renders a single key as a physical keycap: a mono-faced label on a raised surface, the depth read from a heavier bottom edge rather than a drop shadow, so it sits cleanly inline in running text. It carries no layout of its own: set a few side by side in a `Cluster` to spell a chord (`Ctrl` `+` `K`). Everything about its look is derived chrome: the surface, the edge, the radius all come from the same tokens the rest of the theme does, so a keycap matches the UI it documents. The `size` prop steps it with the surrounding type from `sm` to `lg`.",
	bindings: ["html", "svelte", "astro"],
	anatomy: [
		{
			name: "kbd",
			description: "The keycap root: a raised surface with a weighted bottom edge.",
			selector: ".xoji-kbd",
			tokens: ["--bg-2", "--fg-1", "--line-2", "--border-thick", "--radius-sm", "--font-mono"],
		},
	],
	props: [
		{
			name: "size",
			type: "KbdSize",
			default: "md",
			description: "The keycap size, stepping with the type scale: `sm`, `md`, or `lg`.",
			bindings: ["html", "svelte", "astro"],
			options: ["sm", "md", "lg"],
		},
	],
	variants: [],
	sizes: [
		{ name: "sm", description: "A compact keycap for dense inline hints.", className: "xoji-kbd--sm" },
		{ name: "md", description: "The default keycap, sized with body text.", className: "xoji-kbd", isDefault: true },
		{ name: "lg", description: "A prominent keycap for a featured shortcut.", className: "xoji-kbd--lg" },
	],
	states: [],
	slots: [
		{
			name: "default",
			description: "The key label: a glyph or short word like `K`, `Esc`, or `Enter`.",
			bindings: ["html", "svelte", "astro"],
		},
	],
	consumedTokens: [
		"--bg-2",
		"--fg-1",
		"--line-2",
		"--border-thin",
		"--border-thick",
		"--radius-sm",
		"--font-mono",
		"--text-sm",
		"--text-xs",
		"--text-lg",
		"--weight-medium",
		"--leading-tight",
	],
	composition: [
		"Spell a chord by setting keys in a `Cluster` with a small gap: `Ctrl` `+` `K`.",
		"Drop a Kbd inline in `Text` to name a shortcut mid-sentence. It sits on the baseline without breaking the line.",
		"Pair shortcuts with their actions in a `Table` or a `Stack` of `Cluster`s for a key map.",
	],
	a11y: [
		"Renders the semantic `<kbd>` element, so assistive tech announces the content as keyboard input.",
		"Keep the label the literal key name; the keycap styling is presentational and adds no meaning of its own.",
	],
	examples: [
		{
			id: "keys-and-sizes",
			title: "Keys and sizes",
			description: "Single keys and a chord, shown across the three sizes.",
			source: { html: htmlExample, svelte: svelteExample, astro: astroExample },
		},
	],
};
