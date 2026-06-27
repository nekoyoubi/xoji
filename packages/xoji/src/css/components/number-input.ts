export const numberInputCss = `
.xoji-number {
	display: inline-flex;
	flex-direction: column;
	gap: var(--space-2);
	font-family: var(--font-sans);
	color: var(--fg-0);
}
.xoji-number__label {
	color: var(--fg-1);
	font-size: var(--text-sm);
}
.xoji-number__control {
	display: inline-flex;
	align-items: stretch;
	border: var(--border-thin) solid var(--line-2);
	border-radius: var(--radius-md);
	background: var(--bg-0);
	overflow: hidden;
	transition:
		box-shadow var(--duration-fast) var(--ease-standard),
		border-color var(--duration-fast) var(--ease-standard);
}
.xoji-number__control:focus-within {
	border-color: var(--accent);
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-number__input {
	flex: 1;
	min-width: 4ch;
	width: 6ch;
	appearance: none;
	border: none;
	background: transparent;
	color: var(--fg-0);
	font: inherit;
	font-size: var(--text-body);
	text-align: center;
	padding: var(--space-2) var(--space-1);
	outline: none;
}
.xoji-number__step {
	flex: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: var(--space-6);
	border: none;
	background: var(--neutral-bg);
	color: var(--fg-1);
	font-size: var(--text-body);
	line-height: 1;
	cursor: pointer;
	user-select: none;
	transition: background-color var(--duration-fast) var(--ease-standard);
}
.xoji-number__step:hover {
	background: var(--state-hover);
}
.xoji-number__step:active {
	background: var(--state-press);
}
.xoji-number__step:disabled {
	cursor: not-allowed;
	color: var(--fg-disabled);
	background: var(--state-disabled);
}
.xoji-number--sm .xoji-number__input {
	padding: var(--space-1);
	font-size: var(--text-sm);
}
.xoji-number--sm .xoji-number__step {
	width: var(--space-5);
}
.xoji-number--lg .xoji-number__input {
	padding: var(--space-3) var(--space-2);
}
.xoji-number--lg .xoji-number__step {
	width: var(--space-7);
}
.xoji-number--disabled {
	color: var(--fg-disabled);
}
.xoji-number--disabled .xoji-number__control {
	background: var(--state-disabled);
	border-color: transparent;
}
.xoji-number--disabled .xoji-number__input {
	color: var(--fg-disabled);
}
`.trim();
