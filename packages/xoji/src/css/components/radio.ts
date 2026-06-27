import { FULL_TONES as TONES } from "../../vocab.js";

const checkedRules = TONES.map(
	(t) => `.xoji-radio--${t} .xoji-radio__control:checked ~ .xoji-radio__indicator {
	border-color: var(--${t});
	background: var(--${t});
}
.xoji-radio--${t} .xoji-radio__control:checked ~ .xoji-radio__indicator::after {
	background: var(--${t}-fg);
}`,
).join("\n");

export const radioCss = `
.xoji-radio {
	display: inline-flex;
	align-items: center;
	gap: var(--space-2);
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-normal);
	color: var(--fg-0);
	cursor: pointer;
	position: relative;
	isolation: isolate;
}
.xoji-radio__control {
	position: absolute;
	width: 1em;
	height: 1em;
	margin: 0;
	inset: 0;
	opacity: 0;
	cursor: inherit;
}
.xoji-radio__indicator {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: none;
	width: 1.15em;
	height: 1.15em;
	border: var(--border-normal) solid var(--field-border);
	border-radius: var(--radius-full);
	background: var(--field-bg);
	transition:
		background-color var(--duration-fast) var(--ease-standard),
		border-color var(--duration-fast) var(--ease-standard),
		box-shadow var(--duration-fast) var(--ease-standard);
}
.xoji-radio__indicator::after {
	content: "";
	width: 0.5em;
	height: 0.5em;
	border-radius: var(--radius-full);
	background: transparent;
	transform: scale(0);
	transition:
		transform var(--duration-fast) var(--ease-emphasized),
		background-color var(--duration-fast) var(--ease-standard);
}
.xoji-radio__label {
	display: inline-flex;
	align-items: center;
}
.xoji-radio--sm {
	font-size: var(--text-sm);
	gap: var(--space-1);
}
.xoji-radio--lg {
	font-size: var(--text-lg);
	gap: var(--space-3);
}
${checkedRules}
.xoji-radio__control:checked ~ .xoji-radio__indicator::after {
	transform: scale(1);
}
.xoji-radio:hover .xoji-radio__indicator {
	border-color: var(--line-2);
	background: var(--state-hover);
}
.xoji-radio__control:checked ~ .xoji-radio__indicator {
	background: var(--accent);
	border-color: var(--accent);
}
.xoji-radio__control:checked ~ .xoji-radio__indicator::after {
	background: var(--accent-fg);
}
.xoji-radio__control:focus-visible ~ .xoji-radio__indicator {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-radio--invalid .xoji-radio__indicator {
	border-color: var(--danger);
}
.xoji-radio__control:disabled ~ .xoji-radio__indicator {
	background: var(--state-disabled);
	border-color: var(--line);
}
.xoji-radio:has(.xoji-radio__control:disabled),
.xoji-radio[aria-disabled="true"] {
	cursor: not-allowed;
	color: var(--fg-disabled);
}
.xoji-radio__control:disabled:checked ~ .xoji-radio__indicator {
	background: var(--state-disabled);
	border-color: var(--line);
}
.xoji-radio__control:disabled:checked ~ .xoji-radio__indicator::after {
	background: var(--fg-disabled);
}
.xoji-radio-group {
	display: flex;
	flex-direction: column;
	gap: var(--space-2);
	font-family: var(--font-sans);
	border: 0;
	margin: 0;
	padding: 0;
	min-width: 0;
}
.xoji-radio-group--horizontal {
	flex-direction: row;
	flex-wrap: wrap;
	gap: var(--space-4);
	align-items: center;
}
.xoji-radio-group__label {
	font-size: var(--text-sm);
	font-weight: var(--weight-medium);
	color: var(--fg-1);
	line-height: var(--leading-normal);
	padding: 0;
}
.xoji-radio-group--horizontal .xoji-radio-group__label {
	flex: none;
}
`.trim();
