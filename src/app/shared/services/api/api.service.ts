import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private api(): string {
    return environment.apiUrl + '/api';
  }

  private movies(): string {
    return `${this.api()}/movies`
  }

  private tv(): string {
    return `${this.api()}/tv`
  }

  public popularMovies(): string {
    return `${this.movies()}/popular`;
  }

  public popularTV(): string {
    return `${this.tv()}/popular`;
  }

  public trendingMovies(): string {
    return `${this.movies()}/trending`;
  }

  public trendingTVs(): string {
    return `${this.tv()}/trending`;
  }

  public upcomingMovies(): string {
    return `${this.movies()}/upcoming`;
  }

  public movieById(id: number): string {
    return `${this.api()}/movies/${id}`;
  }

  public tvById(id: number): string {
    return `${this.api()}/tv/${id}`;
  }

  private searchMedia(): string {
    return `${this.api()}/search`;
  }

  public searchMovies(): string {
    return `${this.searchMedia()}/movies`;
  }

  public searchTVs(): string {
    return `${this.searchMedia()}/tvs`;
  }
}
