export interface Review {
  id: string;
  author: string;
  avatarPath: string;
  rating: number | null;
  content: string;
}

export interface ReviewsResult {
  page: number;
  results: Review[];
  totalPages: number;
  totalResults: number;
}