import { Genre } from "./genre.type";
import { Movie } from "./movie-tv.type";
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

export interface MovieCrew {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profilePath: string | null;
  job: string;
}

export interface MovieCast {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
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
  productionCompanies: ProductionCompany[];
  images: MovieImage[];
  reviews: MovieReviewsResult;
  videos: MovieVideo[];
  director: MovieCrew | null;
  producer: MovieCrew | null;
  cast: MovieCast[];
  recommendations: Movie[];
}