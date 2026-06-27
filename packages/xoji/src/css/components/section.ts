import { FULL_TONES } from "../../vocab.js";

const toneSurfaces = FULL_TONES.map(
	(t) => `.xoji-section--${t} { background: var(--${t}-bg); }`,
).join("\n");

const toneBorders = FULL_TONES.map(
	(t) => `.xoji-section--bordered.xoji-section--${t} { border-block: var(--border-thin) solid var(--${t}); }`,
).join("\n");

export const sectionCss = `
[data-section] { display: contents; }
.xoji-section {
	padding: var(--space-8) var(--space-5);
}
.xoji-section--none { padding: 0; }
.xoji-section--sm { padding: var(--space-5) var(--space-5); }
.xoji-section--md { padding: var(--space-6) var(--space-5); }
.xoji-section--quiet { background: var(--bg-1); }
${toneSurfaces}
.xoji-section--bordered.xoji-section--plain { border-block: var(--border-thin) solid var(--line); }
.xoji-section--bordered.xoji-section--quiet { border-block: var(--border-thin) solid var(--line); }
${toneBorders}
.xoji-section--stage {
	position: relative;
	background:
		linear-gradient(var(--accent-bg), var(--accent-bg)) padding-box,
		var(--bg-2);
	border: var(--border-thin) solid var(--accent);
	border-radius: var(--radius-lg);
	box-shadow:
		var(--elevation-3),
		0 0 0 var(--border-thin) var(--ring-bg);
	padding: var(--space-6);
}
.xoji-section__label {
	position: absolute;
	top: var(--space-2);
	right: var(--space-3);
	font-family: var(--font-mono);
	font-size: var(--text-xs);
	color: var(--accent-text);
	letter-spacing: 0.04em;
	text-transform: uppercase;
}
@media (max-width: 40rem) {
	.xoji-section:not(.xoji-section--stage) { padding: var(--space-6) var(--space-4); }
	.xoji-section--sm:not(.xoji-section--stage) { padding: var(--space-4) var(--space-4); }
	.xoji-section--md:not(.xoji-section--stage) { padding: var(--space-5) var(--space-4); }
}
`.trim();
