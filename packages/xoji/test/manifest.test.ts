import { describe, expect, it } from "vitest";
import {
	coverComponent,
	coverComponents,
	declaredPropsInCss,
	derive,
	KEYWORD_DOMAINS,
	lintHostControls,
	lintManifest,
	lintStyleQueryDomains,
	listComponents,
	styleQueriedTokensInCss,
	styleQueryPairsInCss,
	tokensInCss,
	type ComponentManifest,
} from "../src/index.js";
import { declaredHostControls } from "../src/elements/host-controls.js";
import { xojiDefault } from "../src/batteries.js";

const register = derive(xojiDefault, { constraints: { "--bg-0": "#0f1115", "--accent": "#5b8cff" } });

function cssExportName(id: string): string {
	const camel = id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
	return `${camel}Css`;
}

const cssModules = import.meta.glob("../src/css/components/*.ts", { eager: true }) as Record<
	string,
	Record<string, unknown>
>;

async function loadCssModule(id: string): Promise<string> {
	const mod = cssModules[`../src/css/components/${id}.ts`];
	if (!mod) {
		throw new Error(`xoji: no css module found at ../src/css/components/${id}.ts`);
	}
	const css = mod[cssExportName(id)];
	if (typeof css !== "string") {
		throw new Error(
			`xoji: css module for "${id}" must export \`${cssExportName(id)}: string\``,
		);
	}
	return css;
}

describe("tokensInCss", () => {
	it("extracts every var(--…) name", () => {
		const css = ".x { color: var(--accent); background: var( --bg-0 ); border: var(--ring); }";
		const tokens = tokensInCss(css);
		expect([...tokens].sort()).toEqual(["--accent", "--bg-0", "--ring"]);
	});

	it("dedupes repeated tokens", () => {
		const css = "var(--accent) var(--accent) var(--accent)";
		expect(tokensInCss(css).size).toBe(1);
	});

	it("returns an empty set for css with no vars", () => {
		expect(tokensInCss(".x { color: red; }").size).toBe(0);
	});
});

describe("styleQueriedTokensInCss", () => {
	it("extracts the token from a style() query", () => {
		const css = "@container style(--selection-cue: marker) { .x { content: '✓'; } }";
		expect([...styleQueriedTokensInCss(css)]).toEqual(["--selection-cue"]);
	});

	it("handles whitespace around the token and colon", () => {
		const css = "@container style( --selection-cue : marker) { .x {} }";
		expect([...styleQueriedTokensInCss(css)]).toEqual(["--selection-cue"]);
	});

	it("returns an empty set when no style() queries are present", () => {
		expect(styleQueriedTokensInCss(".x { color: var(--accent); }").size).toBe(0);
	});

	it("does not count style-queried tokens in declaredPropsInCss", () => {
		const css = "@container style(--selection-cue: marker) { .x { color: red; } }";
		expect(declaredPropsInCss(css).has("--selection-cue")).toBe(false);
	});
});

describe("styleQueryPairsInCss", () => {
	it("extracts the token and value from each style() branch", () => {
		const css = "@container style(--selection-cue: marker) { .x { content: '✓'; } }";
		expect(styleQueryPairsInCss(css)).toEqual([{ token: "--selection-cue", value: "marker" }]);
	});

	it("handles whitespace around the token, colon, and value", () => {
		const css = "@container style( --selection-cue : tint ) { .x {} }";
		expect(styleQueryPairsInCss(css)).toEqual([{ token: "--selection-cue", value: "tint" }]);
	});

	it("returns an empty array when no style() branches are present", () => {
		expect(styleQueryPairsInCss(".x { color: var(--accent); }")).toEqual([]);
	});
});

describe("lintStyleQueryDomains", () => {
	const domains = { "--selection-cue": ["tint", "marker"] as const };

	it("is ok when every branch queries a value in the token's domain", () => {
		const css = "@container style(--selection-cue: marker) { .x { content: '✓'; } }";
		expect(lintStyleQueryDomains(css, domains)).toEqual({ ok: true, invalid: [] });
	});

	it("flags a branch whose value is outside the domain (the silent-typo case)", () => {
		const css = "@container style(--selection-cue: marekr) { .x { content: '✓'; } }";
		const result = lintStyleQueryDomains(css, domains);
		expect(result.ok).toBe(false);
		expect(result.invalid).toEqual([{ token: "--selection-cue", value: "marekr" }]);
	});

	it("ignores a style query on a token with no declared domain", () => {
		const css = "@container style(--undeclared-cue: anything) { .x {} }";
		expect(lintStyleQueryDomains(css, domains)).toEqual({ ok: true, invalid: [] });
	});
});

describe("lintManifest", () => {
	const base: ComponentManifest = {
		id: "demo",
		name: "Demo",
		category: "control",
		summary: "",
		description: "",
		bindings: ["html"],
		anatomy: [],
		props: [],
		variants: [],
		sizes: [],
		states: [],
		slots: [],
		consumedTokens: [],
		composition: [],
		a11y: [],
		examples: [],
	};

	it("is ok when consumedTokens exactly matches the css vars", () => {
		const css = ".x { color: var(--accent); background: var(--bg-0); }";
		const result = lintManifest({ ...base, consumedTokens: ["--accent", "--bg-0"] }, css);
		expect(result).toEqual({ ok: true, undeclared: [], unused: [] });
	});

	it("flags tokens used in css but missing from consumedTokens as undeclared", () => {
		const css = ".x { color: var(--accent); background: var(--bg-0); }";
		const result = lintManifest({ ...base, consumedTokens: ["--accent"] }, css);
		expect(result.ok).toBe(false);
		expect(result.undeclared).toEqual(["--bg-0"]);
		expect(result.unused).toEqual([]);
	});

	it("flags declared tokens absent from css as unused", () => {
		const css = ".x { color: var(--accent); }";
		const result = lintManifest({ ...base, consumedTokens: ["--accent", "--stale"] }, css);
		expect(result.ok).toBe(false);
		expect(result.undeclared).toEqual([]);
		expect(result.unused).toEqual(["--stale"]);
	});

	it("counts style-queried tokens as consumed", () => {
		const css = "@container style(--selection-cue: marker) { .x { content: '✓'; } }";
		const result = lintManifest({ ...base, consumedTokens: ["--selection-cue"] }, css);
		expect(result).toEqual({ ok: true, undeclared: [], unused: [] });
	});

	it("flags style-queried tokens absent from consumedTokens as undeclared", () => {
		const css = "@container style(--selection-cue: marker) { .x { content: '✓'; } }";
		const result = lintManifest({ ...base, consumedTokens: [] }, css);
		expect(result.ok).toBe(false);
		expect(result.undeclared).toContain("--selection-cue");
	});
});

describe("lintHostControls", () => {
	const scaffold = `<pre data-root><code data-code></code></pre><button data-copy hidden><span data-copy-label>Copy</span></button>`;

	it("is ok when every declared marker ships as a standalone attribute", () => {
		expect(lintHostControls(["data-copy"], scaffold)).toEqual({ ok: true, missing: [] });
	});

	it("flags a declared marker the scaffold never ships (the dead-control case)", () => {
		const result = lintHostControls(["data-copy", "data-wrap"], scaffold);
		expect(result.ok).toBe(false);
		expect(result.missing).toEqual(["data-wrap"]);
	});

	it("does not count a marker that only appears as a longer attribute's prefix", () => {
		const result = lintHostControls(["data-copy-toggle"], scaffold);
		expect(result.ok).toBe(false);
		expect(result.missing).toEqual(["data-copy-toggle"]);
	});
});

const fragmentModules = import.meta.glob("../src/elements/fragments/*/source.generated.ts", {
	eager: true,
}) as Record<string, { manifest: unknown; fragmentSources: Record<string, string> }>;

describe("fragment host-control contract", () => {
	it("every fragment's declared hostControls markers ship in its scaffold", () => {
		for (const [path, mod] of Object.entries(fragmentModules)) {
			const markers = declaredHostControls(mod.manifest).map((c) => c.marker);
			if (markers.length === 0) continue;
			const scaffold = Object.entries(mod.fragmentSources)
				.filter(([name]) => name.endsWith(".html"))
				.map(([, source]) => source)
				.join("\n");
			const result = lintHostControls(markers, scaffold);
			expect(result.ok, `${path}: ${JSON.stringify(result.missing)}`).toBe(true);
		}
	});
});

describe("registry token contract", () => {
	const manifests = listComponents();

	it("every registered manifest's consumedTokens matches its css module", async () => {
		for (const manifest of manifests) {
			const css = await loadCssModule(manifest.id);
			const result = lintManifest(manifest, css);
			expect(result.ok, `${manifest.id}: ${JSON.stringify(result)}`).toBe(true);
		}
	});

	it("every component's style-query branches stay within the token's keyword domain", async () => {
		for (const manifest of manifests) {
			const css = await loadCssModule(manifest.id);
			const result = lintStyleQueryDomains(css, KEYWORD_DOMAINS);
			expect(result.ok, `${manifest.id}: ${JSON.stringify(result.invalid)}`).toBe(true);
		}
	});
});

describe("coverComponent / coverComponents", () => {
	const manifest: ComponentManifest = {
		id: "probe",
		name: "Probe",
		category: "control",
		summary: "",
		description: "",
		bindings: ["html"],
		anatomy: [],
		props: [],
		variants: [],
		sizes: [],
		states: [],
		slots: [],
		consumedTokens: ["--accent", "--bg-0"],
		composition: [],
		a11y: [],
		examples: [],
	};

	it("coverComponent reports covered when the register produces the consumed tokens", () => {
		expect(coverComponent(manifest, register).covered).toBe(true);
	});

	it("coverComponent reports the missing token", () => {
		const result = coverComponent(
			{ ...manifest, consumedTokens: ["--accent", "--never-exists"] },
			register,
		);
		expect(result.covered).toBe(false);
		expect(result.missing).toContain("--never-exists");
	});

	it("coverComponents runs over an explicit subset", () => {
		const results = coverComponents(register, [manifest]);
		expect(results).toEqual([{ id: "probe", covered: true, missing: [] }]);
	});

	it("coverComponents over the registry returns one row per registered component", () => {
		const results = coverComponents(register);
		expect(results).toHaveLength(listComponents().length);
	});
});
