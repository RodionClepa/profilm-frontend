import { Component, OnInit } from '@angular/core';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieResponse } from '../../shared/types/MovieTv.type';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private filmMediaService: FilmMediaService) { }

  catch(): void {
    this.filmMediaService.moviePopular().subscribe({
      next: (response: MovieResponse) => {
        console.log(response)
      },
      error: (error) => {
        console.error(error.message)
      }
    });
  }
}
