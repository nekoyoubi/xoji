export const separatorCss = `
[data-separator] { display: contents; }
.xoji-separator {
	display: flex;
	align-items: center;
	border: 0;
	color: var(--fg-2);
	font-family: var(--font-sans);
	font-size: var(--text-xs);
	font-weight: var(--weight-medium);
	line-height: var(--leading-tight);
}
.xoji-separator:not(.xoji-separator--with-label) {
	background: var(--line);
	width: 100%;
	height: var(--border-thin);
}
.xoji-separator--thin:not(.xoji-separator--with-label) {
	background: var(--line-2);
}
.xoji-separator--vertical:not(.xoji-separator--with-label) {
	width: var(--border-thin);
	height: 100%;
	min-height: 1em;
}
.xoji-separator--with-label {
	gap: var(--space-3);
	width: 100%;
}
.xoji-separator--with-label::before,
.xoji-separator--with-label::after {
	content: "";
	flex: 1;
	height: var(--border-thin);
	background: var(--line);
}
.xoji-separator--with-label.xoji-separator--thin::before,
.xoji-separator--with-label.xoji-separator--thin::after {
	background: var(--line-2);
}
.xoji-separator--with-label.xoji-separator--vertical {
	flex-direction: column;
	gap: var(--space-2);
	width: auto;
	height: 100%;
	min-height: 1em;
}
.xoji-separator--with-label.xoji-separator--vertical::before,
.xoji-separator--with-label.xoji-separator--vertical::after {
	width: var(--border-thin);
	height: auto;
}
.xoji-separator__label {
	display: inline-flex;
	align-items: center;
	flex: none;
	white-space: nowrap;
}
`.trim();
