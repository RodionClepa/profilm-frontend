import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme, ThemeService } from '../services/theme/theme.service';
import { headerNavigation } from '../../shared/constants/header.constants';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentColorTheme: Theme = Theme.SYSTEM;
  themes = Theme;

  headerNavigation = headerNavigation;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.themeColor$.subscribe(color => {
      this.currentColorTheme = color;
    });
  }

  onThemeChange(colorTheme: Theme): void {
    this.themeService.setTheme(colorTheme);
  }

  tabIndex: number = -1;
  onSpacePress(event: Event) {
    event.preventDefault();
    this.tabIndex = this.tabIndex === 0 ? -1 : 0;
  }

  removeTabIndex() {
    this.tabIndex = -1;
  }
}
