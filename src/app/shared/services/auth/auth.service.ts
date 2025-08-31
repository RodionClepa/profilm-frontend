import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, Observable, tap } from 'rxjs';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';
import { JwtService } from '../jwt/jwt.service';
import { STORAGE_TOKEN_KEY } from '../../constants/storage.constants';
import { JwtPayload } from '../../types/auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated: WritableSignal<boolean> = signal(false);
  public isAuthenticated: Signal<boolean> = this._isAuthenticated.asReadonly();

  private _data: WritableSignal<JwtPayload | null> = signal(null);
  public data: Signal<JwtPayload | null> = this._data.asReadonly();

  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService, private jwtService: JwtService) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    this.updateStatus();
  }

  private async updateStatus(): Promise<void> {
    const isAuthenticated = await this.checkIsAuthenticated();
    this._isAuthenticated.set(isAuthenticated);
    if (this._isAuthenticated()) {
      const token: string | null = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (token === null) {
        return;
      }
      this._data.set(this.jwtService.getDataFromJWT(token))
    }
  }

  exchangeUUID(uuid: string): Observable<{ token: string }> {
    return this.http
      .get<{ token: string }>(`${this.apiService.exchangeUUIDForJWT()}?uuid=${uuid}`)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.updateStatus()
          }
        }),
        catchError(this.errorHandler.handleError<{ token: string }>('exchangeUUID'))
      );
  }

  signOut() {
    this._isAuthenticated.set(false);
    this._data.set(null);
  }

  async checkIsAuthenticated(): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }
    const token: string | null = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (token === null) {
      return false;
    }
    return await this.jwtService.verifyJWT(token);
  }
}
