import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { MovieResponse, TVResponse } from '../../types/MovieTv.type';
import { posterSize } from '../../constants/image-sizes.constants';

@Injectable({
  providedIn: 'root'
})
export class FilmMediaService {

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService) { }

  private buildFilmPopularParams(page: number, adult: boolean, imageSize: number): HttpParams {
    return new HttpParams()
      .set('page', page.toString())
      .set('adult', adult.toString())
      .set('imageSize', imageSize.toString());
  }

  moviePopular({ page = 1, adult = false, imageSize = posterSize.Large }: { page?: number, adult?: boolean, imageSize?: number }): Observable<MovieResponse> {
    const params = this.buildFilmPopularParams(page, adult, imageSize);

    return this.http.get<MovieResponse>(this.apiService.popularMovies(), { params })
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('moviePopular'))
      );
  }

  tvPopular({ page = 1, adult = false, imageSize = posterSize.Large }: { page?: number, adult?: boolean, imageSize?: number }): Observable<TVResponse> {
    const params = this.buildFilmPopularParams(page, adult, imageSize);
    return this.http.get<TVResponse>(this.apiService.popularTV(), { params })
      .pipe(
        catchError(this.errorHandler.handleError<TVResponse>('tvPopular'))
      );
  }
}
