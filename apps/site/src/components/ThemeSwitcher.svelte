<script lang="ts">
	import {
		listThemeDocs,
		activeThemeId,
		setActiveTheme,
		ACTIVE_CHANGED_EVENT,
	} from "../lib/theme-active.js";
	import type { ThemeDoc } from "../lib/theme-store/types.js";
	import { algorithmLabel } from "./bench/state.js";
	import ThemeThumb from "./bench/ThemeThumb.svelte";

	let themes = $state<ThemeDoc[]>([]);
	let activeId = $state<string | null>(null);
	let open = $state(false);
	let rootEl = $state<HTMLElement>();

	function refresh(): void {
		themes = listThemeDocs();
		activeId = activeThemeId();
	}

	$effect(() => {
		refresh();
		const onChange = (): void => refresh();
		window.addEventListener(ACTIVE_CHANGED_EVENT, onChange);
		return () => window.removeEventListener(ACTIVE_CHANGED_EVENT, onChange);
	});

	$effect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent): void => {
			if (rootEl && !rootEl.contains(e.target as Node)) open = false;
		};
		const onKeydown = (e: KeyboardEvent): void => {
			if (e.key === "Escape") {
				e.preventDefault();
				open = false;
			}
		};
		window.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("keydown", onKeydown);
		return () => {
			window.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("keydown", onKeydown);
		};
	});

	const activeName = $derived(
		themes.find((doc) => doc.id === activeId)?.meta.name ?? "Default",
	);

	function toggle(): void {
		if (!open) refresh();
		open = !open;
	}

	function pick(id: string | null): void {
		setActiveTheme(id);
		activeId = id;
		open = false;
	}

</script>

<div class="theme-switch" bind:this={rootEl}>
	<button
		type="button"
		class="theme-switch__trigger"
		aria-haspopup="true"
		aria-expanded={open}
		aria-label="Active theme"
		onclick={toggle}
	>
		<span class="theme-switch__current">{activeName}</span>
		<span class="theme-switch__caret" aria-hidden="true">▾</span>
	</button>

	{#if open}
		<div class="theme-switch__pop" role="menu" aria-label="Choose active theme">
			<div class="theme-switch__grid">
				<button
					type="button"
					class="theme-pick theme-pick--default"
					class:theme-pick--active={activeId === null}
					role="menuitemradio"
					aria-checked={activeId === null}
					onclick={() => pick(null)}
				>
					<span class="theme-pick__default-thumb" aria-hidden="true">Aa</span>
					<span class="theme-pick__meta">
						<span class="theme-pick__name">Default</span>
						<span class="theme-pick__badge">shipped</span>
					</span>
				</button>

				{#each themes as doc (doc.id)}
					<button
						type="button"
						class="theme-pick"
						class:theme-pick--active={activeId === doc.id}
						role="menuitemradio"
						aria-checked={activeId === doc.id}
						onclick={() => pick(doc.id)}
					>
						<ThemeThumb {doc} />
						<span class="theme-pick__meta">
							<span class="theme-pick__name" title={doc.meta.name}>{doc.meta.name}</span>
							<span class="theme-pick__badge">{algorithmLabel(doc.recipe.algorithm)}</span>
						</span>
					</button>
				{/each}
			</div>

			{#if themes.length === 0}
				<p class="theme-switch__empty">Build a theme in the Bench and it shows up here.</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.theme-switch {
		position: relative;
		display: inline-flex;
	}

	.theme-switch__trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font: inherit;
		font-size: var(--text-sm);
		color: var(--fg-1);
		background: var(--bg-2);
		border: var(--border-thin) solid var(--line);
		border-radius: var(--radius-md);
		padding: var(--space-1) var(--space-2) var(--space-1) var(--space-3);
		line-height: 1.2;
		cursor: pointer;
	}

	.theme-switch__trigger:hover {
		border-color: var(--line-strong, var(--accent));
	}

	.theme-switch__trigger:focus-visible {
		outline: var(--focus-ring, 2px solid var(--accent));
		outline-offset: 2px;
	}

	.theme-switch__current {
		max-width: 12rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.theme-switch__caret {
		font-size: var(--text-xs);
		color: var(--fg-2);
	}

	.theme-switch__pop {
		position: absolute;
		top: calc(100% + var(--space-2));
		right: 0;
		z-index: 50;
		width: min(24rem, 90vw);
		max-height: min(28rem, 70vh);
		overflow-y: auto;
		background: var(--surface-overlay, var(--bg-1));
		border: var(--border-thin) solid var(--surface-overlay-border, var(--line));
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg, 0 1.5rem 3rem rgba(0, 0, 0, 0.35));
		padding: var(--space-3);
	}

	.theme-switch__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: var(--space-3);
	}

	.theme-pick {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-1);
		background: transparent;
		border: var(--border-thin) solid transparent;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-align: left;
	}

	.theme-pick:hover {
		border-color: var(--line);
	}

	.theme-pick--active {
		border-color: var(--accent);
		box-shadow: 0 0 0 1px var(--accent);
	}

	.theme-pick__default-thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 16 / 10;
		border-radius: var(--radius-md);
		background: var(--bg-2);
		border: var(--border-thin) dashed var(--line);
		color: var(--fg-2);
		font-family: var(--font-display, var(--font-sans));
		font-size: var(--text-lg);
	}

	.theme-pick__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		min-width: 0;
	}

	.theme-pick__name {
		flex: 1;
		min-width: 0;
		font-size: var(--text-sm);
		font-weight: var(--weight-semibold);
		color: var(--fg-0);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.theme-pick__badge {
		flex: none;
		font-size: var(--text-xs);
		font-weight: var(--weight-semibold);
		color: var(--accent-text, var(--accent));
		background: var(--accent-bg, color-mix(in oklab, var(--accent) 14%, transparent));
		border-radius: var(--radius-pill, 999px);
		padding: 0.05rem var(--space-2);
	}

	.theme-switch__empty {
		margin: var(--space-3) 0 var(--space-1);
		color: var(--fg-2);
		font-size: var(--text-sm);
		text-align: center;
	}
</style>
