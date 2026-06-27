import { FULL_TONES as TONES } from "../../vocab.js";

const linearToneRules = TONES.map(
	(t) => `.xoji-progress--linear.xoji-progress--${t} .xoji-progress__indicator {
	background: var(--${t});
}`,
).join("\n");

const circularToneRules = TONES.map(
	(t) => `.xoji-progress--circular.xoji-progress--${t} .xoji-progress__indicator {
	stroke: var(--${t});
}`,
).join("\n");

const colorizeToneRules = TONES.map(
	(t) => `.xoji-progress--colorize-value.xoji-progress--${t} .xoji-progress__value {
	color: var(--${t});
}`,
).join("\n");

export const progressCss = `
[data-progress] { display: contents; }
.xoji-progress {
	display: inline-flex;
	align-items: center;
	font-family: var(--font-sans);
	color: var(--fg-1);
	vertical-align: middle;
}
.xoji-progress--linear {
	display: flex;
	width: 100%;
	gap: var(--space-2);
}
.xoji-progress__track {
	position: relative;
	overflow: hidden;
	flex: 1;
	height: var(--space-2);
	background: var(--neutral-bg);
	border-radius: var(--radius-full);
}
.xoji-progress--sm .xoji-progress__track {
	height: var(--space-1);
}
.xoji-progress--lg .xoji-progress__track {
	height: var(--space-3);
}
.xoji-progress--linear .xoji-progress__indicator {
	position: absolute;
	inset: 0 auto 0 0;
	width: 0%;
	background: var(--accent);
	border-radius: inherit;
	transition: width var(--duration-base) var(--ease-emphasized);
}
${linearToneRules}
.xoji-progress__value {
	flex: none;
	font-size: var(--text-sm);
	font-variant-numeric: tabular-nums;
	color: var(--fg-2);
}
.xoji-progress--sm .xoji-progress__value {
	font-size: var(--text-xs);
}
.xoji-progress--lg .xoji-progress__value {
	font-size: var(--text-body);
}
.xoji-progress--circular {
	display: inline-grid;
	place-items: center;
	width: var(--space-8);
	height: var(--space-8);
}
.xoji-progress--circular.xoji-progress--sm {
	width: var(--space-6);
	height: var(--space-6);
}
.xoji-progress--circular.xoji-progress--lg {
	width: calc(var(--space-8) + var(--space-3));
	height: calc(var(--space-8) + var(--space-3));
}
.xoji-progress__svg {
	grid-area: 1 / 1;
	width: 100%;
	height: 100%;
	transform: rotate(-90deg);
}
.xoji-progress__track-ring {
	fill: none;
	stroke: var(--neutral-bg);
}
.xoji-progress--circular .xoji-progress__indicator {
	fill: none;
	stroke: var(--accent);
	stroke-linecap: round;
	transition: stroke-dashoffset var(--duration-base) var(--ease-emphasized);
}
${circularToneRules}
.xoji-progress--circular .xoji-progress__value {
	grid-area: 1 / 1;
	font-size: 0.5625rem;
	line-height: 1;
	letter-spacing: -0.02em;
	font-variant-numeric: tabular-nums;
	color: var(--fg-1);
}
.xoji-progress--circular.xoji-progress--sm .xoji-progress__value {
	font-size: 0.5rem;
}
.xoji-progress--circular.xoji-progress--lg .xoji-progress__value {
	font-size: var(--text-sm);
}
${colorizeToneRules}
.xoji-progress--linear.xoji-progress--value-inset {
	position: relative;
}
.xoji-progress--linear.xoji-progress--value-inset .xoji-progress__track {
	min-height: var(--space-6);
}
.xoji-progress--linear.xoji-progress--value-inset .xoji-progress__value {
	position: absolute;
	inset: 0;
	display: grid;
	place-items: center;
	color: var(--fg-0);
	text-shadow: 0 0 2px var(--bg-0), 0 0 2px var(--bg-0), 0 0 3px var(--bg-0);
	pointer-events: none;
}
.xoji-progress--pulse-slow .xoji-progress__indicator {
	animation: xoji-progress-pulse 1.8s var(--ease-standard) infinite;
}
.xoji-progress--pulse-fast .xoji-progress__indicator {
	animation: xoji-progress-pulse 0.9s var(--ease-standard) infinite;
}
@media (prefers-reduced-motion: reduce) {
	.xoji-progress--pulse-slow .xoji-progress__indicator,
	.xoji-progress--pulse-fast .xoji-progress__indicator {
		animation: none;
	}
}
.xoji-progress--linear.xoji-progress--indeterminate .xoji-progress__indicator {
	width: 40%;
	transition: none;
	animation: xoji-progress-slide 2s var(--ease-standard) infinite;
}
.xoji-progress--circular.xoji-progress--indeterminate .xoji-progress__svg {
	animation: xoji-progress-spin 1s linear infinite;
}
.xoji-progress--circular.xoji-progress--indeterminate .xoji-progress__indicator {
	transition: none;
}
.xoji-progress:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
	border-radius: var(--radius-sm);
}
@keyframes xoji-progress-slide {
	0% { left: -40%; }
	100% { left: 100%; }
}
@keyframes xoji-progress-spin {
	from { transform: rotate(-90deg); }
	to { transform: rotate(270deg); }
}
@keyframes xoji-progress-pulse {
	50% { opacity: 0.4; }
}
`.trim();
