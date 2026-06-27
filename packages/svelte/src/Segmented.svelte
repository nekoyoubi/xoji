<script lang="ts">
	import "./register.js";
	import type { Size, FullTone as Tone } from "@xoji/core";

	interface Props {
		value?: string;
		options?: string;
		disabled?: boolean;
		size?: Size;
		tone?: Tone;
		label?: string;
		labelledby?: string;
		name?: string;
		onchange?: (event: Event) => void;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		value = $bindable(""),
		options,
		disabled = false,
		size = "md",
		tone = "accent",
		label,
		labelledby,
		name,
		onchange,
		...rest
	}: Props = $props();

	function handleChange(event: Event) {
		const host = event.currentTarget as HTMLElement & { value: string };
		value = host.value;
		onchange?.(event);
	}
</script>

<xoji-segmented
	{...rest}
	value={value || undefined}
	{options}
	disabled={disabled || undefined}
	{size}
	{tone}
	{label}
	labelledby={labelledby || undefined}
	{name}
	onchange={handleChange}
></xoji-segmented>
