import type { Episode } from "./episode";
import type { Show } from "./show";
import type { User } from "./user";

export interface CollectionsResponse {
  collections: Show[];
  current_page: number;
  filters: {
    category: string | null;
    user_id: number | null;
  };
  pages: number;
  total: number;
}

export interface PodcastDetailResponse {
  show: Show;
  episodes: Episode[];
}

export interface CreateShowRequest {
  name: string;
  description?: string;
  creator_name?: string;
}

export interface UpdateShowRequest {
  name: string;
  description?: string;
  creator_name?: string;
}

export interface SearchResponse {
  episodes: Episode[];
  total: number;
  pages: number;
  current_page: number;
  applied_filters: Record<string, string | number | null>;
}

export interface UsersResponse {
  users: User[];
  total: number;
  pages: number;
  current_page: number;
}
