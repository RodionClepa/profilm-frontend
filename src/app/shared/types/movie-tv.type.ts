export interface Movie {
  id: number;
  title: string;
  adult: boolean;
  genreIds: number[];
  releaseDate: Date;
  overview: string;
  posterPath: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface TV {
  id: number;
  name: string;
  genreIds: number[];
  adult: boolean;
  releaseDate: Date;
  overview: string;
  posterPath: string;
}

export interface TVResponse {
  page: number;
  results: TV[];
  totalPages: number;
  totalResults: number;
}