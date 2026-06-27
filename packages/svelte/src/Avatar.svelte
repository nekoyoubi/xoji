<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { FullTone as BadgeTone, Tone } from "@xoji/core";

	type AvatarSize = "sm" | "md" | "lg" | "xl";
	type AvatarShape = "circle" | "square";

	interface Props {
		src?: string;
		alt?: string;
		tone?: BadgeTone;
		size?: AvatarSize;
		shape?: AvatarShape;
		status?: Tone;
		statusLabel?: string;
		icon?: Snippet;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		src,
		alt,
		tone = "neutral",
		size = "md",
		shape = "circle",
		status,
		statusLabel,
		icon,
		children,
		...rest
	}: Props = $props();
</script>

<xoji-avatar
	{...rest}
	{src}
	{alt}
	{tone}
	{size}
	{shape}
	{status}
	status-label={statusLabel}
>
	{#if icon}<span slot="icon">{@render icon()}</span>{/if}
	{@render children?.()}
</xoji-avatar>
