import { defineXojiAlgorithm } from "@xoji/core/authoring";
import { spec } from "./preset.js";
import { nxiNitePasses } from "./passes.js";

defineXojiAlgorithm({ ...spec, passes: nxiNitePasses });
