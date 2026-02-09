export interface Show {
  id: number;
  name: string;
  description: string;
  creator_name: string | null;
}

export interface Episode {
  id: number;
  collection_id: number;
  collection_name: string;
  description: string;
  file_path: string;
  title: string;
}

export interface PodcastDetailResponse {
  show: Show;
  episodes: Episode[];
}
