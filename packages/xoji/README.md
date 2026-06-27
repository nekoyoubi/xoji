# xoji

A themable-derivation engine. Hand it an **algorithm** and a few **anchors**, and
it derives a full **register** of CSS-ready tokens across seven dimensions —
color, a literal 12-hue palette, type, geometry, motion, elevation, and space.

The *algorithm* carries the rules, the math, the taste. A *theme* is a
materialization of one — quick or hard-won, both first-class. This package is the pure
derivation engine plus the built-in `xoji-default` algorithm.

## Install

```sh
npm install @xoji/core
```

## Quick start

```ts
import { derive, emit, xojiDefault } from "@xoji/core";

const register = derive(xojiDefault, {
	anchors: { bg: "#0f1115", accent: "#5b8cff" },
});

console.log(emit(register, "css"));
// :root {
//   --accent: #5b8cff;
//   --bg-0: ...;
//   --fg-0: ...;
//   ...
// }
```

## Dual entry

The package is environment-split by design:

- **`@xoji/core`**: the neutral, importable API (`derive`, `emit`, `coverage`,
  `gauntlet`, `xojiDefault`, color + graph helpers); no `node:*`, no DOM globals,
  safe in any runtime
- **`@xoji/core/dom`**: browser helpers (`apply`, `clear`, `persist`, `restore`,
  `toStyleSheet`) that write tokens to a live `:root`
- **`xoji` bin**: a Node CLI for one-shot derivation, coverage, and the gauntlet

```ts
import { apply } from "@xoji/core/dom";
apply(register, { persistKey: "theme" });
```

```sh
xoji derive --bg "#0f1115" --accent "#5b8cff" --format css
xoji coverage --consumed "--bg-0,--fg-0,--accent" --bg "#0f1115"
xoji gauntlet --runs 200
```

## The seven-dimension contract

`xoji-default` always produces (172 tokens):

### color

- **surfaces**: `--body-bg --bg-0..3 --scrim --surface-overlay --surface-overlay-border`
- **content**: `--fg-0..3 --fg-disabled --placeholder`
- **lines / rings**: `--line --line-2 --ring --ring-bg`
- **accent**: `--accent --accent-hover --accent-active --accent-2..4 --accent-bg --accent-fg --accent-text`
- **neutral**: `--neutral --neutral-bg --neutral-fg --neutral-text`
- **fields**: `--field-bg --field-border`
- **status**: `--success(-bg) --warn(-bg) --danger(-bg) --info(-bg)`
- **on-fill / on-tint**: `--{status}-fg --{status}-text` (ink on the solid fill / readable text on the tint)
- **state**: `--state-hover --state-press --state-selected --state-disabled --state-drag` (translucent)
- **links**: `--link --link-hover`

### palette (literal, name-honest — decoupled from roles)

Twelve hues — `red orange yellow green blue purple brown pink cyan gray white
black` — each a bare alias `--color-<hue>` plus a 5-stop ramp
`--color-<hue>-{subtle,muted,base,strong,contrast}`. Scheme-aware in OKLCH; the
hue stays true to its name in every theme (lightness/chroma flex, hue holds);
`contrast` is the readable on-color text stop. `--color-red` stays red even if
`--danger` is yellow.

### type

`--font-{sans,mono,display}`, scale `--text-{xs,sm,body,lg,xl,2xl,3xl}` (rem, from
the `typeScale` ratio), `--leading-{tight,normal,loose}`,
`--weight-{normal,medium,semibold,bold}`.

### geometry

`--radius-{none,sm,md,lg,full}` (scaled by `radiusScale`),
`--border-{thin,normal,thick}`.

### motion

`--duration-{fast,base,slow}` (ms), `--ease-{standard,emphasized}` (`cubic-bezier()`).

### elevation

`--elevation-0..5` — scheme-aware box-shadow strings; 0 = none, 1..5 progressively
stronger.

### space

`--space-0..8` — numeric rem ramp scaled by the `density` knob
(compact/normal/comfortable).

## Knobs

`anchors {bg,fg,accent}` · `scheme` · `accentShiftStep` · `contrastBand`
(`'aa'|'aaa'|number`) · `vibrancy` (`0..1`) · `typeScale` · `radiusScale` ·
`density` · `fonts {sans,mono,display}`. Every knob has a sensible default.

## Derivation rules (`xoji-default`)

- **Scheme** auto-derives from `bg` lightness in OKLCH (`< 0.5` → dark, else light)
- **Surfaces** step lightness from `bg` in OKLCH, monotonically; lightening for
  dark schemes, darkening for light
- **Content** `--fg-0..3` reduce contrast toward the surface, and `--fg-0` is held
  above the WCAG AA floor (`>= 4.5`, or AAA / a custom band via `contrastBand`)
  against `--bg-0`
- **On-fill / on-tint text** (`--*-fg`, `--*-text`, `--color-*-contrast`) is swept
  to clear AA against its pairing; fills get nudged out of the contrast dead-zone
- **Accent family** `--accent-2/3` flank the accent as a split-complement at ∓`accentSplit`,
  and `--accent-4` takes its 180° complement; `vibrancy` scales accent / status / palette chroma
- **Status hues** track the named palette (success green, warn amber, danger red, info blue)
  and follow a pin to those palette colors
- **State overlays** are scheme-aware neutral colors with alpha ~0.06–0.16

## Coverage

Components declare what they consume; algorithms declare what they produce; the
engine verifies the produced set covers the consumed set.

```ts
import { coverage } from "@xoji/core";
coverage(["--bg-0", "--fg-0", "--accent"], register);
// { covered: true, missing: [] }
```

## The gauntlet

Fires N extreme + random anchor / knob sets at a chosen algorithm and asserts
*that algorithm's declared invariants*. Invariants are **dimension-aware** — each
token carries a category (`color`, `length`, `number`, `font`, `shadow`,
`duration`, `easing`), so the OKLCH parse only runs on color tokens while
`--font-sans`, `--duration-fast`, `--text-lg`, and `--elevation-2` get the right
format check for their kind. Asserts AA contrast floors, monotonic surfaces and
palette ramps, hue fidelity, translucent overlays, and the structural ladders
(type scale, weights, radius, borders, durations, elevation strength, space).

```ts
import { gauntlet, xojiDefault } from "@xoji/core";
const report = gauntlet(xojiDefault, { runs: 200 });
// { ok: true, passed: 200, runs: 200, failures: [] }
```

## Emitters

`emit(register, format)` ships with `css` and `json`. The set is open;
`registerEmitter(name, fn)` adds your own.

## Algorithms are xript mods

The `Algorithm` contract (`id`, `produces`, `knobs`, `categories`, `derive`,
`invariants`) maps onto a xript mod: knobs as declared inputs, sandboxed by xript's
capability model. The blessed set ships as real mods — a `mod-manifest.json` plus an
esbuild-bundled `mod.js` run through `@xriptjs/runtime` — and `resolveAlgorithm` runs
the sandboxed mod as the canonical derive path, held byte-identical to the baked
TypeScript that serves as the test oracle. Author your own with `defineXojiAlgorithm`
/ `defineAlgorithm` from `@xoji/core/authoring`.

## License

MIT
