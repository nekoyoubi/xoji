const GAPS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
const ALIGN = ["start", "center", "end", "stretch", "baseline"] as const;
const JUSTIFY = ["start", "center", "end", "between", "around", "evenly"] as const;

const ALIGN_VALUE: Record<(typeof ALIGN)[number], string> = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline",
};
const JUSTIFY_VALUE: Record<(typeof JUSTIFY)[number], string> = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
};

const gapRules = GAPS.map((g) => `.xoji-cluster--gap-${g} { gap: var(--space-${g}); }`).join("\n");
const alignRules = ALIGN.map((a) => `.xoji-cluster--align-${a} { align-items: ${ALIGN_VALUE[a]}; }`).join("\n");
const justifyRules = JUSTIFY.map(
	(j) => `.xoji-cluster--justify-${j} { justify-content: ${JUSTIFY_VALUE[j]}; }`,
).join("\n");

export const clusterCss = `
[data-cluster] { display: contents; }
.xoji-cluster {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--space-2);
}
.xoji-cluster--inline {
	display: inline-flex;
}
.xoji-cluster--nowrap {
	flex-wrap: nowrap;
}
${gapRules}
${alignRules}
${justifyRules}
`.trim();
