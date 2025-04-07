import { Routes } from "@angular/router";
import { FilterContentComponent } from "./filter-content/filter-content.component";
import { LayoutComponent } from "../core/layout/layout.component";
import { LandingComponent } from "./landing/landing.component";

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
        path: "movie",
        component: FilterContentComponent
      },
    ]
  },
];