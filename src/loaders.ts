import type { LoaderFunctionArgs } from "react-router";
import { getCollection, getCollections } from "./api/podcast-service";
import type { PodcastDetailResponse, Show } from "./types/show";

export interface CollectionsLoader {
  collections: Promise<Show[]>;
}

export interface CollectionLoader {
  collection: Promise<PodcastDetailResponse>;
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
