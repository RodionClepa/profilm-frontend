import { Routes } from "@angular/router";
import { FilterContentComponent } from "./filter-content/filter-content.component";
import { LayoutComponent } from "../core/layout/layout.component";
import { LandingComponent } from "./landing/landing.component";
import { ROUTES_TOKENS } from "../shared/constants/routes-token.constants";
import { MovieComponent } from "./movie/movie.component";
import { TvComponent } from "./tv/tv.component";

export const featuresRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: LandingComponent
      },
      {
        path: `${ROUTES_TOKENS.MOVIE}/:id`,
        component: MovieComponent
      },
      {
        path: `${ROUTES_TOKENS.TV}/:id`,
        component: TvComponent
      }
    ]
  },
];