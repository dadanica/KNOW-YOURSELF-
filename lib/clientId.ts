const STORAGE_KEY = "h5_test_client_id_v1";

function randomId(): string {
  // Prefer crypto.randomUUID when available
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback: not cryptographically strong, but fine for anonymous client identification
  return `cid_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function getClientId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const created = randomId();
  window.localStorage.setItem(STORAGE_KEY, created);
  return created;
}

