<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { Size, FullTone } from "@xoji/core";

	interface BreadcrumbItem {
		label: string;
		href?: string;
		current?: boolean;
	}

	interface Props {
		items?: BreadcrumbItem[];
		separator?: string;
		tone?: FullTone;
		size?: Size;
		label?: string;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let { items, separator = "/", tone = "accent", size = "md", label = "Breadcrumb", children, ...rest }: Props = $props();

	const itemsAttr = $derived(items && items.length > 0 ? JSON.stringify(items) : undefined);
</script>

<xoji-breadcrumb {...rest} {tone} {size} {separator} {label} items={itemsAttr}>
	{@render children?.()}
</xoji-breadcrumb>
