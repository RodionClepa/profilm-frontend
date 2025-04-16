import { HeaderNavigationItem } from "../types/header.type";
import { PARAM_TOKENS, ROUTES_TOKENS } from "./routes-token.constants";

export const headerNavigation: HeaderNavigationItem[] = [
  {
    title: "Movies",
    link: `/${ROUTES_TOKENS.MOVIES}`,
    categories: [
      {
        categoryTitle: "Genre",
        subcategories: [
          {
            title: "Action",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.GENRE}=action`
          },
          {
            title: "Animation",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.GENRE}=animation`
          },
          {
            title: "Comedy",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.GENRE}=comedy`
          },
          {
            title: "Crime",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.GENRE}=crime`
          },
          {
            title: "Fantasy",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.GENRE}=fantasy`
          }
        ]
      },
      {
        categoryTitle: "Years",
        subcategories: [
          {
            title: "Movies of 2025",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.YEAR}=2025`
          },
          {
            title: "Movies of 2024",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.YEAR}=2024`
          },
          {
            title: "Movies of 2023",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.YEAR}=2023`
          },
          {
            title: "Movies of 2022",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.YEAR}=2022`
          },
          {
            title: "Movies of 2021",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.YEAR}=2021`
          },
        ]
      },
      {
        categoryTitle: "Country",
        subcategories: [
          {
            title: "American",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.COUNTRY}=US`
          },
          {
            title: "Russian",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.COUNTRY}=RU`
          },
          {
            title: "German",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.COUNTRY}=DE`
          },
          {
            title: "France",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.COUNTRY}=FR`
          },
          {
            title: "Brazil",
            link: `/${ROUTES_TOKENS.MOVIES}?${PARAM_TOKENS.COUNTRY}=BR`
          },
        ]
      }
    ]
  },
] as const;