import { describe, expect, it } from "vitest";
import { resolveAlgorithm, snapshotAlgorithm } from "../src/host/registry.js";

describe("host registry snapshot", () => {
	it("snapshots a resolved mod synchronously, null until then", async () => {
		const algorithm = await resolveAlgorithm("xoji-default");
		expect(snapshotAlgorithm("xoji-default")).toBe(algorithm);
		// an id never resolved in this run has no snapshot
		expect(snapshotAlgorithm("xoji-hc")).toBeNull();
		expect(snapshotAlgorithm("nonexistent")).toBeNull();
	});

	it("returns the same cached instance as resolveAlgorithm", async () => {
		const first = await resolveAlgorithm("xoji-quiet");
		const second = await resolveAlgorithm("xoji-quiet");
		expect(second).toBe(first);
		expect(snapshotAlgorithm("xoji-quiet")).toBe(first);
	});
});
