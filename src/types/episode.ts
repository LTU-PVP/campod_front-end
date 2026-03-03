export interface Episode {
  id: number;
  collection_id: number;
  collection_name: string;
  description: string;
  file_path: string;
  title: string;
  category: string | null;
}
