import { Injectable } from '@angular/core';
import { Movie, TV } from '../../types/movie-tv.type';
import { formatDate } from '@angular/common';
import { SwiperCard } from '../../components/swiper-horizontal-films/swiper-horizontal-cards.component';
import { PromoCard } from '../../../features/landing/promo-slider/promo-slider.component';
import { ROUTES_TOKENS } from '../../constants/routes-token.constants';
import { TVSeasonDetails } from '../../types/tv-details.type';
import { AirDateSeason } from '../../../features/air-dates/air-dates.component';

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
      posterPath: movie.posterPath,
      link: `/${ROUTES_TOKENS.MOVIE}/${movie.id}`
    }
  }

  public tvToSwipperCard(tv: TV): SwiperCard {
    const formattedReleaseDate = formatDate(tv.releaseDate, 'MMM d, y', 'en-US');

    return {
      id: tv.id,
      title: tv.title,
      subTitle: formattedReleaseDate || '',
      posterPath: tv.posterPath,
      link: `/${ROUTES_TOKENS.TV}/${tv.id}`
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

  public tvSeasonToAirDate(season: TVSeasonDetails): AirDateSeason {
    const today = new Date();
    return {
      id: season.id,
      seasonNumber: season.seasonNumber,
      airDate: season.airDate,
      episodes: season.episodes.map(episode => {
        return {
          airDate: episode.airDate,
          episodeNumber: episode.episodeNumber,
          id: episode.id,
          name: episode.name,
          runtime: episode.runtime,
          released: new Date(episode.airDate) <= today
        };
      }).sort((a, b) => new Date(b.airDate).getTime() - new Date(a.airDate).getTime())
    };
  }
}
