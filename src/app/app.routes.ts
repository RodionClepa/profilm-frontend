import { Routes } from '@angular/router';
import { featuresRoutes } from './features/features.routing';

export const routes: Routes = [
  {
    path: "",
    children: featuresRoutes
  }
];
