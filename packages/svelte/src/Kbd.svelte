<script lang="ts">
	import "./register.js";
	import type { Snippet } from "svelte";

	type KbdSize = "sm" | "md" | "lg";

	interface Props {
		size?: KbdSize;
		children?: Snippet;
		/** Any other attribute (`title`, `id`, `data-*`, `aria-*`, …) passes through to the element. */
		[key: string]: unknown;
	}

	let { size = "md", children, ...rest }: Props = $props();
</script>

<xoji-kbd {...rest} {size}>
	{@render children?.()}
</xoji-kbd>
