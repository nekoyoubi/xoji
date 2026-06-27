interface OpsBuilder {
	replaceChildren(selector: string, html: string): void;
	setAttr(selector: string, attr: string, value: string): void;
	setText(selector: string, text: string): void;
}

interface MenuItem {
	label: string;
	value?: string;
	disabled?: boolean;
	separator?: true;
}

interface MenuBindings {
	items?: MenuItem[];
	label?: string | null;
	open?: boolean;
	popupId?: string;
}

interface EventPayload {
	dataset?: Record<string, string>;
	key?: string;
	disabled?: boolean;
	ariaDisabled?: string;
}

interface NavContext {
	enabledValues: string[];
}

interface Intent {
	openMenu?: "first" | "last";
	closeMenu?: boolean;
	returnFocus?: boolean;
	activateValue?: string;
	activateLabel?: string;
	activateIndex?: number;
	focusValue?: string;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}

declare const hooks: {
	fragment: { [k: string]: (id: string, handler: (bindings: MenuBindings, ops: OpsBuilder) => void) => void };
};
declare const xript: { exports: { register(name: string, fn: (...args: unknown[]) => unknown): void } };

function escapeHtml(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
	return escapeHtml(value).replace(/"/g, "&quot;");
}

function triggerLabel(bindings: MenuBindings): string {
	return bindings.label ?? "Menu";
}

function items(bindings: MenuBindings): string {
	return (bindings.items ?? [])
		.map((item) => {
			if (item.separator) {
				return `<div class="xoji-menu__separator" role="separator"></div>`;
			}
			const value = item.value ?? item.label;
			const disabledAttr = item.disabled ? ` aria-disabled="true"` : "";
			return (
				`<button type="button" class="xoji-menu__item" role="menuitem" tabindex="-1"${disabledAttr} ` +
				`data-value="${escapeAttr(value)}" data-label="${escapeAttr(item.label)}">${escapeHtml(item.label)}</button>`
			);
		})
		.join("");
}

hooks.fragment.mount("menu", (bindings, ops) => {
	const label = triggerLabel(bindings);
	const popupId = bindings.popupId ?? "xoji-menu-popup";
	const open = bindings.open ?? false;
	ops.setAttr("[data-trigger]", "aria-controls", popupId);
	ops.setAttr("[data-trigger]", "popovertarget", popupId);
	ops.setAttr("[data-trigger]", "aria-expanded", String(open));
	ops.setText("[data-trigger]", label);
	ops.setAttr("[data-popup]", "id", popupId);
	ops.setAttr("[data-popup]", "aria-label", label);
	ops.replaceChildren("[data-items]", items(bindings));
});

hooks.fragment.update("menu", (bindings, ops) => {
	ops.setAttr("[data-trigger]", "aria-expanded", String(bindings.open ?? false));
});

xript.exports.register("triggerKeydown", (payload: unknown): Intent => {
	const e = payload as EventPayload;
	switch (e.key) {
		case "Enter":
		case " ":
		case "Spacebar":
		case "ArrowDown":
			return { openMenu: "first", preventDefault: true };
		case "ArrowUp":
			return { openMenu: "last", preventDefault: true };
		default:
			return {};
	}
});

xript.exports.register("itemClick", (payload: unknown, context: unknown): Intent => {
	const e = payload as EventPayload;
	if (e.disabled || e.ariaDisabled === "true") return {};
	const value = e.dataset?.value;
	if (value === undefined) return {};
	const ctx = context as NavContext;
	const index = (ctx?.enabledValues ?? []).indexOf(value);
	return { activateValue: value, activateLabel: e.dataset?.label, activateIndex: index };
});

xript.exports.register("itemKeydown", (payload: unknown, context: unknown): Intent => {
	const e = payload as EventPayload;
	const ctx = context as NavContext;
	const enabled = ctx?.enabledValues ?? [];
	const current = e.dataset?.value ?? "";
	const here = enabled.indexOf(current);
	const k = e.key ?? "";
	switch (k) {
		case "ArrowDown":
			return enabled.length ? { focusValue: enabled[(here + 1) % enabled.length], preventDefault: true } : {};
		case "ArrowUp":
			return enabled.length
				? { focusValue: enabled[(here - 1 + enabled.length) % enabled.length], preventDefault: true }
				: {};
		case "Home":
			return enabled.length ? { focusValue: enabled[0], preventDefault: true } : {};
		case "End":
			return enabled.length ? { focusValue: enabled[enabled.length - 1], preventDefault: true } : {};
		case "Enter":
		case " ":
		case "Spacebar": {
			if (e.disabled || e.ariaDisabled === "true") return { preventDefault: true };
			const value = e.dataset?.value;
			if (value === undefined) return { preventDefault: true };
			return {
				activateValue: value,
				activateLabel: e.dataset?.label,
				activateIndex: enabled.indexOf(value),
				preventDefault: true,
			};
		}
		case "Escape":
			return { closeMenu: true, returnFocus: true, preventDefault: true, stopPropagation: true };
		case "Tab":
			return { closeMenu: true, returnFocus: false };
		default:
			return {};
	}
});
