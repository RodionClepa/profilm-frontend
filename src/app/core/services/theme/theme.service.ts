import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme-preference';
  private defaultTheme: Theme = 'system';
  private themeSubject = new BehaviorSubject<Theme>(this.defaultTheme);

  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initTheme();
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.storageKey) as Theme;

      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        this.themeSubject.next(savedTheme);
        this.applyTheme(savedTheme);
      } else {
        this.applyTheme(this.defaultTheme);
      }
    }
  }

  setTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
      this.themeSubject.next(theme);
      this.applyTheme(theme);
    }
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const html = document.documentElement;

    // Remove any existing theme classes
    html.classList.remove('light-theme', 'dark-theme');

    if (theme === 'system') {
      // Let the media query handle it
      html.removeAttribute('data-theme');
    } else {
      // Apply the specific theme
      html.setAttribute('data-theme', theme);
    }
  }

}
