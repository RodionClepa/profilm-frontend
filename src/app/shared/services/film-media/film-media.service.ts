import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { MovieResponse } from '../../types/MovieTv.type';

@Injectable({
  providedIn: 'root'
})
export class FilmMediaService {

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService) { }

  moviePopular(page: number = 0, adult: boolean = false): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiService.popularMovies()}?page=${page}&adult=${adult}`)
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('moviePopular'))
      );
  }


}
