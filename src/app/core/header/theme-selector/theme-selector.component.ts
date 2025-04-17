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

  isMenuOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe(color => {
      this.currentTheme = color;
    });
  }

  onThemeChange(colorTheme: Theme): void {
    console.log("onThemeChange")
    this.themeService.setTheme(colorTheme);
    this.turnOffMenu();
  }

  toggleMenu() {
    console.log("toggleMenu")
    this.isMenuOn = !this.isMenuOn;
  }

  turnOnMenu() {
    console.log("turnOnMenu")
    this.isMenuOn = true;
  }

  turnOffMenu() {
    console.log("turnOffMenu")
    this.isMenuOn = false;
  }

  focusOutMenu(event: FocusEvent) {
    console.log("focusOutMenu")
    const navCategory = event.currentTarget as HTMLElement;
    const relatedTarget = event.relatedTarget as Node;
    if (!navCategory.contains(relatedTarget)) {
      this.turnOffMenu();
    }
  }
}
