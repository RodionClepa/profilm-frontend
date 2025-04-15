import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  filmId = input.required<number>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.loadKinoboxScript();
  }

  private loadKinoboxScript(): void {
    const script = document.createElement('script');
    script.src = 'https://kinobox.tv/kinobox.min.js';
    script.async = true;
    script.onload = () => {
      this.initializePlayer();
    };
    script.onerror = () => {
      console.error('Failed to load Kinobox script');
    };
    document.body.appendChild(script);
  }

  private initializePlayer(): void {
    (window as any).kbox('.kinobox_player', {
      search: { tmdb: this.filmId() }, menu: {
        default: 'menu_list',
        mobile: 'menu_button'
      }
    });
  }

}
