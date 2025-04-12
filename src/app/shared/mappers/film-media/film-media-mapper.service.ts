import { Injectable } from '@angular/core';
import { Movie, TV } from '../../types/movie-tv.type';
import { formatDate } from '@angular/common';
import { SwiperCard } from '../../components/swiper-horizontal-films/swiper-horizontal-films.component';
import { PromoCard } from '../../../features/landing/promo-slider/promo-slider.component';

@Injectable({
  providedIn: 'root'
})
export class FilmMediaMapperService {

  constructor() { }

  public movieToSwipperCard(movie: Movie): SwiperCard {
    const formattedReleaseDate = formatDate(movie.releaseDate, 'MMM d, y', 'en-US');

    return {
      id: movie.id,
      title: movie.title,
      subTitle: formattedReleaseDate || '',
      posterPath: movie.posterPath
    }
  }

  public tvToSwipperCard(movie: TV): SwiperCard {
    const formattedReleaseDate = formatDate(movie.releaseDate, 'MMM d, y', 'en-US');

    return {
      id: movie.id,
      title: movie.name,
      subTitle: formattedReleaseDate || '',
      posterPath: movie.posterPath
    }
  }

  public movieToPromoCard(movie: Movie): PromoCard {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.releaseDate,
      overview: movie.overview,
      posterPath: movie.posterPath
    }
  }
}
