import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { listComponents, derive } from "@xoji/core";
import { resolveAlgorithm } from "@xoji/core/host";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

const anchors = { bg: "#0b0d12", fg: "#e6e9ef", accent: "#6ea8fe" };
const algorithm = await resolveAlgorithm("xoji-default");
const register = derive(algorithm, { anchors });
const components = listComponents();

const baseline = {
	version: pkg.version,
	components: components.length,
	tokens: Object.keys(register).length,
	categories: new Set(components.map((c) => c.category)).size,
	bindings: 3,
};

const outDir = resolve(root, "apps/site/src/data");
mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, "stats-baseline.json");
writeFileSync(out, `${JSON.stringify(baseline, null, "\t")}\n`);
console.log(`xoji: wrote stats baseline for v${baseline.version}`, baseline);
