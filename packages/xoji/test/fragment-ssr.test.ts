import { describe, expect, it } from "vitest";
import {
	composeFallbackSlot,
	renderFragment,
	renderFragmentLight,
	ssrFragments,
} from "../src/elements/fragment-ssr.js";

// Every built-in fill lives in its own dir under elements/fragments/; the SSR registry in
// fragment-ssr.ts must list each one, or the `@xoji/astro` binding throws "no SSR fragment
// registered" the first time that component is used server-side — a gap the site's own build
// won't catch until a page happens to render it.
const fragmentDirs = Object.keys(
	import.meta.glob("../src/elements/fragments/*/source.generated.ts", { eager: true }),
).map((path) => path.replace("../src/elements/fragments/", "").replace("/source.generated.ts", ""));

describe("SSR fragment registry", () => {
	it("registers an SSR fill for every fragment directory", () => {
		const registered = new Set(ssrFragments());
		const missing = fragmentDirs.filter((id) => !registered.has(id));
		expect(missing).toEqual([]);
	});

	it("renders pagination to a declarative-shadow string at build time", async () => {
		const html = await renderFragment("pagination", { page: 2, total: 5 }, ".x{}");
		expect(html).toContain("xoji-pagination");
		expect(html).toContain('aria-current="page"');
		// the windowed range for page 2 of 5 is the full run 1..5
		for (const n of [1, 2, 3, 4, 5]) expect(html).toContain(`>${n}</`);
		expect(html).toContain("<style>.x{}</style>");
	});

	it("renders pagination links when given an href template", async () => {
		const html = await renderFragment("pagination", { page: 1, total: 3, href: "/p?n={page}" }, "");
		expect(html).toContain('href="/p?n=2"');
		expect(html).toContain('href="/p?n=3"');
	});

	it("throws a clear error for an unregistered component", async () => {
		await expect(renderFragment("not-a-component", {}, "")).rejects.toThrow(/no SSR fragment registered/);
	});
});

describe("light-DOM native slots", () => {
	it("renders alert with native slots and a fallback-bearing icon slot", async () => {
		const html = await renderFragmentLight("alert", { severity: "info", variant: "soft", dismissible: false });
		// the severity glyph rides inside the icon slot's fallback content the consumer slot replaces
		expect(html).toMatch(/<slot name="icon"><span data-icon><svg/);
		// the body regions carry native slots for the binding to fill or strip — the same markup
		// that drives shadow projection in the framework path
		expect(html).toContain('<slot name="title"></slot>');
		expect(html).toContain("<slot></slot>");
		expect(html).toContain('<slot name="actions"></slot>');
		// no light-DOM `<style>` ships — the global sheet styles it
		expect(html).not.toContain("<style>");
	});

	it("replaces the fallback glyph when the consumer fills the icon slot", async () => {
		const html = await renderFragmentLight("alert", { severity: "info" });
		const composed = composeFallbackSlot(html, "icon", "<i data-custom></i>");
		expect(composed).toContain("<i data-custom></i>");
		expect(composed).not.toContain('<slot name="icon">');
		expect(composed).not.toContain("data-icon");
	});

	it("keeps the fallback glyph and strips the slot tags when the icon slot is empty", async () => {
		const html = await renderFragmentLight("alert", { severity: "danger" });
		const composed = composeFallbackSlot(html, "icon", null);
		expect(composed).toMatch(/<span data-icon><svg/);
		expect(composed).not.toContain('<slot name="icon">');
	});

	it("renders progress with a computed value readout wrapped as a replaceable slot fallback", async () => {
		const html = await renderFragmentLight("progress", { value: 33, showValue: true });
		// the computed "33%" rides in the value slot's fallback content the consumer slot can replace
		expect(html).toMatch(/<slot name="value"><span data-progress-value>33%</);
		// empty value slot → keep the computed readout, strip the slot tags
		const empty = composeFallbackSlot(html, "value", null);
		expect(empty).toContain("33%");
		expect(empty).not.toContain('<slot name="value">');
		// filled value slot → the consumer readout replaces the computed fallback (the bar's own
		// `width:33%` is unaffected — only the readout node is swapped)
		const filled = composeFallbackSlot(html, "value", "<b>a third</b>");
		expect(filled).toContain('part="value"><b>a third</b></span>');
		expect(filled).not.toContain("data-progress-value");
		expect(filled).not.toContain('<slot name="value">');
	});
});
