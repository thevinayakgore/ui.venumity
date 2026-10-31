// utils/source-cache.ts
/**
 * In-memory + sessionStorage cache for source-code fetches.
 * Entries are versioned by an `etag` (typically the file's mtime from the API).
 * If the etag changes → refetch. Otherwise → cached hit.
 */

const MEM = new Map<string, { etag: string; data: unknown }>();

interface CachedEntry<T> {
  etag: string;
  data: T;
}

export function getCached<T>(key: string, etag: string): T | null {
  // 1. Memory
  const mem = MEM.get(key);
  if (mem && mem.etag === etag) return mem.data as T;

  // 2. sessionStorage
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as CachedEntry<T>;
        if (parsed.etag === etag) {
          MEM.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {}
  }

  return null;
}

export function setCached<T>(key: string, etag: string, value: T): void {
  const entry: CachedEntry<T> = { etag, data: value };
  MEM.set(key, entry);
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(entry));
    } catch {}
  }
}

export function clearCached(key: string): void {
  MEM.delete(key);
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(key);
    } catch {}
  }
}

export function clearCacheByPrefix(prefix: string): void {
  for (const key of MEM.keys()) {
    if (key.startsWith(prefix)) MEM.delete(key);
  }
  if (typeof window !== "undefined") {
    try {
      const keys: string[] = [];
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const k = window.sessionStorage.key(i);
        if (k && k.startsWith(prefix)) keys.push(k);
      }
      keys.forEach((k) => window.sessionStorage.removeItem(k));
    } catch {}
  }
}

interface CachedResponse<T> {
  data: T | null;
  etag: string | null;
}

/**
 * Cached fetch — uses the response's ETag header for version comparison.
 * If the server returns a new ETag, updates the cache.
 * If the server returns 304 (not modified), keeps the existing cache.
 */
export async function cachedFetchJson<T>(
  key: string,
  url: string,
  forcedEtag?: string | null,
): Promise<CachedResponse<T>> {
  // If the caller provided an etag, do a conditional request
  const headers: Record<string, string> = {};
  if (forcedEtag) headers["If-None-Match"] = forcedEtag;

  try {
    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });

    if (res.status === 304 && forcedEtag) {
      // Not modified — server confirms the cache is still valid
      return { data: null, etag: forcedEtag };
    }

    if (!res.ok) return { data: null, etag: null };

    const etag = res.headers.get("ETag") || forcedEtag || null;
    const data = (await res.json()) as T;

    if (etag) setCached(key, etag, data);
    return { data, etag };
  } catch {
    return { data: null, etag: null };
  }
}

export function buildCacheKey(prefix: string, ...parts: string[]): string {
  return `venumity:${prefix}:${parts.filter(Boolean).join(":")}`;
}