import { Genre } from "./genre.type";
import { ProductionCompany } from "./production.type";

export interface MovieImage {
  filePath: string
  voteAverage: number;
  voteCount: number;
}

export interface MovieReview {
  id: string;
  author: string;
  avatarPath: string;
  rating: number | null;
  content: string;
}

export interface MovieReviewsResult {
  page: number;
  results: MovieReview[];
  totalPages: number;
  totalResults: number;
}

export interface MovieVideo {
  id: string;
  name: string;
  official: boolean;
  link: string;
}

export interface MovieDetailsResponse {
  id: number;
  title: string;
  adult: boolean;
  budget: number;
  genres: Genre[];
  overview: string;
  poster: string;
  popularity: number;
  releaseDate: Date;
  revenue: number;
  status: string;
  voteAverage: number;
  voteCount: number;
  tagline: string;
  runtime: number;
  productionCompanies: ProductionCompany[],
  images: MovieImage[],
  reviews: MovieReviewsResult,
  videos: MovieVideo[]
}