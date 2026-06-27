export const selectCss = `
.xoji-select {
	display: flex;
	flex-direction: column;
	gap: var(--space-1);
	font-family: var(--font-sans);
}
.xoji-select__label {
	font-size: var(--text-sm);
	font-weight: var(--weight-medium);
	color: var(--fg-1);
	line-height: var(--leading-normal);
}
.xoji-select__label[hidden] { display: none; }
.xoji-select__control {
	display: flex;
	align-items: center;
	position: relative;
}
.xoji-select__field {
	appearance: none;
	width: 100%;
	font-family: inherit;
	cursor: pointer;
	padding-right: var(--space-7);
}
.xoji-select__field::-ms-expand { display: none; }
.xoji-select__chevron {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	inset: 0 var(--space-3) 0 auto;
	width: 1em;
	color: var(--fg-2);
	pointer-events: none;
	transition: color var(--duration-fast) var(--ease-standard);
}
.xoji-select__field:focus-visible + .xoji-select__chevron {
	color: var(--accent);
}
.xoji-select--sm .xoji-select__field {
	font-size: var(--text-sm);
	padding-top: var(--space-1);
	padding-bottom: var(--space-1);
}
.xoji-select--lg .xoji-select__field {
	font-size: var(--text-lg);
	padding-top: var(--space-3);
	padding-bottom: var(--space-3);
}
.xoji-select--invalid .xoji-select__field {
	border-color: var(--danger);
}
.xoji-select--invalid .xoji-select__field:focus-visible {
	border-color: var(--danger);
	box-shadow: 0 0 0 var(--border-normal) var(--danger-bg);
}
.xoji-select--invalid .xoji-select__chevron {
	color: var(--danger);
}
.xoji-select__field:disabled {
	cursor: not-allowed;
}
.xoji-select__field:disabled + .xoji-select__chevron {
	color: var(--fg-disabled);
}
.xoji-select__error {
	font-size: var(--text-sm);
	line-height: var(--leading-normal);
	color: var(--danger-text);
}
.xoji-select__error[hidden] { display: none; }
`.trim();
