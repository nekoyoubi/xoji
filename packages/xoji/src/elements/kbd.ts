import { XojiElement, define, type StyleMode } from "./base.js";
import { kbdHostCss, type KbdSize } from "../markup/index.js";
import { FragmentHost } from "./fragment-host.js";
import { manifest, fragmentSources } from "./fragments/kbd/source.generated.js";

export class XojiKbd extends XojiElement {
	private fragment = new FragmentHost(this.root, manifest, fragmentSources, "kbd", {
		applyIntent: () => {},
	});

	protected override get styleMode(): StyleMode {
		return "auto";
	}

	static get observedAttributes(): string[] {
		return ["size"];
	}

	get size(): KbdSize {
		return (this.getAttribute("size") as KbdSize) ?? "md";
	}
	set size(value: KbdSize) {
		this.setAttribute("size", value);
	}

	attributeChangedCallback(): void {
		if (this.root.firstChild) this.render();
	}

	private get bindings(): Record<string, unknown> {
		return { size: this.size };
	}

	protected template(): string {
		return "";
	}

	protected override render(): void {
		this.adoptComponentSheet();
		this.fragment.ensureScaffold(kbdHostCss);
		this.fragment.update(this.bindings);
	}
}

define("xoji-kbd", XojiKbd);
