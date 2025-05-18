import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, Observable } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService) { }

  exchangeUUID(uuid: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.apiService.exchangeUUIDForJWT()}?uuid=${uuid}`).pipe(
      catchError(this.errorHandler.handleError<{ token: string }>('exchangeUUID'))
    )
  }
}
