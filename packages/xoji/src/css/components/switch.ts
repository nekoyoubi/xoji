import { FULL_TONES } from "../../vocab.js";

const switchToneVars = FULL_TONES.map(
	(t) => `.xoji-switch--${t} { --switch-fill: var(--${t}); --switch-ink: var(--${t}-fg); }`,
).join("\n");

export const switchCss = `
.xoji-switch {
	--switch-fill: var(--accent);
	--switch-ink: var(--accent-fg);
	display: inline-flex;
	align-items: center;
	gap: var(--space-2);
	font-family: var(--font-sans);
	font-size: var(--text-body);
	line-height: var(--leading-tight);
	color: var(--fg-0);
}
.xoji-switch__track {
	--track-h: var(--space-5);
	--track-w: var(--space-7);
	--thumb: calc(var(--track-h) - var(--space-2));
	appearance: none;
	flex: none;
	width: var(--track-w);
	height: var(--track-h);
	padding: 0;
	border: var(--border-thin) solid var(--line-2);
	border-radius: var(--radius-full);
	background: var(--neutral-bg);
	cursor: pointer;
	position: relative;
	isolation: isolate;
	transition:
		background-color var(--duration-base) var(--ease-emphasized),
		border-color var(--duration-base) var(--ease-emphasized),
		box-shadow var(--duration-fast) var(--ease-standard);
}
.xoji-switch__track::after {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: inherit;
	background: transparent;
	transition: background-color var(--duration-fast) var(--ease-standard);
	z-index: -1;
}
.xoji-switch__thumb {
	position: absolute;
	top: 50%;
	left: var(--space-1);
	transform: translateY(-50%);
	width: var(--thumb);
	height: var(--thumb);
	border-radius: var(--radius-full);
	background: var(--switch-ink);
	background: oklch(from var(--switch-fill) calc(l - 0.28) c h);
	box-shadow: var(--elevation-1);
	transition:
		left var(--duration-base) var(--ease-emphasized),
		top var(--duration-base) var(--ease-emphasized),
		background-color var(--duration-base) var(--ease-emphasized);
}
.xoji-switch--sm .xoji-switch__track {
	--track-h: var(--space-4);
	--track-w: var(--space-6);
}
.xoji-switch__track[aria-checked="true"] {
	background: var(--switch-fill);
	border-color: var(--switch-fill);
}
.xoji-switch__track[aria-checked="true"] .xoji-switch__thumb {
	left: calc(100% - var(--thumb) - var(--space-1));
}
.xoji-switch__track:hover::after { background: var(--state-hover); }
.xoji-switch__track:active::after { background: var(--state-press); }
.xoji-switch__track:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
.xoji-switch__label {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
}
.xoji-switch__state {
	color: var(--fg-2);
	font-size: var(--text-sm);
}
.xoji-switch--disabled {
	color: var(--fg-disabled);
}
.xoji-switch__track:disabled,
.xoji-switch__track[aria-disabled="true"] {
	cursor: not-allowed;
	background: var(--state-disabled);
	border-color: transparent;
}
.xoji-switch__track:disabled .xoji-switch__thumb,
.xoji-switch__track[aria-disabled="true"] .xoji-switch__thumb {
	background: var(--fg-disabled);
	box-shadow: none;
}
.xoji-switch__track:disabled::after,
.xoji-switch__track[aria-disabled="true"]::after { background: transparent; }
.xoji-switch--disabled .xoji-switch__label,
.xoji-switch--disabled .xoji-switch__state {
	cursor: not-allowed;
}
.xoji-switch--label-end {
	flex-direction: row-reverse;
}
.xoji-switch--square .xoji-switch__track,
.xoji-switch--square .xoji-switch__thumb {
	border-radius: var(--radius-sm);
}
/* Reverse the on/off direction (polarity); the label is unaffected. Horizontal only —
 * vertical reverse is handled in the vertical block below. */
.xoji-switch--reverse:not(.xoji-switch--vertical) .xoji-switch__thumb {
	left: calc(100% - var(--thumb) - var(--space-1));
}
.xoji-switch--reverse:not(.xoji-switch--vertical) .xoji-switch__track[aria-checked="true"] .xoji-switch__thumb {
	left: var(--space-1);
}
.xoji-switch--vertical .xoji-switch__track {
	width: var(--track-h);
	height: var(--track-w);
}
/* Vertical default follows a wall switch: down = off, up = on. */
.xoji-switch--vertical .xoji-switch__thumb {
	top: calc(100% - var(--thumb) - var(--space-1));
	left: 50%;
	transform: translateX(-50%);
}
.xoji-switch--vertical .xoji-switch__track[aria-checked="true"] .xoji-switch__thumb {
	top: var(--space-1);
	left: 50%;
}
/* Vertical reversed: up = off, down = on. */
.xoji-switch--vertical.xoji-switch--reverse .xoji-switch__thumb {
	top: var(--space-1);
}
.xoji-switch--vertical.xoji-switch--reverse .xoji-switch__track[aria-checked="true"] .xoji-switch__thumb {
	top: calc(100% - var(--thumb) - var(--space-1));
}
${switchToneVars}
`.trim();
