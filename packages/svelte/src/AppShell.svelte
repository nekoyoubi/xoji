<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";

	interface Props {
		skipLink?: string | boolean;
		leftSize?: number | string;
		rightSize?: number | string;
		toolbar?: Snippet;
		left?: Snippet;
		right?: Snippet;
		statusbar?: Snippet;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let { skipLink, leftSize, rightSize, toolbar, left, right, statusbar, children, ...rest }: Props = $props();

	const skipAttr = $derived(skipLink === true ? "" : skipLink || undefined);
	const railAttr = (v: number | string | undefined) =>
		v === undefined ? undefined : typeof v === "number" ? String(v) : v;
</script>

<xoji-app-shell {...rest} skip-link={skipAttr} left-size={railAttr(leftSize)} right-size={railAttr(rightSize)}>
	{#if toolbar}<div slot="toolbar">{@render toolbar()}</div>{/if}
	{#if left}<div slot="left">{@render left()}</div>{/if}
	{@render children?.()}
	{#if right}<div slot="right">{@render right()}</div>{/if}
	{#if statusbar}<div slot="statusbar">{@render statusbar()}</div>{/if}
</xoji-app-shell>
