import { CardMedia } from "../components/card-media/card-media.component";

export interface SearchMediaResults {
  page: number;
  results: CardMedia[];
  totalPages: number;
  totalResults: number;
}