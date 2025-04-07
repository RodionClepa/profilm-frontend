import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { MovieResponse } from '../../types/MovieTv.type';
import { posterSize } from '../../constants/image-sizes.constants';

@Injectable({
  providedIn: 'root'
})
export class FilmMediaService {

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService) { }

  moviePopular(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiService.popularMovies()}?imageSize=${posterSize.Large}`)
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('moviePopular'))
      );
  }


}
