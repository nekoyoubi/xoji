import type { CoverageResult, TokenName, TokenRegister } from "./types.js";
import type { ComponentManifest } from "./manifest/types.js";
import { listComponents } from "./manifest/registry.js";

export function coverage(
	consumed: TokenName[],
	produced: TokenRegister,
): CoverageResult {
	const have = new Set(Object.keys(produced).map(normalize));
	const missing = consumed
		.map(normalize)
		.filter((name) => !have.has(name));
	return { covered: missing.length === 0, missing };
}

export function coverComponent(
	manifest: ComponentManifest,
	produced: TokenRegister,
): CoverageResult {
	return coverage(manifest.consumedTokens, produced);
}

export function coverComponents(
	produced: TokenRegister,
	subset?: ComponentManifest[],
): { id: string; covered: boolean; missing: string[] }[] {
	const manifests = subset ?? listComponents();
	return manifests.map((manifest) => {
		const result = coverComponent(manifest, produced);
		return { id: manifest.id, covered: result.covered, missing: result.missing };
	});
}

function normalize(name: TokenName): TokenName {
	return name.startsWith("--") ? name : `--${name}`;
}
