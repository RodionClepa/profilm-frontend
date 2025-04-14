import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme, ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentColorTheme: Theme = Theme.SYSTEM;
  themes = Theme;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.themeColor$.subscribe(color => {
      this.currentColorTheme = color;
    });
  }

  onThemeChange(colorTheme: Theme): void {
    this.themeService.setTheme(colorTheme);
  }
}
