import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent implements OnInit {
  currentTheme: Theme = Theme.SYSTEM;
  themes = Theme;
  tabIndex: number = -1;

  isMenuOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe(color => {
      this.currentTheme = color;
    });
  }

  onThemeChange(colorTheme: Theme): void {
    this.themeService.setTheme(colorTheme);
    this.turnOffMenu();
  }

  toggleMenu() {
    this.isMenuOn = !this.isMenuOn;
  }

  turnOnMenu() {
    this.isMenuOn = true;
    this.tabIndex = 0;
  }

  turnOffMenu() {
    this.isMenuOn = false;
    this.tabIndex = -1;
  }

  focusOutMenu(event: FocusEvent) {
    const navCategory = event.currentTarget as HTMLElement;
    const relatedTarget = event.relatedTarget as Node;
    if (!navCategory.contains(relatedTarget)) {
      this.turnOffMenu();
    }
  }
}
