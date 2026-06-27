import type { Algorithm } from "@xoji/core";
import { loadAlgorithm } from "@xoji/core/host/load";
import defaultManifest from "../../../../../algorithms/xoji-default/mod-manifest.json";
import hcManifest from "../../../../../algorithms/xoji-hc/mod-manifest.json";
import quietManifest from "../../../../../algorithms/xoji-quiet/mod-manifest.json";
import loudManifest from "../../../../../algorithms/xoji-loud/mod-manifest.json";
import nxiNiteManifest from "../../../../../algorithms/nxi-nite/mod-manifest.json";
import defaultSource from "../../../../../algorithms/xoji-default/src/mod.js?raw";
import hcSource from "../../../../../algorithms/xoji-hc/src/mod.js?raw";
import quietSource from "../../../../../algorithms/xoji-quiet/src/mod.js?raw";
import loudSource from "../../../../../algorithms/xoji-loud/src/mod.js?raw";
import nxiNiteSource from "../../../../../algorithms/nxi-nite/src/mod.js?raw";

const SPECS: Record<string, { manifest: unknown; source: string }> = {
	"xoji-default": { manifest: defaultManifest, source: defaultSource },
	"xoji-hc": { manifest: hcManifest, source: hcSource },
	"xoji-quiet": { manifest: quietManifest, source: quietSource },
	"xoji-loud": { manifest: loudManifest, source: loudSource },
	"nxi-nite": { manifest: nxiNiteManifest, source: nxiNiteSource },
};

let loadPromise: Promise<Map<string, Algorithm>> | undefined;

/**
 * Loads every bench algorithm as a hosted xript mod in the browser. The QuickJS
 * WASM runtime is fetched once; each algorithm gets its own runtime via
 * `loadAlgorithm`. Resolves to a map keyed by algorithm id. Memoized so island
 * remounts reuse the single in-browser runtime set.
 */
export function loadHostedAlgorithms(): Promise<Map<string, Algorithm>> {
	if (!loadPromise) {
		loadPromise = (async () => {
			const entries = await Promise.all(
				Object.entries(SPECS).map(async ([id, spec]) => {
					const algorithm = await loadAlgorithm(spec.manifest, spec.source);
					return [id, algorithm] as const;
				}),
			);
			return new Map(entries);
		})();
	}
	return loadPromise;
}
