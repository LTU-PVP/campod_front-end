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
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No error body");
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody}`);
  }

  return res.json() as Promise<T>;
};

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
