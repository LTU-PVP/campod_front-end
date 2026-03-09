import type {
  CollectionsResponse,
  CreateShowRequest,
  PodcastDetailResponse,
  SearchResponse,
  Show,
  UpdateShowRequest,
  User,
} from "../types";

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

  if (res.status === 401 && endpoint !== "/login") {
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
      isRefreshing = false;

      const retryOriginal = request<T>(endpoint, options);
      refreshQueue.forEach((cb) => cb());
      refreshQueue = [];
      return retryOriginal;
    } catch (err) {
      isRefreshing = false;
      refreshQueue = [];
      window.dispatchEvent(new Event("auth:logout"));
      throw err;
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

export const getCollections = (
  page: number = 1,
  filters?: {
    sort?: "newest" | "oldest" | "name";
    category?: string;
    user_id?: number;
    limit?: number;
  },
) => {
  const params = new URLSearchParams({ page: String(page) });
  if (filters?.sort) params.set("sort", filters.sort);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.user_id) params.set("user_id", String(filters.user_id));
  if (filters?.limit) params.set("limit", String(filters.limit));

  return request<CollectionsResponse>(`/collections?${params.toString()}`);
};

export const deleteCollection = (id: number | string) =>
  request<{ message: string }>(`/collections/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": getCSRFToken(),
    },
  });

export const updateCollection = (
  id: number | string,
  data: UpdateShowRequest,
) =>
  request<Show>(`/collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const getRecentEpisodes = (limit = 10): Promise<SearchResponse> =>
  request<SearchResponse>(`/episodes/recent?limit=${limit}`);

export const getUsers = (page: number = 1, limit: number = 50) =>
  request<{
    users: User[];
    total: number;
    pages: number;
    current_page: number;
  }>(`/users?page=${page}&limit=${limit}`);

export const createUser = (data: {
  username: string;
  password: string;
  role?: string;
}) =>
  request<User>("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const updateUser = (
  id: number | string,
  data: { username?: string; password?: string; role?: string },
) =>
  request<User>(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

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

export const searchEpisodes = (query: string, page: number = 1) =>
  request<any>(`/episodes?search=${encodeURIComponent(query)}&page=${page}`);

export const uploadAudio = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return request<{ file_path: string; file_url: string }>("/upload-audio", {
    method: "POST",
    body: formData,
  });
};

export const createEpisode = (data: {
  title: string;
  description?: string;
  collection_id: number;
  file_path: string;
  category?: string;
}) =>
  request<any>("/episode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const updateEpisode = (
  id: number,
  data: { title?: string; description?: string; category?: string },
) =>
  request<any>(`/episode/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const refreshToken = async (): Promise<void> => {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-REFRESH-CSRF-TOKEN": getCSRFRefreshToken(),
    },
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }
};

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
