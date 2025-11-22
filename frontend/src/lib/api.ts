// src/lib/api.ts
import { API_BASE_URL } from "@/App";

// ---------- Types ----------
export interface UserPayload {
  name: string;
  email: string;
  relation?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  relation?: string | null;
}

// ---------- Generic helper ----------
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API error:", res.status, text);
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ---------- Specific calls ----------

// POST /users
export function createUser(payload: UserPayload) {
  return apiFetch<UserResponse>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// GET /users
export function getUsers() {
  return apiFetch<UserResponse[]>("/users");
}

