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

  openedTab: string | null = "";

  tabIndex: number = -1;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.themeColor$.subscribe(color => {
      this.currentColorTheme = color;
    });
  }

  onThemeChange(colorTheme: Theme): void {
    this.themeService.setTheme(colorTheme);
  }

  openNav(navName: string) {
    this.openedTab = navName;
  }

  closeNav() {
    console.log("closeNav")
    this.openedTab = null;
  }

  onSpacePress(event: Event) {
    event.preventDefault();
    this.tabIndex = this.tabIndex === 0 ? -1 : 0;
  }

  onFocusIn(navName: string) {
    this.openedTab = navName;
    this.tabIndex = -1;
  }

  onFocusOut() {
    if (this.tabIndex === -1) this.openedTab = null;
  }

  onCategory(event: FocusEvent) {
    const navCategory = event.currentTarget as HTMLElement;
    const relatedTarget = event.relatedTarget as Node;

    if (!navCategory.contains(relatedTarget)) {
      this.closeNav();
    }
  }
}
