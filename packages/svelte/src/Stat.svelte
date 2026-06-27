<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";

	type StatTrend = "up" | "down" | "flat";
	type StatAlign = "start" | "center";
	type Size = "sm" | "md" | "lg";

	interface Props {
		label?: string;
		delta?: string;
		trend?: StatTrend;
		caption?: string;
		size?: Size;
		align?: StatAlign;
		inline?: boolean;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		label,
		delta,
		trend = "flat",
		caption,
		size = "md",
		align = "start",
		inline = false,
		children,
		...rest
	}: Props = $props();
</script>

<xoji-stat {...rest} {label} {delta} {trend} {caption} {size} {align} inline={inline || undefined}>
	{@render children?.()}
</xoji-stat>
