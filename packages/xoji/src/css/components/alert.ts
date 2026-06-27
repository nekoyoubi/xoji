import { FULL_TONES as TONES } from "../../vocab.js";

const softRules = TONES.map(
	(t) => `.xoji-alert--soft.xoji-alert--${t} {
	background: var(--${t}-bg);
	color: var(--${t}-text);
	border-color: var(--${t});
}
.xoji-alert--soft.xoji-alert--${t} .xoji-alert__icon { color: var(--${t}); }`,
).join("\n");

const solidRules = TONES.map(
	(t) => `.xoji-alert--solid.xoji-alert--${t} {
	background: var(--${t});
	color: var(--${t}-fg);
	border-color: transparent;
}
.xoji-alert--solid.xoji-alert--${t} .xoji-alert__title { color: var(--${t}-fg); }
.xoji-alert--solid.xoji-alert--${t} .xoji-alert__icon { color: var(--${t}-fg); }`,
).join("\n");

export const alertCss = `
.xoji-alert {
	display: flex;
	gap: var(--space-3);
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-normal);
	border: var(--border-thin) solid transparent;
	border-radius: var(--radius-md);
	padding: var(--space-3) var(--space-4);
}
${softRules}
${solidRules}
.xoji-alert__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: none;
	width: 1em;
	height: 1em;
	font-size: var(--text-lg);
	margin-top: var(--space-0);
}
.xoji-alert--noicon .xoji-alert__icon { display: none; }
:host(:has([slot="icon"])) .xoji-alert__icon { display: inline-flex; }
.xoji-alert__body {
	display: flex;
	flex-direction: column;
	gap: var(--space-1);
	min-width: 0;
	flex: 1;
}
.xoji-alert__title {
	display: block;
	font-weight: var(--weight-semibold);
	font-size: var(--text-lg);
	line-height: var(--leading-tight);
	color: var(--fg-0);
}
.xoji-alert__message { display: block; }
.xoji-alert__actions {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-2);
	margin-top: var(--space-1);
}
.xoji-alert__dismiss {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: none;
	width: 1em;
	height: 1em;
	font-size: var(--text-lg);
	padding: var(--space-0);
	margin: calc(-1 * var(--space-1)) calc(-1 * var(--space-1)) auto auto;
	color: currentColor;
	background: transparent;
	border: var(--border-thin) solid transparent;
	border-radius: var(--radius-sm);
	cursor: pointer;
	position: relative;
	isolation: isolate;
	transition:
		background-color var(--duration-fast) var(--ease-standard),
		box-shadow var(--duration-fast) var(--ease-standard);
}
.xoji-alert__dismiss::after {
	content: "";
	position: absolute;
	inset: calc(-1 * var(--space-1));
	border-radius: inherit;
	background: transparent;
	transition: background-color var(--duration-fast) var(--ease-standard);
	z-index: -1;
}
.xoji-alert__dismiss:hover::after { background: var(--state-hover); }
.xoji-alert__dismiss:active::after { background: var(--state-press); }
.xoji-alert__dismiss:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
`.trim();
