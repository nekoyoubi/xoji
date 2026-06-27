export const dialogCss = `
.xoji-dialog {
	width: min(32rem, calc(100vw - var(--space-6)));
	max-width: calc(100vw - var(--space-6));
	max-height: calc(100vh - var(--space-6));
	padding: 0;
	margin: auto;
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-normal);
	color: var(--fg-0);
	background: var(--surface-overlay);
	border: var(--border-thin) solid var(--surface-overlay-border);
	border-radius: var(--radius-lg);
	box-shadow: var(--elevation-5);
	overflow: hidden;
}
.xoji-dialog[open] {
	display: flex;
	flex-direction: column;
}
.xoji-dialog::backdrop {
	background: var(--scrim);
}
.xoji-dialog--sm {
	width: min(24rem, calc(100vw - var(--space-6)));
}
.xoji-dialog--lg {
	width: min(48rem, calc(100vw - var(--space-5)));
	max-width: calc(100vw - var(--space-5));
}
.xoji-dialog__header {
	display: flex;
	align-items: flex-start;
	gap: var(--space-3);
	padding: var(--space-4) var(--space-5);
	border-bottom: var(--border-thin) solid var(--line);
}
.xoji-dialog__title {
	flex: 1;
	margin: 0;
	font-size: var(--text-lg);
	font-weight: var(--weight-semibold);
	line-height: var(--leading-tight);
	color: var(--fg-0);
}
.xoji-dialog__body {
	flex: 1;
	padding: var(--space-5);
	overflow-y: auto;
	color: var(--fg-1);
}
.xoji-dialog__footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--space-2);
	padding: var(--space-4) var(--space-5);
	border-top: var(--border-thin) solid var(--line);
}
.xoji-dialog__close {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.5em;
	height: 1.5em;
	flex: none;
	padding: 0;
	color: var(--fg-2);
	background: transparent;
	border: none;
	border-radius: var(--radius-sm);
	cursor: pointer;
	position: relative;
	isolation: isolate;
	transition:
		color var(--duration-fast) var(--ease-standard),
		box-shadow var(--duration-fast) var(--ease-standard);
}
.xoji-dialog__close::after {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: inherit;
	background: transparent;
	transition: background-color var(--duration-fast) var(--ease-standard);
	z-index: -1;
}
.xoji-dialog__close:hover {
	color: var(--fg-0);
}
.xoji-dialog__close:hover::after { background: var(--state-hover); }
.xoji-dialog__close:active::after { background: var(--state-press); }
.xoji-dialog__close:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-dialog__close svg {
	width: 1em;
	height: 1em;
}
`.trim();
