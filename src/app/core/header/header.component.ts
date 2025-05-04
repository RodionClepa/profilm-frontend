import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { headerNavigation } from '../../shared/constants/header.constants';
import { ThemeSelectorComponent } from "./theme-selector/theme-selector.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeSelectorComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  headerNavigation = headerNavigation;

  openedTab: string | null = "";
  sidebar: boolean = false;

  tabIndex: number = -1;

  openNav(navName: string) {
    this.openedTab = navName;
  }

  closeNav() {
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

  openSideBar() {
    this.sidebar = true;
  }

  closeSidebar() {
    this.sidebar = false;
  }
}
