import { Component, OnInit } from '@angular/core';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieResponse, TVResponse } from '../../shared/types/movie-tv.type';
import { SwiperCard, SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';
import { TimeWindow } from '../../shared/constants/movieApi.constants';
import { PromoCard, PromoSliderComponent } from "./promo-slider/promo-slider.component";
import { posterSize } from '../../shared/constants/image-sizes.constants';

@Component({
  selector: 'app-landing',
  imports: [SwiperHorizontalCardsComponent, PromoSliderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  constructor(private filmMediaService: FilmMediaService, private filmMediaMapper: FilmMediaMapperService) { }

  popularMovies: SwiperCard[] = [];
  popularTV: SwiperCard[] = [];
  trendingMovies: SwiperCard[] = [];
  trendingTVs: SwiperCard[] = [];
  upcomingMovies: PromoCard[] = [];

  ngOnInit() {
    this.filmMediaService.moviePopular({}).subscribe({
      next: (response: MovieResponse) => {
        this.popularMovies = response.results.map((movie) => this.filmMediaMapper.movieToSwipperCard(movie));
      }
    });

    this.filmMediaService.tvPopular({}).subscribe({
      next: (response: TVResponse) => {
        this.popularTV = response.results.map((tv) => this.filmMediaMapper.tvToSwipperCard(tv));
      }
    });

    this.filmMediaService.movieTrending({ timeWindow: TimeWindow.WEEK }).subscribe({
      next: (response: MovieResponse) => {
        this.trendingMovies = response.results.map((movie) => this.filmMediaMapper.movieToSwipperCard(movie));
      }
    });

    this.filmMediaService.tvTrending({ timeWindow: TimeWindow.WEEK }).subscribe({
      next: (response: TVResponse) => {
        this.trendingTVs = response.results.map((tv) => this.filmMediaMapper.tvToSwipperCard(tv));
      }
    });

    this.filmMediaService.movieUpcoming({ imageSize: posterSize.Large }).subscribe({
      next: (response: MovieResponse) => {
        this.upcomingMovies = response.results.map((movie) => this.filmMediaMapper.movieToPromoCard(movie));
      }
    });
  }
}
