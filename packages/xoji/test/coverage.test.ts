import { describe, expect, it } from "vitest";
import { coverage, derive } from "../src/index.js";
import { xojiDefault } from "../src/batteries.js";

const register = derive(xojiDefault, { constraints: { "--bg-0": "#0f1115", "--accent": "#5b8cff" } });

describe("coverage", () => {
	it("reports covered when the consumed floor is produced", () => {
		const result = coverage(["--bg-0", "--fg-0", "--accent"], register);
		expect(result.covered).toBe(true);
		expect(result.missing).toHaveLength(0);
	});

	it("normalizes names without the leading dashes", () => {
		const result = coverage(["bg-0", "accent"], register);
		expect(result.covered).toBe(true);
	});

	it("reports missing tokens", () => {
		const result = coverage(["--bg-0", "--does-not-exist"], register);
		expect(result.covered).toBe(false);
		expect(result.missing).toContain("--does-not-exist");
	});

	it("the full produces set covers itself", () => {
		expect(coverage(xojiDefault.produces, register).covered).toBe(true);
	});
});
