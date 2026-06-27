import { FULL_TONES as TONES } from "../../vocab.js";

const checkedRules = TONES.map(
	(t) => `.xoji-checkbox--${t} .xoji-checkbox__control:checked,
.xoji-checkbox--${t}.xoji-checkbox--indeterminate .xoji-checkbox__control {
	background: var(--${t});
	border-color: var(--${t});
}
.xoji-checkbox--${t} .xoji-checkbox__indicator {
	color: var(--${t}-fg);
}`,
).join("\n");

export const checkboxCss = `
.xoji-checkbox {
	--box: var(--space-5);
	display: inline-flex;
	align-items: flex-start;
	gap: var(--space-2);
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-normal);
	color: var(--fg-0);
	cursor: pointer;
}
.xoji-checkbox--sm {
	--box: var(--space-4);
	font-size: var(--text-sm);
	gap: var(--space-1);
}
.xoji-checkbox__box {
	position: relative;
	flex: none;
	width: var(--box);
	height: var(--box);
}
.xoji-checkbox__control {
	appearance: none;
	display: block;
	width: 100%;
	height: 100%;
	margin: 0;
	background: var(--field-bg);
	border: var(--border-thin) solid var(--field-border);
	border-radius: var(--radius-sm);
	cursor: inherit;
	transition:
		background-color var(--duration-fast) var(--ease-standard),
		border-color var(--duration-fast) var(--ease-standard),
		box-shadow var(--duration-fast) var(--ease-standard);
}
.xoji-checkbox__indicator {
	position: absolute;
	inset: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--accent-fg);
	pointer-events: none;
}
.xoji-checkbox__indicator svg {
	width: 100%;
	height: 100%;
}
.xoji-checkbox__check,
.xoji-checkbox__dash {
	opacity: 0;
	transition: opacity var(--duration-fast) var(--ease-standard);
}
.xoji-checkbox__control:checked,
.xoji-checkbox--indeterminate .xoji-checkbox__control {
	background: var(--accent);
	border-color: var(--accent);
}
${checkedRules}
.xoji-checkbox:not(.xoji-checkbox--indeterminate) .xoji-checkbox__control:checked ~ .xoji-checkbox__indicator .xoji-checkbox__check {
	opacity: 1;
}
.xoji-checkbox--indeterminate .xoji-checkbox__dash {
	opacity: 1;
}
.xoji-checkbox__control:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-normal) var(--ring);
}
.xoji-checkbox__label {
	display: inline-flex;
	min-height: var(--box);
	align-items: center;
}
.xoji-checkbox__control:disabled,
.xoji-checkbox__control[aria-disabled="true"] {
	cursor: not-allowed;
	background: var(--state-disabled);
	border-color: var(--field-border);
}
.xoji-checkbox__control:disabled:checked,
.xoji-checkbox__control[aria-disabled="true"]:checked,
.xoji-checkbox--indeterminate .xoji-checkbox__control:disabled {
	background: var(--state-disabled);
	border-color: var(--field-border);
}
.xoji-checkbox__control:disabled ~ .xoji-checkbox__indicator {
	color: var(--fg-disabled);
}
.xoji-checkbox:has(.xoji-checkbox__control:disabled),
.xoji-checkbox--disabled {
	cursor: not-allowed;
	color: var(--fg-disabled);
}
.xoji-checkbox-group {
	display: flex;
	flex-direction: column;
	gap: var(--space-2);
}
.xoji-checkbox-group__heading .xoji-checkbox__label {
	font-weight: var(--weight-semibold);
}
.xoji-checkbox-group__items {
	display: flex;
	flex-direction: column;
	gap: var(--space-2);
	padding-left: var(--space-6);
}
`.trim();
