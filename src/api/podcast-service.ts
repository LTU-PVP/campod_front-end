import type {
  CollectionsResponse,
  CreateShowRequest,
  PodcastDetailResponse,
  Show,
  User,
} from "../types/show";

export const BASE_URL = "http://localhost:5001";

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

const request = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401 && !["/refresh", "/login"].includes(endpoint)) {
    if (endpoint === "/me") {
      throw new Error("No session");
    }

    if (isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        refreshQueue.push(() =>
          request<T>(endpoint, options).then(resolve).catch(reject),
        );
      });
    }

    isRefreshing = true;
    try {
      await refreshToken();
      refreshQueue.forEach((cb) => cb());
      refreshQueue = [];
      return request<T>(endpoint, options);
    } catch {
      refreshQueue = [];
      window.dispatchEvent(new Event("auth:logout"));
      throw new Error("Session expired");
    } finally {
      isRefreshing = false;
    }
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No error body");
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody}`);
  }

  return res.json() as Promise<T>;
};

export const getCurrentUser = () => request<User | null>("/me");

export const logout = () =>
  request<{ message: string }>("/logout", {
    method: "POST",
    headers: { "X-CSRF-TOKEN": getCSRFToken() },
  });

export const login = (username: string, password: string) =>
  request<{ message: string }>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify({ username, password }),
  });

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
      "X-CSRF-TOKEN": getCSRFToken(),
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
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const searchEpisodes = (query: string, page: number = 1) =>
  request<any>(`/episodes?search=${encodeURIComponent(query)}&page=${page}`);

export const refreshToken = () =>
  request<{ message: string }>("/refresh", {
    method: "POST",
    headers: { "X-CSRF-TOKEN": getCSRFRefreshToken() },
  });

function getCSRFRefreshToken(): string {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_refresh_token="))
      ?.split("=")[1] ?? ""
  );
}

function getCSRFToken(): string {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1] ?? ""
  );
}
