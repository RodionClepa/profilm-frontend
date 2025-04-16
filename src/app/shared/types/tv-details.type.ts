import { CastResponse } from "./credits.type";
import { Genre } from "./genre.type";
import { ImageResponse } from "./image.type";
import { TV } from "./movie-tv.type";
import { ReviewsResult } from "./reviews.type";
import { VideoResponse } from "./video.type";

export interface TVSeason {
  airDate: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
  voteAverage: number;
}

export interface TVSeasonEpisode {
  airDate: Date;
  episodeNumber: number;
  id: number;
  name: string;
  runtime: number;
}

export interface TVSeasonDetails {
  id: string;
  seasonNumber: number;
  airDate: Date;
  episodes: TVSeasonEpisode[];
}

export interface TVDetailsResponse {
  adult: boolean;
  releaseDate: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  production: boolean;
  lastAirDate: Date;
  title: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  overview: string;
  popularity: number;
  poster: string;
  seasons: TVSeason[];
  status: string;
  tagline: string;
  type: string;
  voteAverage: number;
  voteCount: number;
  images: ImageResponse[];
  reviews: ReviewsResult;
  videos: VideoResponse[];
  cast: CastResponse[];
  recommendations: TV[];
  seasonsEpisodes: TVSeasonDetails[];
}