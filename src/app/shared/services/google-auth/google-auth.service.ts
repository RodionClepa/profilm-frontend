import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  loginWithGoogle(): void {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = environment.googleClientId;
    const redirectUri = this.apiService.googleCallback();
    const scope = 'email profile';
    const responseType = 'code';
    const accessType = 'offline';
    const prompt = 'select_account';

    const url = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      url,
      'google-auth',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Handle the response from the popup
    const handleMessage = (event: MessageEvent) => {
      const expectedOrigin = environment.production
        ? environment.apiUrl
        : 'http://localhost:4200';

      if (event.origin !== expectedOrigin) return;

      if (event.data.type !== 'uuid_exchange') return;

      const uuid = event.data.uuid;
      if (uuid) {
        firstValueFrom(this.authService.exchangeUUID(uuid));
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);
  }
}
