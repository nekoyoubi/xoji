<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { Size } from "@xoji/core";

	interface Props {
		label?: string;
		name?: string;
		placeholder?: string;
		value?: string;
		type?: string;
		size?: Size;
		disabled?: boolean;
		readonly?: boolean;
		invalid?: boolean;
		required?: boolean;
		clearable?: boolean;
		description?: string;
		error?: string;
		ariaLabel?: string;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		prefix?: Snippet;
		suffix?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		label = "",
		name,
		placeholder = "",
		value = $bindable(""),
		type = "text",
		size = "md",
		disabled = false,
		readonly = false,
		invalid = false,
		required = false,
		clearable = false,
		description = "",
		error = "",
		ariaLabel,
		oninput,
		onchange,
		prefix,
		suffix,
		...rest
	}: Props = $props();

	function handleInput(event: Event) {
		value = (event.target as HTMLElement & { value: string }).value;
		oninput?.(event);
	}
</script>

<xoji-field
	{...rest}
	{label}
	name={name || undefined}
	{placeholder}
	{value}
	{type}
	{size}
	disabled={disabled || undefined}
	readonly={readonly || undefined}
	invalid={invalid || undefined}
	required={required || undefined}
	clearable={clearable || undefined}
	{description}
	{error}
	aria-label={ariaLabel}
	oninput={handleInput}
	{onchange}
>
	{#if prefix}<span slot="prefix">{@render prefix()}</span>{/if}
	{#if suffix}<span slot="suffix">{@render suffix()}</span>{/if}
</xoji-field>
