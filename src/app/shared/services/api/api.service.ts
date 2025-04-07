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

  public popularMovies(): string {
    return `${this.movies()}/popular`;
  }
}
