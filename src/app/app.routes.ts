import { Routes } from '@angular/router';
import { featuresRoutes } from './features/features.routing';
import { ROUTES_TOKENS } from './shared/constants/routes-token.constants';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: "",
    children: featuresRoutes
  },
  {
    path: ROUTES_TOKENS.NOT_FOUND,
    component: NotFoundComponent
  }
];
