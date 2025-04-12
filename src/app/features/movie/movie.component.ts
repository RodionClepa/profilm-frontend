import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ROUTES_TOKENS } from '../../shared/constants/routes-token.constants';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieDetailsResponse } from '../../shared/types/movie-details.type';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { RatingBarComponent } from "../../shared/components/rating-bar/rating-bar.component";

@Component({
  selector: 'app-movie',
  imports: [DatePipe, CommonModule, LoaderComponent, RatingBarComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  movie: MovieDetailsResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmMediaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && /^\d+$/.test(id) && Number(id) > 0) {
      this.getMovieData(Number(id));
    } else {
      this.router.navigate(['/', ROUTES_TOKENS.NOT_FOUND]);
    }
  }

  getMovieData(id: number) {
    this.filmService.movieDetails(id).subscribe({
      next: (response: MovieDetailsResponse) => {
        this.movie = response;
      },
      error: (error) => {
        console.error('Failed to fetch movie:', error);
        this.router.navigate(['/', ROUTES_TOKENS.NOT_FOUND]);
      },
    });
  }

  formatRuntime(minutes: number): string {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}
