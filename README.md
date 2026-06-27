# xoji

A **themable-derivation engine and component contract**. A small set of overridable anchors
propagates algorithmically into a full, internally-consistent design-token set,
co-designed against a component library so that any valid theme renders well out
of the box.

`xoji.dev` · a standalone design-token + theming product · not a brand spec, not
framework infra — its own thing, consumed by desktop apps and websites alike.

## The shape

The crown jewel is an **architecture, not a function**. See
[`docs/derivation-model.md`](docs/derivation-model.md) for the spine. In short:
the durable asset is the **algorithm** (a named, composable [xript](https://xript.dev)
module that owns the rules, math, defaults, and exposed knobs); a **theme** is an
invocation of one (knob bindings + overrides), materialized to a token set. Themes
are the prints, the algorithm is the press; the split is about reuse, not worth.
xript is an extensibility protocol: an algorithm is a manifest-declared, sandboxed
plugin, and its validation and type tooling come free.

Three layers over that spine:

1. **Derivation engine** — a xript host + resolution orchestrator over an *open*
   token graph: `(algorithm: knobs + constraints) → full register`. OKLCH, no DOM,
   exhaustively testable. Owns resolution order, constraint routing, cycle
   detection, coverage verification, materialization — *not* vocabulary or
   invariants (those are the algorithm's).
2. **The token contract** — a **coverage floor**, not a fixed schema. Components
   declare what they consume; an algorithm / theme declares what it produces; the
   engine checks coverage. Any app, site, or canvas reads the tokens without a
   framework, and the register is open — declare new tokens, rewire derivations.
3. **Components (optional)** — single-layer raw custom elements (`@xoji/core/elements`):
   the element *is* the component, no headless tier beneath it, styled *only* against
   tokens it declares it consumes. Thin framework wrappers (`@xoji/svelte`,
   `@xoji/astro`, …) skin them. Optional sugar; the CSS artifact is the real
   minimum an app consumes.

**The runtime is optional.** Once an algorithm has run, a theme is just CSS custom
properties and the browser cascade does the rest — nothing has to be running to use
it. Pre-bake a bounded theme set to CSS (switching is a `data-theme` swap); run
`@xoji/core` live in the browser only when you actually need novel-at-runtime inputs
(user-authored themes, continuous day/night, live preview). See
[`docs/repo-layout.md`](docs/repo-layout.md).

## Why themes tend to look good

There is **no engine-level "can't look bad" gospel**. Whether a theme can look
bad is a choice each *algorithm* makes. The taste lives in the algorithm:

- Components reference **only** declared tokens — no raw colors, no magic numbers —
  so a good algorithm's discipline reaches the whole catalog.
- A **contrast-conscientious algorithm** (e.g. `xoji-hc`) guarantees every token
  it derives is perceptually valid for any inputs: contrast floors, state deltas,
  disabled muting, border separation. OKLCH makes the contrast-preserving math
  trustworthy. A permissive algorithm may honor a garish input verbatim — its call.
- A **gauntlet** proves whatever an algorithm *declares*: fire N extreme knob /
  anchor sets at that algorithm, materialize its register, assert its invariants
  hold. The gauntlet is parameterized by algorithm, not a universal floor.

## The algorithm set

`@xoji/core` ships five algorithms over one preset-parameterized core
(`makeXojiAlgorithm`), each its own xript module with its own declared
invariants the gauntlet holds it to:

- **`xoji-default`** — the neutral, readability-conscientious baseline; AA contrast
  floors, balanced vibrancy.
- **`xoji-hc`** — high-contrast: clamps derived text toward AAA (≥ 7 where the
  fill allows, AA minimum everywhere) and declares that stricter floor as its
  invariant.
- **`xoji-quiet`** — low vibrancy, muted chroma, soft elevation, gentle accents;
  still AA.
- **`xoji-loud`** — high vibrancy, saturated accents and palette, punchier
  elevation; still AA.
- **`nxi-nite`** — time-aware day/night; folds the time of day into the
  derivation through its own passes, beyond the posture scalars the others vary.

All five share the same token register (~172 tokens across the dimensional
contract) and the same core math. The first four differ only in posture; `nxi-nite`
adds its own derivation passes on top. Drive any of them from the CLI:

```sh
xoji list                       # the five algorithm ids
xoji derive -a xoji-loud --bg "#0f1115" --accent "#5b8cff"
xoji gauntlet -a xoji-hc --runs 250
```

## The dimensional contract

Themes are dimensional, not just color: `dimensions.{color, type, geometry,
motion, elevation, space}`. Each dimension has canon defaults, a per-token
auto/explicit override layer, and (for color) an author `generate`-fn hook. A
theme author can supply as little as `bg + accent` and the engine fills the rest;
or override any single token; or write their own resolver.

See [`docs/dimensional-contract.md`](docs/dimensional-contract.md) for the full
token register and [`docs/open-questions.md`](docs/open-questions.md) for the
forks still open.

## Lineage

xoji extracts and generalizes a theme engine proved out in a prior in-house
project (a shared theme crate + a theme designer), which already shipped the color
/ type / geometry / motion dimensions but only lifted color into the shared lib.
xoji is where the whole dimensional model becomes a standalone, consumable
contract, plus the elevation + spacing dimensions and the expanded
component-facing verbs the existing system left as ad-hoc `extras`.

## Status

Pre-alpha. Engine language is settled (**TS-core**; see
[`docs/open-questions.md`](docs/open-questions.md) #1). The `@xoji/core` engine is
live: the full register derives over an open token graph, five algorithms ship over
a shared preset-parameterized core, and the dimension-aware gauntlet holds each
algorithm to its own declared invariants. Algorithms run as xript modules through
the zero-authority sandbox — the canonical derive path for the CLI and the site. A
native in-process derivation the test matrix holds byte-identical to the hosted
output serves as a fast path, the test oracle, and the front of the neutral
importable API.
