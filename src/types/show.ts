export interface Show {
  id: number;
  name: string;
  description: string;
  creator_name: string | null;
  cover_image_path: string | null;
  category: string | null;
}

export interface Episode {
  id: number;
  collection_id: number;
  collection_name: string;
  description: string;
  file_path: string;
  title: string;
  category: string | null;
}

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

export interface SearchResponse {
  episodes: Episode[];
  total: number;
  pages: number;
  current_page: number;
  applied_filters: any;
}
