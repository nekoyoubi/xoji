<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { Size } from "@xoji/core";
	import type { TabItemData, TabsVariant, TabsActivation } from "@xoji/core/markup";

	interface Props {
		items?: TabItemData[];
		variant?: TabsVariant;
		size?: Size;
		activation?: TabsActivation;
		value?: string;
		label?: string;
		labelledby?: string;
		sticky?: boolean;
		onchange?: (value: string) => void;
		panel: Snippet<[string]>;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let {
		items = [],
		variant = "underline",
		size = "md",
		activation = "automatic",
		value = $bindable(),
		label,
		labelledby,
		sticky = false,
		onchange,
		panel,
		...rest
	}: Props = $props();

	function handleChange(event: Event) {
		// `xoji-tabs` dispatches `change` with `composed: true`, so a nested Tabs' change
		// bubbles up to an outer one. Only act on changes from this element, not descendants.
		if (event.target !== event.currentTarget) return;
		const next = (event as CustomEvent<{ value: string }>).detail?.value;
		if (next === undefined) return;
		value = next;
		onchange?.(next);
	}
</script>

<xoji-tabs
	{...rest}
	{variant}
	{size}
	{activation}
	{value}
	{label}
	sticky={sticky || undefined}
	labelledby={labelledby || undefined}
	onchange={handleChange}
>
	{#each items as tab, i (tab.value ?? i)}
		{@const key = tab.value ?? String(i)}
		<span slot="tab" value={key} disabled={tab.disabled || undefined}>{tab.label}</span>
		<div slot="panel">{@render panel(key)}</div>
	{/each}
</xoji-tabs>
