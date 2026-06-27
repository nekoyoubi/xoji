export const swatchCss = `
[data-swatch] { display: contents; }
.xoji-swatch {
	display: inline-flex;
	align-items: center;
	gap: 0.5em;
	min-width: 0;
	position: relative;
}
.xoji-swatch__dot {
	flex: none;
	width: 1em;
	height: 1em;
	border: var(--border-thin) solid var(--line-2);
	border-radius: var(--radius-sm);
}
.xoji-swatch__label {
	color: var(--fg-1);
	font-size: var(--text-sm);
	line-height: var(--leading-tight);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.xoji-swatch__value {
	color: var(--fg-2);
	font-family: var(--font-mono);
	font-size: var(--text-xs);
	line-height: var(--leading-tight);
	white-space: nowrap;
}
.xoji-swatch--sm { font-size: var(--text-xs); }
.xoji-swatch--lg { font-size: var(--text-lg); }
.xoji-swatch--interactive {
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;
	margin: 0;
	font: inherit;
	color: inherit;
	text-align: left;
	border-radius: var(--radius-sm);
}
.xoji-swatch--interactive:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-swatch--selected .xoji-swatch__dot {
	box-shadow:
		0 0 0 var(--border-thin) var(--bg-1),
		0 0 0 calc(var(--border-thin) + var(--border-thick)) var(--accent);
}
.xoji-swatch__details {
	position: absolute;
	z-index: 1;
	bottom: 100%;
	left: 0;
	margin-bottom: var(--space-2);
	display: grid;
	grid-template-columns: auto auto;
	gap: var(--space-1) var(--space-2);
	width: max-content;
	max-width: min(16rem, calc(100vw - var(--space-8)));
	padding: var(--space-1) var(--space-2);
	background: var(--surface-overlay);
	border: var(--border-thin) solid var(--surface-overlay-border);
	border-radius: var(--radius-md);
	box-shadow: var(--elevation-2);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity var(--duration-fast) var(--ease-standard),
		visibility var(--duration-fast) var(--ease-standard);
}
.xoji-swatch[data-details-below] .xoji-swatch__details {
	top: 100%;
	bottom: auto;
	margin-top: var(--space-2);
	margin-bottom: 0;
}
.xoji-swatch:hover .xoji-swatch__details,
.xoji-swatch:focus-within .xoji-swatch__details {
	opacity: 1;
	visibility: visible;
}
.xoji-swatch__detail-model,
.xoji-swatch__detail-value {
	font-size: var(--text-xs);
	line-height: var(--leading-tight);
}
.xoji-swatch__detail-model {
	color: var(--fg-2);
	font-family: var(--font-sans);
}
.xoji-swatch__detail-value {
	color: var(--fg-1);
	font-family: var(--font-mono);
	white-space: nowrap;
}
`.trim();
