import type { StoreEnvelope } from "./types.js";
import { STORAGE_KEY } from "./types.js";

export interface StoreBackend {
	load(): StoreEnvelope | null;
	save(envelope: StoreEnvelope): void;
}

export class NullBackend implements StoreBackend {
	load(): StoreEnvelope | null {
		return null;
	}

	save(): void {}
}

export class LocalStorageBackend implements StoreBackend {
	private readonly key: string;

	constructor(key: string = STORAGE_KEY) {
		this.key = key;
	}

	load(): StoreEnvelope | null {
		if (typeof localStorage === "undefined") return null;
		try {
			const raw = localStorage.getItem(this.key);
			if (raw === null) return null;
			return JSON.parse(raw) as StoreEnvelope;
		} catch {
			return null;
		}
	}

	save(envelope: StoreEnvelope): void {
		if (typeof localStorage === "undefined") return;
		try {
			localStorage.setItem(this.key, JSON.stringify(envelope));
		} catch {
			/* quota or serialization failure — persistence is best-effort */
		}
	}
}

export function defaultBackend(): StoreBackend {
	if (typeof window === "undefined" || typeof localStorage === "undefined") {
		return new NullBackend();
	}
	return new LocalStorageBackend();
}
