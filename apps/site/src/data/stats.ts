import { listComponents, coverComponents, derive } from "@xoji/core";
import { resolveAlgorithm } from "@xoji/core/host";
import baseline from "./stats-baseline.json";

export const SITE_ANCHORS = { bg: "#0b0d12", fg: "#e6e9ef", accent: "#6ea8fe" } as const;
export const SITE_ALGORITHM = "xoji-default";
export const SITE_FONTS = {
	sans: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
	display: '"REM Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;
export const BINDINGS = ["html", "svelte", "astro"] as const;

export type Countable = "components" | "tokens" | "categories" | "bindings";

export interface SiteStats {
	components: number;
	tokens: number;
	categories: number;
	bindings: number;
	coverage: { covered: number; total: number; ok: boolean };
	algorithm: Awaited<ReturnType<typeof resolveAlgorithm>>;
	register: ReturnType<typeof derive>;
	baseline: { version: string } & Record<Countable, number>;
	delta(key: Countable): number;
}

export interface DisplayStat {
	/** The countable this stat reads, used for growth deltas. */
	key: Countable;
	label: string;
	value: number;
}

/** The canonical by-the-numbers list — one ordering and label set shared by the
 * components index, the homepage, and the statusbar so the three never drift. */
export function displayStats(s: SiteStats): DisplayStat[] {
	return [
		{ key: "components", label: "components", value: s.components },
		{ key: "categories", label: "categories", value: s.categories },
		{ key: "bindings", label: "libraries", value: s.bindings },
		{ key: "tokens", label: "tokens", value: s.tokens },
	];
}

let cached: SiteStats | null = null;

/** The site's single source of live numbers. Derives the canonical theme once, counts everything off it, and exposes growth deltas against the last release's snapshot. Every surface that quotes a stat reads from here so nothing goes stale. */
export async function getStats(): Promise<SiteStats> {
	if (cached) return cached;
	const algorithm = await resolveAlgorithm(SITE_ALGORITHM);
	const register = derive(algorithm, {
		constraints: { "--bg-0": SITE_ANCHORS.bg, "--fg-0": SITE_ANCHORS.fg, "--accent": SITE_ANCHORS.accent },
		knobs: { fonts: SITE_FONTS },
	});
	const components = listComponents();
	const cov = coverComponents(register);
	const covered = cov.filter((c) => c.covered).length;
	const live: Record<Countable, number> = {
		components: components.length,
		tokens: Object.keys(register).length,
		categories: new Set(components.map((c) => c.category)).size,
		bindings: BINDINGS.length,
	};
	cached = {
		...live,
		coverage: { covered, total: cov.length, ok: covered === cov.length },
		algorithm,
		register,
		baseline,
		delta: (key) => live[key] - baseline[key],
	};
	return cached;
}
