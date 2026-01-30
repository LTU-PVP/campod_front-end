import type { Show } from "../types/show";

const BASE_URL = "http://localhost:5001";

const request = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No error body");
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody}`);
  }

  return res.json() as Promise<T>;
};

export const getCollections = () => request<Show[]>("/collections");
export const getCollection = (id: number) =>
  request<Show>(`/collections/${id}`);
