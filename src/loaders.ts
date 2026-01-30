import { getCollections } from "./api/podcast-service";
import type { Show } from "./types/show";

export interface CollectionsLoader {
  collections: Promise<Show[]>;
}

export const collectionsLoader = async (): Promise<CollectionsLoader> => {
  return {
    collections: getCollections(),
  };
};
