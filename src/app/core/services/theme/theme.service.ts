import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme-preference';
  private defaultTheme: Theme = Theme.SYSTEM;
  private defaultColorTheme: Theme = Theme.DARK;
  private themeSubject = new BehaviorSubject<Theme>(this.defaultTheme);

  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initTheme();
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('initTheme')
      const savedTheme = localStorage.getItem(this.storageKey) as Theme;

      if (savedTheme && Object.values(Theme).includes(savedTheme)) {
        this.themeSubject.next(savedTheme);
        this.applyTheme(savedTheme);
      } else {
        this.applyTheme(this.defaultTheme);
      }

      this.handleSystemThemeChanges();
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

    html.classList.remove('light-theme', 'dark-theme');

    if (theme === Theme.SYSTEM) {
      this.applySystemTheme();
      html.setAttribute('data-theme', 'system');
    } else {
      html.setAttribute('data-theme', theme);
      html.classList.add(`${theme}-theme`);
    }
  }

  private applySystemTheme(): void {
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
  }

  private handleSystemThemeChanges(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.themeSubject.value === Theme.SYSTEM) {
        this.applySystemTheme();
      }
    });
  }
}