export const cardLinkCss = `
[data-card-link] { display: contents; }
.xoji-card-link {
	text-decoration: none;
}
.xoji-card-link:focus-visible {
	outline: var(--border-normal) solid transparent;
	box-shadow: 0 0 0 var(--border-thick) var(--ring);
}
`.trim();
