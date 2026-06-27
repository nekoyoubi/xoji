export const appShellCss = `
.xoji-app {
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-columns: minmax(0, 1fr);
	height: 100dvh;
	background: var(--body-bg);
	color: var(--fg-0);
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-normal);
	overflow: hidden;
}
.xoji-app__body {
	--xoji-app-left: auto;
	--xoji-app-right: auto;
	display: grid;
	grid-template-columns: var(--xoji-app-left) auto minmax(0, 1fr) var(--xoji-app-right);
	min-width: 0;
	min-height: 0;
	overflow: hidden;
	position: relative;
}
.xoji-app__body > slot[name="left"] {
	grid-column: 1;
}
.xoji-main {
	grid-column: 3;
	min-width: 0;
	overflow-y: auto;
	padding: var(--space-5);
}
.xoji-app__body > slot[name="right"] {
	grid-column: 4;
}
.xoji-main:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: inset 0 0 0 var(--border-thick) var(--ring);
}
.xoji-app__skip-link {
	position: absolute;
	top: var(--space-2);
	left: var(--space-2);
	z-index: 100;
	font-family: var(--font-sans);
	font-size: var(--text-sm);
	font-weight: var(--weight-medium);
	line-height: var(--leading-tight);
	color: var(--accent-fg);
	background: var(--accent);
	border: var(--border-thin) solid transparent;
	border-radius: var(--radius-md);
	padding: var(--space-2) var(--space-3);
	text-decoration: none;
	transform: translateY(calc(-100% - var(--space-4)));
	transition: transform var(--duration-fast) var(--ease-standard);
}
.xoji-app__skip-link:focus-visible {
	transform: translateY(0);
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
@media (max-width: 900px) {
	.xoji-app {
		height: auto;
		min-height: 100dvh;
		overflow: visible;
	}
	.xoji-app__body {
		grid-template-columns: minmax(0, 1fr);
		overflow: visible;
	}
	.xoji-main {
		grid-column: 1;
		overflow: visible;
	}
	.xoji-app__body > slot[name="right"] {
		grid-column: 1;
	}
}
`.trim();
