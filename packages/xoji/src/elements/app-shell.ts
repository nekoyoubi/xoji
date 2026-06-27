import { XojiElement, define, type StyleMode } from "./base.js";
import { appShellHostCss } from "../markup/index.js";
import { FragmentHost } from "./fragment-host.js";
import { manifest, fragmentSources } from "./fragments/app-shell/source.generated.js";

export class XojiAppShell extends XojiElement {
	protected override get styleMode(): StyleMode {
		return "auto";
	}

	private fragment = new FragmentHost(this.root, manifest, fragmentSources, "app-shell", {
		applyIntent: () => {},
	});

	static get observedAttributes(): string[] {
		return ["skip-link", "left-size", "right-size", "main-id"];
	}

	private get mainId(): string {
		const explicit = this.getAttribute("main-id");
		return explicit && explicit.length > 0 ? explicit : "main";
	}

	get skipLink(): string | null {
		return this.getAttribute("skip-link");
	}
	set skipLink(value: string | null) {
		if (value === null) this.removeAttribute("skip-link");
		else this.setAttribute("skip-link", value);
	}

	private get hasSkipLink(): boolean {
		return this.hasAttribute("skip-link");
	}

	private get skipLinkText(): string {
		const explicit = this.skipLink;
		return explicit && explicit.length > 0 ? explicit : "Skip to main content";
	}

	private get bodyStyle(): string | null {
		const rail = (attr: string, prop: string): string | null => {
			const raw = this.getAttribute(attr);
			if (raw === null || raw.length === 0) return null;
			const size = /^\d+$/.test(raw) ? `${raw}px` : raw;
			return `${prop}: ${size}`;
		};
		const style = [rail("left-size", "--xoji-app-left"), rail("right-size", "--xoji-app-right")]
			.filter(Boolean)
			.join("; ");
		return style.length > 0 ? style : null;
	}

	attributeChangedCallback(): void {
		if (this.root.firstChild) this.render();
	}

	private get bindings(): Record<string, unknown> {
		return {
			skipLink: this.hasSkipLink,
			skipLinkText: this.skipLinkText,
			bodyStyle: this.bodyStyle,
			mainId: this.mainId,
		};
	}

	/** A signature of the state ops can't express incrementally — whether the skip link
	 * exists, its resolved text, and the main region's id (all built into the structure on
	 * `mount`, not patched). When any changes, the structure is rebuilt rather than patched. */
	private shapeSignature(): string {
		return `${this.hasSkipLink}|${this.skipLinkText}|${this.mainId}`;
	}

	protected template(): string {
		return "";
	}

	protected override render(): void {
		this.adoptComponentSheet();
		this.fragment.ensureScaffold(appShellHostCss);
		this.fragment.reshapeIfChanged(this.shapeSignature());
		this.fragment.update(this.bindings);
	}
}

define("xoji-app-shell", XojiAppShell);
