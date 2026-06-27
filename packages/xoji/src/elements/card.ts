import { XojiElement, define, type StyleMode } from "./base.js";
import { cardHostCss } from "../markup/index.js";
import { FragmentHost } from "./fragment-host.js";
import { manifest, fragmentSources } from "./fragments/card/source.generated.js";

export class XojiCard extends XojiElement {
	private fragment = new FragmentHost(this.root, manifest, fragmentSources, "card", {
		applyIntent: () => {},
	});

	protected override get styleMode(): StyleMode {
		return "auto";
	}

	static get observedAttributes(): string[] {
		return ["overlay", "interactive", "compact", "tone"];
	}

	get tone(): string | null {
		return this.getAttribute("tone");
	}
	set tone(value: string | null | undefined) {
		this.reflectString("tone", value);
	}

	get overlay(): boolean {
		return this.hasAttribute("overlay");
	}
	set overlay(value: boolean) {
		this.reflectBoolean("overlay", value);
	}

	get interactive(): boolean {
		return this.hasAttribute("interactive");
	}
	set interactive(value: boolean) {
		this.reflectBoolean("interactive", value);
	}

	get compact(): boolean {
		return this.hasAttribute("compact");
	}
	set compact(value: boolean) {
		this.reflectBoolean("compact", value);
	}

	attributeChangedCallback(): void {
		if (this.root.firstChild) this.render();
	}

	private get bindings(): Record<string, unknown> {
		return { overlay: this.overlay, interactive: this.interactive, compact: this.compact, tone: this.tone };
	}

	protected template(): string {
		return "";
	}

	protected override render(): void {
		this.adoptComponentSheet();
		this.fragment.ensureScaffold(cardHostCss);
		this.fragment.update(this.bindings);
	}
}

define("xoji-card", XojiCard);
