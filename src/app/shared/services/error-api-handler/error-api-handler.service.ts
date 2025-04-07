import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorApiHandlerService {

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  public handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      let userMessage = 'An unexpected error occurred';
      if (error.status === 401) {
        userMessage = 'Authentication error. Please log in again.';
      } else if (error.status === 404) {
        userMessage = 'The requested resource was not found.';
      } else if (error.status >= 500) {
        userMessage = 'Server error. Please try again later.';
      } else if (error.error && error.error.message) {
        userMessage = error.error.message;
      } else if (error.message) {
        userMessage = error.message;
      }

      error.userMessage = userMessage;

      return throwError(() => error);
    };
  }
}
