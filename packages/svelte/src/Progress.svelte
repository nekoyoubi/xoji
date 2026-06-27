<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { FullTone as Tone } from "@xoji/core";

	type ProgressVariant = "linear" | "circular";
	type ProgressSize = "sm" | "md";

	interface Props {
		variant?: ProgressVariant;
		tone?: Tone;
		size?: ProgressSize;
		value?: number;
		min?: number;
		max?: number;
		indeterminate?: boolean;
		showValue?: boolean;
		ariaLabel?: string;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		variant = "linear",
		tone = "accent",
		size = "md",
		value = 0,
		min = 0,
		max = 100,
		indeterminate = false,
		showValue = false,
		ariaLabel,
		children,
		...rest
	}: Props = $props();
</script>

<xoji-progress
	{...rest}
	{variant}
	{tone}
	{size}
	value={indeterminate ? undefined : value}
	{min}
	{max}
	indeterminate={indeterminate || undefined}
	show-value={showValue || undefined}
	aria-label={ariaLabel}
>
	{@render children?.()}
</xoji-progress>
