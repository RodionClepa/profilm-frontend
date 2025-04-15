import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { MovieResponse, TVResponse } from '../../types/movie-tv.type';
import { posterSize } from '../../constants/image-sizes.constants';
import { TimeWindow } from '../../constants/movieApi.constants';
import { MovieDetailsResponse } from '../../types/movie-details.type';
import { TVDetailsResponse } from '../../types/tv-details.type';

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

  movieTrending({ page = 1, adult = false, imageSize = posterSize.Large, timeWindow = TimeWindow.WEEK }: { page?: number, adult?: boolean, imageSize?: number, timeWindow?: TimeWindow }): Observable<MovieResponse> {
    let params = this.buildFilmPopularParams(page, adult, imageSize);
    params = params.append('timeWindow', timeWindow);
    return this.http.get<MovieResponse>(this.apiService.trendingMovies(), { params })
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('movieTrending'))
      );
  }

  tvTrending({ page = 1, adult = false, imageSize = posterSize.Large, timeWindow = TimeWindow.WEEK }: { page?: number, adult?: boolean, imageSize?: number, timeWindow?: TimeWindow }): Observable<TVResponse> {
    let params = this.buildFilmPopularParams(page, adult, imageSize);
    params = params.append('timeWindow', timeWindow);
    return this.http.get<TVResponse>(this.apiService.trendingTVs(), { params })
      .pipe(
        catchError(this.errorHandler.handleError<TVResponse>('tvTrending'))
      );
  }

  movieUpcoming({ page = 1, adult = false, imageSize = posterSize.extraLarge }: { page?: number, adult?: boolean, imageSize?: number }): Observable<MovieResponse> {
    let params = this.buildFilmPopularParams(page, adult, imageSize);
    return this.http.get<MovieResponse>(this.apiService.upcomingMovies(), { params })
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('movieUpcoming'))
      );
  }

  movieDetails(id: number): Observable<MovieDetailsResponse> {
    return this.http.get<MovieDetailsResponse>(this.apiService.movieById(id))
      .pipe(
        catchError(this.errorHandler.handleError<MovieDetailsResponse>('movieDetails'))
      );
  }

  tvDetails(id: number): Observable<TVDetailsResponse> {
    return this.http.get<TVDetailsResponse>(this.apiService.tvById(id))
      .pipe(
        catchError(this.errorHandler.handleError<TVDetailsResponse>('tvDetails'))
      );
  }
}
