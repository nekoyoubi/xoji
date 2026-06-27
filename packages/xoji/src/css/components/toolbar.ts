export const toolbarCss = `
[data-toolbar] { display: contents; }
.xoji-toolbar {
	display: flex;
	align-items: center;
	gap: var(--space-3);
	padding: var(--space-2) var(--space-4);
	font-family: var(--font-sans);
	color: var(--fg-1);
	background: var(--bg-1);
	border-bottom: var(--border-thin) solid var(--line);
	min-height: var(--space-8);
}
.xoji-toolbar--bare {
	background: transparent;
	border-bottom-color: transparent;
}
.xoji-toolbar--sm {
	gap: var(--space-2);
	padding: var(--space-1) var(--space-3);
	min-height: var(--space-7);
}
.xoji-toolbar--lg {
	gap: var(--space-4);
	padding: var(--space-3) var(--space-5);
	min-height: var(--space-8);
}
.xoji-toolbar--sticky {
	position: sticky;
	top: 0;
	z-index: var(--elevation-3);
}
.xoji-toolbar__title {
	font-family: var(--font-display);
	font-weight: var(--weight-bold);
	font-size: var(--text-lg);
	line-height: var(--leading-tight);
	color: var(--fg-0);
	text-decoration: none;
	white-space: nowrap;
}
a.xoji-toolbar__title {
	border-radius: var(--radius-sm);
}
a.xoji-toolbar__title:hover {
	color: var(--link-hover);
}
a.xoji-toolbar__title:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-toolbar__group {
	display: flex;
	align-items: center;
	gap: var(--space-2);
	min-width: 0;
}
.xoji-toolbar__group--start { justify-content: flex-start; }
.xoji-toolbar__group--center {
	justify-content: center;
	flex: 1;
}
.xoji-toolbar__group--end {
	justify-content: flex-end;
	margin-left: auto;
}
.xoji-toolbar__spacer { flex: 1; }
`.trim();
