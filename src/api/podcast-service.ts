import type {
  CollectionsResponse,
  CreateShowRequest,
  PodcastDetailResponse,
  Show,
} from "../types/show";

export const BASE_URL = "http://localhost:5001";

const request = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No error body");
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody}`);
  }

  return res.json() as Promise<T>;
};

export const login = (username: string, password: string) =>
  request<{ message: string }>("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

export const logout = () =>
  request<{ message: string }>("/logout", { method: "POST" });

export const register = (username: string, password: string) =>
  request<{ message: string }>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

export const getCollections = (page: number = 1) =>
  request<CollectionsResponse>(`/collections?page=${page}`);

export const getCollection = (id: number) =>
  request<PodcastDetailResponse>(`/collections/${id}`);

export const createCollection = (data: CreateShowRequest) =>
  request<Show>("/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const updateCollection = (
  id: number | string,
  data: CreateShowRequest,
) =>
  request<Show>(`/collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
