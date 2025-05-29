import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { MovieResponse, TVResponse } from '../../types/movie-tv.type';
import { posterSize } from '../../constants/image-sizes.constants';
import { TimeWindow } from '../../constants/movieApi.constants';
import { MovieDetailsResponse } from '../../types/movie-details.type';
import { TVDetailsResponse } from '../../types/tv-details.type';
import { FilmMediaMapperService } from '../../mappers/film-media/film-media-mapper.service';
import { SearchMediaType } from '../../../features/search/search.component';
import { SearchMediaResults } from '../../types/media.type';

@Injectable({
  providedIn: 'root'
})
export class FilmMediaService {

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService, private filmMediaMapper: FilmMediaMapperService) { }

  private buildFilmPopularParams(page: number, adult: boolean, imageSize: number): HttpParams {
    return new HttpParams()
      .set('page', page.toString())
      .set('includeAdult', adult.toString())
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

  private buildMediaParams(page: number, includeAdult: boolean, imageSize: number, searchName: string): HttpParams {
    return new HttpParams()
      .set('page', page.toString())
      .set('includeAdult', includeAdult.toString())
      .set('imageSize', imageSize.toString())
      .set('searchName', searchName)
  }

  searchMedia(type: string, { page = 1, includeAdult = false, imageSize = posterSize.extraLarge, searchName }: { page?: number, includeAdult?: boolean, imageSize?: number, searchName: string }): Observable<SearchMediaResults> {

    if (type === SearchMediaType.MOVIE) {
      return this.searchMovies({
        page: page,
        includeAdult: includeAdult,
        imageSize: imageSize,
        searchName: searchName
      }).pipe(
        map((response: MovieResponse) => {
          return {
            page: response.page,
            results: response.results.map((movie) => this.filmMediaMapper.searchResultMovieCard(movie)),
            totalPages: response.totalPages,
            totalResults: response.totalResults
          };
        })
      );
    }
    else if (type === SearchMediaType.TV) {
      return this.searchTVs({
        page: page,
        includeAdult: includeAdult,
        imageSize: imageSize,
        searchName: searchName
      }).pipe(
        map((response: TVResponse) => {
          console.log("response", response);
          return {
            page: response.page,
            results: response.results.map((tv) => this.filmMediaMapper.searchResultTVCard(tv)),
            totalPages: response.totalPages,
            totalResults: response.totalResults
          };
        })
      );
    }

    return of({
      page: 0,
      results: [],
      totalPages: 0,
      totalResults: 0
    });
  }

  private searchMovies({ page = 1, includeAdult = false, imageSize = posterSize.extraLarge, searchName }: { page?: number, includeAdult?: boolean, imageSize?: number, searchName: string }): Observable<MovieResponse> {
    const params = this.buildMediaParams(page, includeAdult, imageSize, searchName);
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<MovieResponse>(this.apiService.searchMovies(), { headers, params })
      .pipe(
        catchError(this.errorHandler.handleError<MovieResponse>('searchMovies'))
      );
  }

  private searchTVs({ page = 1, includeAdult = false, imageSize = posterSize.extraLarge, searchName }: { page?: number, includeAdult?: boolean, imageSize?: number, searchName: string }): Observable<TVResponse> {
    const params = this.buildMediaParams(page, includeAdult, imageSize, searchName);
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TVResponse>(this.apiService.searchTVs(), { headers, params })
      .pipe(
        catchError(this.errorHandler.handleError<TVResponse>('searchTVs'))
      );
  }
}
