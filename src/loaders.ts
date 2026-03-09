import type { LoaderFunctionArgs } from "react-router";
import {
  getCollection,
  getCollections,
  getRecentEpisodes,
  getUsers,
  searchEpisodes,
} from "./api/podcast-service";
import type {
  CollectionsResponse,
  PodcastDetailResponse,
  SearchResponse,
  UsersResponse,
} from "./types";

export interface DashboardLoader {
  collections: Promise<CollectionsResponse>;
  episodes: Promise<SearchResponse>;
}

export interface CollectionsLoader {
  collections: Promise<CollectionsResponse>;
}

export interface CollectionLoader {
  collection: Promise<PodcastDetailResponse>;
}

export interface SearchEpisodesLoader {
  response: Promise<SearchResponse>;
  query: string;
  currentPage: number;
}

export interface UsersLoader {
  users: Promise<UsersResponse>;
}

export const dashboardLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<DashboardLoader> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "4"), 50);

  return {
    collections: getCollections(page),
    episodes: getRecentEpisodes(limit),
  };
};

export const collectionsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<CollectionsLoader> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const sort = url.searchParams.get("sort") as
    | "newest"
    | "oldest"
    | "name"
    | null;
  const category = url.searchParams.get("category") || undefined;
  const user_id = url.searchParams.get("user_id");

  return {
    collections: getCollections(page, {
      ...(sort && { sort }),
      ...(category && { category }),
      ...(user_id && { user_id: parseInt(user_id) }),
    }),
  };
};

export const collectionLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<CollectionLoader> => {
  if (!params.id) throw new Error("Missing podcast id");
  const id = parseInt(params.id, 10);
  if (isNaN(id)) throw new Error("Invalid podcast id");
  return {
    collection: getCollection(id),
  };
};

export const searchEpisodesLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<SearchEpisodesLoader> => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const currentPage = Number(url.searchParams.get("page") || 1);

  if (!query) {
    return {
      response: Promise.resolve({
        episodes: [],
        total: 0,
        pages: 0,
        current_page: 1,
        applied_filters: {},
      }),
      query,
      currentPage,
    };
  }

  try {
    const responsePromise = searchEpisodes(query, currentPage);

    return {
      response: responsePromise,
      query,
      currentPage,
    };
  } catch (error) {
    throw error;
  }
};

export const usersLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<UsersLoader> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");

  return {
    users: getUsers(page),
  };
};
