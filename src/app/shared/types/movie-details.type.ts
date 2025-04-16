import { CastResponse, MovieCrew } from "./credits.type";
import { Genre } from "./genre.type";
import { ImageResponse } from "./image.type";
import { Movie } from "./movie-tv.type";
import { ProductionCompany } from "./production.type";
import { ReviewsResult } from "./reviews.type";
import { VideoResponse } from "./video.type";

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
  images: ImageResponse[];
  reviews: ReviewsResult;
  videos: VideoResponse[];
  director: MovieCrew | null;
  producer: MovieCrew | null;
  cast: CastResponse[];
  recommendations: Movie[];
}