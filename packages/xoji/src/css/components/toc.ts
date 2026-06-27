export const tocCss = `
.xoji-toc {
	padding: var(--space-3) var(--space-2);
	border-left: var(--border-thin) solid var(--line);
}
.xoji-toc--sticky {
	position: sticky;
	top: var(--space-5);
	align-self: start;
}
.xoji-toc__label {
	display: block;
	font-family: var(--font-sans);
	font-size: var(--text-xs);
	font-weight: var(--weight-semibold);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--fg-2);
	padding: 0 var(--space-2);
	margin-bottom: var(--space-2);
}
.xoji-toc__list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 0.1rem;
}
.xoji-toc__link {
	display: block;
	font-family: var(--font-sans);
	font-size: var(--text-sm);
	color: var(--fg-2);
	padding: 0.25em 0.6em;
	border-left: var(--border-thick) solid transparent;
	margin-left: calc(-1 * var(--space-2) - var(--border-thin));
	text-decoration: none;
	transition:
		color var(--duration-fast) var(--ease-standard),
		border-color var(--duration-fast) var(--ease-standard);
}
.xoji-toc__link:hover {
	color: var(--fg-0);
}
.xoji-toc__link.is-active {
	color: var(--accent-text);
	border-left-color: var(--accent);
	font-weight: var(--weight-medium);
}
.xoji-toc__link:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
	border-radius: var(--radius-sm);
}
@media (max-width: 40rem) {
	.xoji-toc {
		border-left: none;
		border: var(--border-thin) solid var(--line);
		border-radius: var(--radius-md);
		background: var(--bg-1);
		padding: var(--space-3);
	}
	.xoji-toc__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1) var(--space-2);
	}
	.xoji-toc__link {
		border-left: none;
		margin-left: 0;
		border-radius: var(--radius-sm);
		padding: 0.2em 0.55em;
	}
	.xoji-toc__link.is-active {
		border-left: none;
		background: var(--accent-bg);
	}
}
`.trim();
