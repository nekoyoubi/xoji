import { makeXojiAlgorithm, makeXojiPipelineAlgorithm, toPreset } from "@xoji/core/authoring";
import type { Algorithm } from "./types.js";
import { spec as xojiDefaultSpec } from "../../../algorithms/xoji-default/src/preset.js";
import { spec as xojiHcSpec } from "../../../algorithms/xoji-hc/src/preset.js";
import { spec as xojiQuietSpec } from "../../../algorithms/xoji-quiet/src/preset.js";
import { spec as xojiLoudSpec } from "../../../algorithms/xoji-loud/src/preset.js";
import { spec as nxiNiteSpec } from "../../../algorithms/nxi-nite/src/preset.js";
import { nxiNitePasses } from "../../../algorithms/nxi-nite/src/passes.js";

export const xojiDefault: Algorithm = makeXojiAlgorithm(toPreset(xojiDefaultSpec));
export const xojiHc: Algorithm = makeXojiAlgorithm(toPreset(xojiHcSpec));
export const xojiQuiet: Algorithm = makeXojiAlgorithm(toPreset(xojiQuietSpec));
export const xojiLoud: Algorithm = makeXojiAlgorithm(toPreset(xojiLoudSpec));
export const nxiNite: Algorithm = makeXojiPipelineAlgorithm(toPreset(nxiNiteSpec), nxiNitePasses);

export const algorithms: Record<string, Algorithm> = {
	[xojiDefault.id]: xojiDefault,
	[xojiHc.id]: xojiHc,
	[xojiQuiet.id]: xojiQuiet,
	[xojiLoud.id]: xojiLoud,
	[nxiNite.id]: nxiNite,
};

export function getAlgorithm(id: string): Algorithm {
	const algorithm = algorithms[id];
	if (!algorithm) {
		throw new Error(
			`xoji: unknown algorithm "${id}" (known: ${Object.keys(algorithms).join(", ")})`,
		);
	}
	return algorithm;
}
