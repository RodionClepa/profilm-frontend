export interface CastResponse {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
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