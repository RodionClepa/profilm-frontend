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