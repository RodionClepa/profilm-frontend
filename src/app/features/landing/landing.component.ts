import { Component, OnInit } from '@angular/core';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { Movie, MovieResponse } from '../../shared/types/MovieTv.type';
import { SwiperHorizontalFilmsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-films.component";

@Component({
  selector: 'app-landing',
  imports: [SwiperHorizontalFilmsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  constructor(private filmMediaService: FilmMediaService) { }

  popularMovies: Movie[] = [];

  ngOnInit() {
    this.filmMediaService.moviePopular().subscribe({
      next: (response: MovieResponse) => {
        this.popularMovies = response.results;
      },
      error: (error) => {
        console.error(error.message)
      }
    });
  }
}
