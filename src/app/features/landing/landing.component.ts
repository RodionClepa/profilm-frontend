import { Component, OnInit } from '@angular/core';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieResponse, TVResponse } from '../../shared/types/MovieTv.type';
import { SwiperCard, SwiperHorizontalFilmsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-films.component";
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';

@Component({
  selector: 'app-landing',
  imports: [SwiperHorizontalFilmsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  constructor(private filmMediaService: FilmMediaService, private filmMediaMapper: FilmMediaMapperService) { }

  popularMovies: SwiperCard[] = [];
  popularTV: SwiperCard[] = [];

  ngOnInit() {
    this.filmMediaService.moviePopular({}).subscribe({
      next: (response: MovieResponse) => {
        this.popularMovies = response.results.map((movie) => this.filmMediaMapper.movieToSwipperCard(movie));
      }
    });

    this.filmMediaService.tvPopular({}).subscribe({
      next: (response: TVResponse) => {
        this.popularTV = response.results.map((tv) => this.filmMediaMapper.tvToSwipperCard(tv));;
      }
    });
  }
}
