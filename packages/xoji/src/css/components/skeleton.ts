export const skeletonCss = `
[data-skeleton] { display: contents; }
.xoji-skeleton {
	display: block;
	position: relative;
	overflow: hidden;
	background: var(--bg-2);
	border-radius: var(--radius-md);
	background-image: linear-gradient(
		90deg,
		var(--bg-2) 0%,
		var(--bg-3) 50%,
		var(--bg-2) 100%
	);
	background-size: 200% 100%;
	background-repeat: no-repeat;
	animation: xoji-skeleton-shimmer var(--duration-slow) var(--ease-standard) infinite;
}
@keyframes xoji-skeleton-shimmer {
	from { background-position: 100% 0; }
	to { background-position: -100% 0; }
}
.xoji-skeleton--text {
	height: var(--text-body);
	border-radius: var(--radius-sm);
}
.xoji-skeleton--text.xoji-skeleton--sm { height: var(--text-sm); }
.xoji-skeleton--text.xoji-skeleton--lg { height: var(--text-lg); }
.xoji-skeleton--line {
	height: var(--border-thick);
	border-radius: var(--radius-full);
}
.xoji-skeleton--line.xoji-skeleton--sm { height: var(--border-normal); }
.xoji-skeleton--line.xoji-skeleton--lg { height: var(--space-1); }
.xoji-skeleton--block {
	height: var(--space-7);
	border-radius: var(--radius-md);
}
.xoji-skeleton--block.xoji-skeleton--sm { height: var(--space-6); }
.xoji-skeleton--block.xoji-skeleton--lg { height: var(--space-8); }
.xoji-skeleton--circle {
	width: var(--space-7);
	height: var(--space-7);
	aspect-ratio: 1;
	border-radius: var(--radius-full);
}
.xoji-skeleton--circle.xoji-skeleton--sm {
	width: var(--space-6);
	height: var(--space-6);
}
.xoji-skeleton--circle.xoji-skeleton--lg {
	width: var(--space-8);
	height: var(--space-8);
}
`.trim();
