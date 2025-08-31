import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jose from 'jose';
import { AuthService } from '../auth/auth.service';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ErrorApiHandlerService } from '../error-api-handler/error-api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient, private apiService: ApiService, private errorHandler: ErrorApiHandlerService) { }

  async verifyJWT(jwt: string): Promise<boolean> {
    const alg = 'RS256';
    try {
      const spki = await firstValueFrom(this.getPublicKey());
      const publicKey = await jose.importSPKI(spki.key, alg);
      await jose.jwtVerify(jwt, publicKey);
      return true;
    } catch (error) {
      console.error('JWT Verification Failed:', error);
      return false;
    }
  }

  getDataFromJWT(jwt: string): any {
    try {
      const decoded = jose.decodeJwt(jwt);
      return decoded;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  getPublicKey(): Observable<{ key: string }> {
    return this.http.get<{ key: string }>(`${this.apiService.getPublicKey()}`).pipe(
      catchError(this.errorHandler.handleError<{ key: string }>('getPublicKey'))
    )
  }
}
