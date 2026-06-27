import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { listComponents } from "../src/manifest/index.js";

// Each component manifest declares which bindings it supports; a declared `svelte`/`astro`
// binding must have a matching wrapper file in the sibling package, or the binding is a
// promise the package doesn't keep. The SSR registry test guards the core↔astro seam at
// render time; this guards the manifest↔wrapper seam at the file level. Both sides are
// compared by their letters-and-digits only (lowercased, separators dropped), so the id's
// hyphens and the wrapper's PascalCase line up without assuming a specific casing scheme.
const key = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]/g, "");

const here = dirname(fileURLToPath(import.meta.url));
const wrapperKeys = (pkg: string, ext: string): Set<string> => {
	const dir = resolve(here, "../..", pkg, "src");
	return new Set(readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => key(f.slice(0, -ext.length))));
};

const svelteWrappers = wrapperKeys("svelte", ".svelte");
const astroWrappers = wrapperKeys("astro", ".astro");

describe("binding parity", () => {
	const components = listComponents();

	it("every component declaring a svelte binding ships a Svelte wrapper", () => {
		const missing = components
			.filter((c) => c.bindings.includes("svelte"))
			.filter((c) => !svelteWrappers.has(key(c.id)));
		expect(missing.map((c) => c.id)).toEqual([]);
	});

	it("every component declaring an astro binding ships an Astro wrapper", () => {
		const missing = components
			.filter((c) => c.bindings.includes("astro"))
			.filter((c) => !astroWrappers.has(key(c.id)));
		expect(missing.map((c) => c.id)).toEqual([]);
	});
});
