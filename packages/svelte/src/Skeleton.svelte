<script lang="ts">
	import "./register.js";
	import type { Size } from "@xoji/core";

	type SkeletonShape = "text" | "line" | "block" | "circle";

	interface Props {
		shape?: SkeletonShape;
		size?: Size;
		class?: string;
		style?: string;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let { shape = "text", size = "md", class: extra, style, ...rest }: Props = $props();
</script>

<xoji-skeleton {...rest} {shape} {size} class={extra} {style}></xoji-skeleton>
