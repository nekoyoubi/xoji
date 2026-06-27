<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";
	import type { HeadingLevel, HeadingSize, HeadingTone } from "@xoji/core";

	interface Props {
		level?: HeadingLevel;
		size?: HeadingSize;
		tone?: HeadingTone;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let { level = 2, size, tone = "default", children, ...rest }: Props = $props();
</script>

<xoji-heading {...rest} level={level} {size} {tone}>
	{@render children?.()}
</xoji-heading>
