import type { LoaderFunctionArgs } from "react-router";
import {
  getCollection,
  getCollections,
  searchEpisodes,
} from "./api/podcast-service";
import type {
  CollectionsResponse,
  PodcastDetailResponse,
  SearchResponse,
} from "./types/show";

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

export const collectionsLoader = async (): Promise<CollectionsLoader> => {
  return {
    collections: getCollections(),
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
