import {
	clampChroma,
	converter,
	formatHex,
	formatRgb,
	parse,
	wcagContrast,
	type Oklch,
} from "culori";

const toOklch = converter("oklch");

export interface OklchColor {
	l: number;
	c: number;
	h: number;
	alpha: number;
}

const DEFAULT_OKLCH: OklchColor = { l: 0, c: 0, h: 0, alpha: 1 };

export function toOklchColor(input: string | OklchColor): OklchColor {
	if (typeof input !== "string") return input;
	const parsed = parse(input);
	if (!parsed) throw new Error(`xoji: unparseable color "${input}"`);
	const o = toOklch(parsed) as Oklch | undefined;
	if (!o) throw new Error(`xoji: cannot convert color "${input}" to oklch`);
	return {
		l: clamp01(o.l ?? 0),
		c: Math.max(0, o.c ?? 0),
		h: o.h ?? 0,
		alpha: o.alpha ?? 1,
	};
}

export function oklch(l: number, c: number, h: number, alpha = 1): OklchColor {
	return { l: clamp01(l), c: Math.max(0, c), h: ((h % 360) + 360) % 360, alpha };
}

export function withLightness(color: OklchColor, l: number): OklchColor {
	return { ...color, l: clamp01(l) };
}

export function withAlpha(color: OklchColor, alpha: number): OklchColor {
	return { ...color, alpha: clamp01(alpha) };
}

export function rotateHue(color: OklchColor, deg: number): OklchColor {
	return { ...color, h: (((color.h + deg) % 360) + 360) % 360 };
}

/**
 * The signed shortest-path hue difference `to - from`, normalized to `(-180, 180]`.
 * Positive turns counter-clockwise on the OKLCH hue wheel; negative clockwise.
 */
export function hueDelta(from: number, to: number): number {
	let d = (((to - from) % 360) + 360) % 360;
	if (d > 180) d -= 360;
	return d;
}

export function lightness(input: string | OklchColor): number {
	return toOklchColor(input).l;
}

export function contrast(a: string | OklchColor, b: string | OklchColor): number {
	const value = wcagContrast(formatCss(a), formatCss(b));
	return value ?? 1;
}

export function clampToGamut(color: OklchColor): OklchColor {
	const mapped = clampChroma(
		{ mode: "oklch", l: color.l, c: color.c, h: color.h, alpha: color.alpha },
		"oklch",
		"rgb",
	) as Oklch;
	return {
		l: mapped.l ?? color.l,
		c: Math.max(0, mapped.c ?? 0),
		h: mapped.h ?? color.h,
		alpha: mapped.alpha ?? color.alpha,
	};
}

export function formatCss(input: string | OklchColor): string {
	const source = typeof input === "string" ? toOklchColor(input) : input;
	const color = clampToGamut(source);
	const culoriColor: Oklch = {
		mode: "oklch",
		l: color.l,
		c: color.c,
		h: color.h,
		alpha: color.alpha,
	};
	if (color.alpha < 1) {
		return formatRgb(culoriColor) ?? formatHex(culoriColor) ?? "#000000";
	}
	return formatHex(culoriColor) ?? "#000000";
}

export function schemeOf(bg: string | OklchColor): "dark" | "light" {
	return lightness(bg) < 0.5 ? "dark" : "light";
}

export function pickReadable(
	fill: string | OklchColor,
	options: Array<string | OklchColor>,
	floor = 4.5,
): string {
	let best = options[0] ?? DEFAULT_OKLCH;
	let bestContrast = -1;
	for (const option of options) {
		const ratio = contrast(fill, option);
		if (ratio >= floor) return formatCss(option);
		if (ratio > bestContrast) {
			bestContrast = ratio;
			best = option;
		}
	}
	return formatCss(best);
}

export function clamp01(value: number): number {
	if (Number.isNaN(value)) return 0;
	return Math.min(1, Math.max(0, value));
}
