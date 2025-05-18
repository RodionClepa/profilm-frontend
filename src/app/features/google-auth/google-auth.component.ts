import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-google-auth',
  imports: [],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss'
})
export class GoogleAuthComponent {
  constructor(private authService: AuthService) { }

  async loginWithGoogle() {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = '85986930993-32aqufgu5av40es3g011tqibnhjhql55.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/api/auth/google/callback'; // Server callback
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

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:4200') return;

      if (event.data.type !== 'uuid_exchange') return;

      const uuid = event.data.uuid;
      if (uuid) {
        console.log('Received uuid:', uuid);
        this.authService.exchangeUUID(uuid).subscribe({
          next: (results) => {
            localStorage.setItem("token", results.token);
          }
        });
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);
  }
}
