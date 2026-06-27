export const linkCss = `
[data-link] { display: contents; }
.xoji-link {
	display: inline;
	font-family: var(--font-sans);
	color: var(--link);
	text-decoration: underline;
	text-decoration-thickness: var(--border-thin);
	text-underline-offset: var(--space-1);
	border-radius: var(--radius-sm);
	transition:
		color var(--duration-fast) var(--ease-standard),
		text-decoration-color var(--duration-fast) var(--ease-standard);
}
.xoji-link:hover {
	color: var(--link-hover);
}
.xoji-link:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-normal) var(--ring);
}
.xoji-link--muted {
	color: var(--fg-2);
	text-decoration-color: transparent;
}
.xoji-link--muted:hover {
	color: var(--link);
	text-decoration-color: currentColor;
}
.xoji-link--quiet {
	color: var(--fg-3);
	text-decoration: none;
}
.xoji-link--quiet:hover {
	color: var(--fg-2);
	text-decoration: underline;
	text-decoration-thickness: var(--border-thin);
	text-underline-offset: var(--space-1);
}
.xoji-link__external-icon {
	display: inline-block;
	width: 0.85em;
	height: 0.85em;
	margin-inline-start: var(--space-1);
	vertical-align: baseline;
	flex: none;
}
.xoji-link__sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	overflow: hidden;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	white-space: nowrap;
	border: 0;
}
`.trim();
