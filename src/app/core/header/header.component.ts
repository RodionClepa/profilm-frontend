import { Component, computed, inject, WritableSignal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { headerNavigation } from '../../shared/constants/header.constants';
import { ThemeSelectorComponent } from "./theme-selector/theme-selector.component";
import { AuthService } from '../../shared/services/auth/auth.service';
import { GoogleAuthService } from '../../shared/services/google-auth/google-auth.service';
import { JwtPayload } from '../../shared/types/auth.type';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeSelectorComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headerNavigation = headerNavigation;
  authService = inject(AuthService);
  isAuthenticated = computed(() => this.authService.isAuthenticated());
  data = computed(() => this.authService.data());
  googleAuthService = inject(GoogleAuthService);

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

  handleSignIn() {
    if (this.isAuthenticated()) {
      this.authService.signOut();
    }
    else {
      this.googleAuthService.loginWithGoogle();
    }
  }
}
