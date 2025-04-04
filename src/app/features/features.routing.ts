import { Routes } from "@angular/router";
import { FilterContentComponent } from "./filter-content/filter-content.component";
import { LayoutComponent } from "../core/layout/layout.component";

export const featuresRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "movie",
        component: FilterContentComponent
      },
    ]
  },
];