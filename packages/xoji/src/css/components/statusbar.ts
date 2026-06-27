export const statusbarCss = `
[data-statusbar] { display: contents; }
.xoji-statusbar {
	display: flex;
	align-items: center;
	gap: var(--space-4);
	padding: var(--space-1) var(--space-4);
	background: var(--bg-1);
	border-top: var(--border-thin) solid var(--line);
	font-family: var(--font-mono);
	font-size: var(--text-xs);
	color: var(--fg-2);
	min-height: var(--space-6);
	overflow: hidden;
	min-width: 0;
}
.xoji-statusbar--wrap {
	flex-wrap: wrap;
	overflow: visible;
}
.xoji-statusbar--scroll {
	overflow-x: auto;
	overflow-y: hidden;
}
.xoji-statusbar--collapse {
	flex-wrap: nowrap;
}
xoji-statusbar[overflow="collapse"] .xoji-statusbar__item {
	flex-shrink: 0;
}
xoji-statusbar[separated] .xoji-statusbar__item {
	position: relative;
}
xoji-statusbar[separated] .xoji-statusbar__item::before {
	content: "";
	position: absolute;
	inset-inline-start: calc(-0.5 * var(--space-4));
	top: 50%;
	width: var(--border-thin);
	height: 1.1em;
	background: var(--line);
	transform: translateY(-50%);
	pointer-events: none;
}
xoji-statusbar[separated] .xoji-statusbar__item:first-child::before,
xoji-statusbar[separated] .xoji-statusbar__spacer + .xoji-statusbar__item::before,
xoji-statusbar[separated] .xoji-statusbar__item[data-rule-start]::before {
	display: none;
}
.xoji-statusbar__overflow {
	display: inline-flex;
	align-items: center;
	flex: 0 0 auto;
}
.xoji-statusbar__overflow-trigger {
	cursor: pointer;
	border: var(--border-thin) solid var(--surface-overlay-border);
	border-radius: var(--radius-sm);
	background: var(--bg-2);
	color: var(--fg-1);
	font-family: var(--font-mono);
	font-size: var(--text-xs);
	padding: 0 var(--space-1);
}
.xoji-statusbar__overflow-trigger:hover {
	color: var(--fg-0);
}
.xoji-statusbar__overflow-popover {
	position: fixed;
	margin: 0;
	inset: auto;
	box-sizing: border-box;
	flex-direction: column;
	gap: var(--space-2);
	min-width: var(--space-8);
	padding: var(--space-2);
	background: var(--surface-overlay);
	border: var(--border-thin) solid var(--surface-overlay-border);
	border-radius: var(--radius-md);
	box-shadow: var(--elevation-3);
	font-family: var(--font-mono);
	font-size: var(--text-xs);
	color: var(--fg-2);
}
.xoji-statusbar__overflow-popover:popover-open {
	display: flex;
}
.xoji-statusbar__overflow-item {
	display: inline-flex;
	align-items: center;
	gap: var(--space-1);
	white-space: nowrap;
}
.xoji-statusbar__item {
	display: inline-flex;
	align-items: center;
	gap: var(--space-1);
	white-space: nowrap;
	margin: 0;
	padding: 0;
	background: none;
	border: 0;
	font: inherit;
	color: inherit;
}
.xoji-statusbar__item--strong {
	color: var(--fg-0);
	font-weight: var(--weight-medium);
}
.xoji-statusbar__item:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
	border-radius: var(--radius-sm);
}
.xoji-statusbar__spacer {
	flex: 1;
	min-width: var(--space-2);
}
`.trim();
