import { normalizeRecipe } from "./recipe.js";
import type { Migration, StoreEnvelope, ThemeDoc, ThemeMeta } from "./types.js";
import { CURRENT_SCHEMA_VERSION, emptyEnvelope } from "./types.js";

const MIGRATIONS: Record<number, Migration> = {};

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function normalizeMeta(raw: unknown, fallbackName: string): ThemeMeta {
	if (!isObject(raw)) return { name: fallbackName };
	const meta: ThemeMeta = {
		name: typeof raw.name === "string" && raw.name.trim() ? raw.name : fallbackName,
	};
	if (typeof raw.description === "string") meta.description = raw.description;
	if (Array.isArray(raw.tags)) {
		meta.tags = raw.tags.filter((t): t is string => typeof t === "string");
	}
	return meta;
}

function freshId(): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}
	return `theme-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeDoc(raw: unknown, index: number): ThemeDoc | null {
	if (!isObject(raw)) return null;
	const now = Date.now();
	const id = typeof raw.id === "string" && raw.id ? raw.id : freshId();
	const createdAt = typeof raw.createdAt === "number" ? raw.createdAt : now;
	const updatedAt = typeof raw.updatedAt === "number" ? raw.updatedAt : createdAt;
	return {
		schemaVersion: CURRENT_SCHEMA_VERSION,
		id,
		meta: normalizeMeta(raw.meta, `Theme ${index + 1}`),
		recipe: normalizeRecipe(raw.recipe),
		createdAt,
		updatedAt,
	};
}

export function migrateEnvelope(raw: unknown): StoreEnvelope {
	if (!isObject(raw)) return emptyEnvelope();

	try {
		let working: Record<string, unknown> = { ...raw };
		let version =
			typeof working.schemaVersion === "number" ? working.schemaVersion : 0;

		while (version < CURRENT_SCHEMA_VERSION) {
			const step = MIGRATIONS[version];
			if (!step) break;
			working = step(working);
			version += 1;
		}

		const rawDocs = Array.isArray(working.docs) ? working.docs : [];
		const docs = rawDocs
			.map((doc, index) => normalizeDoc(doc, index))
			.filter((doc): doc is ThemeDoc => doc !== null);

		const ids = new Set(docs.map((doc) => doc.id));
		const activeId =
			typeof working.activeId === "string" && ids.has(working.activeId)
				? working.activeId
				: null;
		const selectedId =
			typeof working.selectedId === "string" && ids.has(working.selectedId)
				? working.selectedId
				: (activeId ?? docs[0]?.id ?? null);

		return { schemaVersion: CURRENT_SCHEMA_VERSION, docs, activeId, selectedId };
	} catch {
		return emptyEnvelope();
	}
}
