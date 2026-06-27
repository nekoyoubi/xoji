import { XojiElement, define, type StyleMode } from "./base.js";
import type { FullTone, Tone } from "../index.js";
import { avatarHostCss } from "../markup/index.js";
import { FragmentHost } from "./fragment-host.js";
import { manifest, fragmentSources } from "./fragments/avatar/source.generated.js";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export class XojiAvatar extends XojiElement {
	private fragment = new FragmentHost(this.root, manifest, fragmentSources, "avatar", {
		applyIntent: () => {},
	});

	protected override get styleMode(): StyleMode {
		return "auto";
	}

	static get observedAttributes(): string[] {
		return ["src", "alt", "tone", "size", "shape", "status", "status-label"];
	}

	get src(): string | null {
		return this.getAttribute("src");
	}
	set src(value: string | null | undefined) {
		this.reflectString("src", value);
	}

	get alt(): string | null {
		return this.getAttribute("alt");
	}
	set alt(value: string | null | undefined) {
		this.reflectString("alt", value);
	}

	get tone(): FullTone {
		return (this.getAttribute("tone") as FullTone) ?? "neutral";
	}
	set tone(value: FullTone) {
		this.setAttribute("tone", value);
	}

	get size(): AvatarSize {
		return (this.getAttribute("size") as AvatarSize) ?? "md";
	}
	set size(value: AvatarSize) {
		this.setAttribute("size", value);
	}

	get shape(): AvatarShape {
		return (this.getAttribute("shape") as AvatarShape) ?? "circle";
	}
	set shape(value: AvatarShape) {
		this.setAttribute("shape", value);
	}

	get status(): Tone | null {
		return this.getAttribute("status") as Tone | null;
	}
	set status(value: Tone | null | undefined) {
		this.reflectString("status", value);
	}

	get statusLabel(): string | null {
		return this.getAttribute("status-label");
	}

	attributeChangedCallback(): void {
		if (this.root.firstChild) this.render();
	}

	private get bindings(): Record<string, unknown> {
		return {
			src: this.src,
			alt: this.alt,
			tone: this.tone,
			size: this.size,
			shape: this.shape,
			status: this.status,
			statusLabel: this.statusLabel,
		};
	}

	/** A signature of the state ops can't express incrementally — the `<img>` source
	 * (`src`) and the status-dot (`status`). The `src` value (not just its presence) is
	 * folded in so a URL change forces a full rebuild: this both updates the rendered
	 * image and resurrects an `<img>` that removed itself via `onerror`. */
	private shapeSignature(): string {
		return `${this.src ?? ""}|${this.status != null}`;
	}

	private warnIfUnnamed(): void {
		if (this.src !== null && !this.alt) {
			console.warn("xoji-avatar: an avatar with `src` has no `alt`. Provide one so the image is announced.");
		}
	}

	protected template(): string {
		return "";
	}

	protected override render(): void {
		this.adoptComponentSheet();
		this.fragment.ensureScaffold(avatarHostCss);
		this.fragment.reshapeIfChanged(this.shapeSignature());
		this.fragment.update(this.bindings);
		this.warnIfUnnamed();
	}
}

define("xoji-avatar", XojiAvatar);
