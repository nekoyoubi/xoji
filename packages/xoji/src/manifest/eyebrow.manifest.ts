import type { ComponentManifest } from "./types.js";

const htmlExample = `<xoji-eyebrow>Themable-derivation engine</xoji-eyebrow>

<xoji-eyebrow tone="muted" tracking="wide">By the numbers</xoji-eyebrow>`;

const svelteExample = `<script lang="ts">
	import { Eyebrow } from "@xoji/svelte";
</script>

<Eyebrow>Themable-derivation engine</Eyebrow>

<Eyebrow tone="muted" tracking="wide">By the numbers</Eyebrow>`;

const astroExample = `---
import { Eyebrow } from "@xoji/astro";
---

<Eyebrow>Themable-derivation engine</Eyebrow>

<Eyebrow tone="muted" tracking="wide">By the numbers</Eyebrow>`;

export const eyebrowManifest: ComponentManifest = {
	id: "eyebrow",
	name: "Eyebrow",
	category: "layout",
	summary: "The small uppercase kicker that sits above a heading.",
	description:
		"Eyebrow is the overline a section wears above its title: short, uppercase, tracked-out, and accent-toned by default. It is one element with no layout of its own: drop it as the first child of a `Stack` and the gap does the spacing. `tone` swaps the accent ink for a quieter `muted` or `subtle`, and `tracking` widens the letter-spacing for a more deliberate label. Choose the `as` element to match the surrounding flow: a `p` for a standalone kicker, a `span` for one inline with other text.",
	bindings: ["html", "svelte", "astro"],
	anatomy: [
		{
			name: "eyebrow",
			description: "The kicker root carrying the tone and tracking classes.",
			selector: ".xoji-eyebrow",
			tokens: ["--font-sans", "--text-xs", "--weight-semibold", "--leading-tight", "--accent-text"],
		},
	],
	props: [
		{
			name: "as",
			type: "EyebrowTag",
			default: "p",
			description: "The element to render: a block `p`/`div` kicker or an inline `span`.",
			bindings: ["html", "svelte", "astro"],
			options: ["p", "span", "div"],
		},
		{
			name: "tone",
			type: "EyebrowTone",
			default: "accent",
			description: "The ink: accent by default, or a quieter `muted` / `subtle`.",
			bindings: ["html", "svelte", "astro"],
			options: ["accent", "muted", "subtle"],
		},
		{
			name: "tracking",
			type: "EyebrowTracking",
			default: "normal",
			description: "Letter-spacing: `normal` (0.08em) or `wide` (0.12em) for a more deliberate label.",
			bindings: ["html", "svelte", "astro"],
			options: ["normal", "wide"],
		},
	],
	variants: [],
	sizes: [],
	states: [],
	slots: [
		{
			name: "default",
			description: "The kicker text.",
			bindings: ["html", "svelte", "astro"],
		},
	],
	consumedTokens: [
		"--font-sans",
		"--text-xs",
		"--weight-semibold",
		"--leading-tight",
		"--accent-text",
		"--fg-2",
		"--fg-3",
	],
	composition: [
		"Lead a `Section` or a `Card` header with an Eyebrow, then a `Heading`, then `Text`: a three-step hierarchy with no bespoke CSS.",
		"Inside a gap-controlled `Stack`, the Eyebrow needs no margin; the stack's gap sets the rhythm.",
		"Use `tone=\"muted\"` where an accent kicker would compete with nearby accent color.",
	],
	a11y: [
		"An eyebrow is a visual label, not a heading. Keep the real `Heading` directly after it so the document outline stays correct.",
		"The uppercasing is presentational (`text-transform`); the accessible text keeps its authored casing for screen readers.",
	],
	examples: [
		{
			id: "tones-and-tracking",
			title: "Tones and tracking",
			description: "The accent default against the muted and subtle tones, at both tracking widths.",
			source: { html: htmlExample, svelte: svelteExample, astro: astroExample },
		},
	],
};
