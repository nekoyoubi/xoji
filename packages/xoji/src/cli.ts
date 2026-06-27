#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import process from "node:process";
import { coverage } from "./coverage.js";
import { derive } from "./index.js";
import { emit, emitters } from "./emit/index.js";
import { buildThemeFile, serializeThemeFile } from "./theme-file.js";
import { gauntlet, GAUNTLET_DEPTH_RUNS, resolveDepth } from "./gauntlet.js";
import { availableAlgorithms, resolveAlgorithm } from "./host/registry.js";
import type { Algorithm, EmitFormat, TokenRegister } from "./types.js";

type CliFormat = EmitFormat | "theme";
type GauntletMode = "baked" | "hosted";

interface ParsedArgs {
	command: string;
	bg?: string;
	fg?: string;
	accent?: string;
	format: CliFormat;
	name?: string;
	out?: string;
	runs?: number;
	depth?: string;
	mode: GauntletMode;
	algorithm: string;
}

function parse(argv: string[]): ParsedArgs {
	const args: ParsedArgs = {
		command: argv[0] ?? "help",
		format: "css",
		mode: "baked",
		algorithm: "xoji-default",
	};
	for (let i = 1; i < argv.length; i++) {
		const arg = argv[i];
		const next = argv[i + 1];
		switch (arg) {
			case "--bg":
				args.bg = next;
				i++;
				break;
			case "--fg":
				args.fg = next;
				i++;
				break;
			case "--accent":
				args.accent = next;
				i++;
				break;
			case "--format":
			case "-f":
				args.format = (next as CliFormat) ?? "css";
				i++;
				break;
			case "--name":
				args.name = next;
				i++;
				break;
			case "--out":
			case "-o":
				args.out = next;
				i++;
				break;
			case "--runs":
				args.runs = Number.parseInt(next ?? "100", 10);
				i++;
				break;
			case "--depth":
				args.depth = next;
				i++;
				break;
			case "--mode":
				args.mode = next === "hosted" ? "hosted" : "baked";
				i++;
				break;
			case "--algorithm":
			case "-a":
				args.algorithm = next ?? "xoji-default";
				i++;
				break;
		}
	}
	return args;
}

// `batteries.ts` (the baked algorithms) is bundled separately because it imports preset
// sources outside this package's rootDir; a runtime dynamic import via a computed specifier
// loads the bundled output without pulling it into the tsc program.
async function bakedAlgorithm(id: string): Promise<Algorithm> {
	const specifier = "./batteries.js";
	const mod = (await import(specifier)) as { getAlgorithm(id: string): Algorithm };
	return mod.getAlgorithm(id);
}

function resolveForMode(id: string, mode: GauntletMode): Promise<Algorithm> {
	return mode === "hosted" ? resolveAlgorithm(id) : bakedAlgorithm(id);
}

function constraintsFrom(args: ParsedArgs): TokenRegister {
	const c: TokenRegister = {};
	if (args.bg) c["--bg-0"] = args.bg;
	if (args.fg) c["--fg-0"] = args.fg;
	if (args.accent) c["--accent"] = args.accent;
	return c;
}

function usage(): void {
	process.stdout.write(
		[
			"xoji — themable-derivation engine",
			"",
			"usage:",
			"  xoji derive [-a <algorithm>] [--bg <c>] [--fg <c>] [--accent <c>] [--format css|json|theme|prism|monaco] [--name <s>] [--out <file>]",
			"  xoji gauntlet [-a <algorithm>|all] [--mode baked|hosted] [--depth quick|standard|full] [--runs <n>]",
			"  xoji coverage --consumed <a,b,c> [-a <algorithm>] [--bg <c>] [--accent <c>]",
			"  xoji list",
			"",
			`algorithms: ${availableAlgorithms().join(", ")}`,
			`emitters: ${emitters().join(", ")}`,
			"",
		].join("\n"),
	);
}

async function main(): Promise<void> {
	const argv = process.argv.slice(2);
	const args = parse(argv);

	if (args.command === "help" || args.command === "--help" || args.command === "-h") {
		usage();
		return;
	}

	if (args.command === "list") {
		for (const id of availableAlgorithms()) process.stdout.write(`${id}\n`);
		return;
	}

	if (args.command === "derive") {
		const algorithm = await resolveAlgorithm(args.algorithm);
		const constraints = constraintsFrom(args);
		const register = derive(algorithm, { constraints });
		const output =
			args.format === "theme"
				? serializeThemeFile(
						buildThemeFile({
							meta: { name: args.name ?? `${args.algorithm} theme`, generator: "@xoji/core" },
							recipe: { algorithm: args.algorithm, overrides: constraints },
							register,
						}),
					)
				: emit(register, args.format);
		if (args.out) {
			writeFileSync(args.out, output);
			process.stdout.write(`wrote ${Object.keys(register).length} tokens to ${args.out}\n`);
		} else {
			process.stdout.write(output);
		}
		return;
	}

	if (args.command === "gauntlet") {
		const depth = resolveDepth(args.depth);
		const runs = args.runs ?? GAUNTLET_DEPTH_RUNS[depth];
		const ids = args.algorithm === "all" ? availableAlgorithms() : [args.algorithm];
		const reports = [];
		for (const id of ids) {
			const algorithm = await resolveForMode(id, args.mode);
			reports.push(gauntlet(algorithm, { runs }));
		}
		const ok = reports.every((r) => r.ok);
		const out = ids.length === 1 ? { mode: args.mode, depth, runs, ...reports[0] } : { mode: args.mode, depth, runs, ok, reports };
		process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
		process.exitCode = ok ? 0 : 1;
		return;
	}

	if (args.command === "coverage") {
		const algorithm = await resolveAlgorithm(args.algorithm);
		const consumedArg = argv[argv.indexOf("--consumed") + 1] ?? "";
		const consumed = consumedArg.split(",").map((s) => s.trim()).filter(Boolean);
		const register = derive(algorithm, { constraints: constraintsFrom(args) });
		const result = coverage(consumed, register);
		process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
		process.exitCode = result.covered ? 0 : 1;
		return;
	}

	usage();
	process.exitCode = 1;
}

main().catch((error) => {
	process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
	process.exitCode = 1;
});
