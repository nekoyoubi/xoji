export interface Segment {
	value: string;
	label: string;
}

/** The host-layout rule for a segmented control — the one `:host` rule, shared by the element's scaffold and the SSR declarative shadow root. */
export const segmentedHostCss = ":host { display: inline-block; }";

/** Parse `options` (label:value pairs or bare labels, comma-separated) into segments. */
export function parseSegments(raw: string): Segment[] {
	return raw
		.split(",")
		.map((part) => part.trim())
		.filter(Boolean)
		.map((part) => {
			const sep = part.indexOf(":");
			if (sep === -1) return { value: part, label: part };
			return { value: part.slice(sep + 1).trim(), label: part.slice(0, sep).trim() };
		});
}

/** Resolve the selected value the same way the element's `get value()` does. */
export function selectedValue(segments: Segment[], value: string | null | undefined): string {
	if (value != null && segments.some((s) => s.value === value)) return value;
	return segments[0]?.value ?? "";
}
