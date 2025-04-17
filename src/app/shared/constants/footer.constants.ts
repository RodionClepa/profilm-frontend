import { FooterCategory } from "../types/footer.type";
import { PARAM_TOKENS, ROUTES_TOKENS } from "./routes-token.constants";

export const footerNavigation: FooterCategory[] = [
  {
    title: "Movie",
    link: `/${ROUTES_TOKENS.MOVIES}`,
    subcategories: [
      {
        title: "Popular",
        link: `/${ROUTES_TOKENS.MOVIES}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'popularity' }
      },
      {
        title: "Vote Count",
        link: `/${ROUTES_TOKENS.MOVIES}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'vote_count' }
      },
      {
        title: "Vote Average",
        link: `/${ROUTES_TOKENS.MOVIES}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'vote_average' }
      },
      {
        title: "Release Date",
        link: `/${ROUTES_TOKENS.MOVIES}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'primary_release_date' }
      },
      {
        title: "Revenue",
        link: `/${ROUTES_TOKENS.MOVIES}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'revenue' }
      },
    ]
  },
  {
    title: "TV Series",
    link: `/${ROUTES_TOKENS.TVS}`,
    subcategories: [
      {
        title: "Popular",
        link: `/${ROUTES_TOKENS.TVS}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'popularity' }
      },
      {
        title: "Vote Count",
        link: `/${ROUTES_TOKENS.TVS}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'vote_count' }
      },
      {
        title: "Vote Average",
        link: `/${ROUTES_TOKENS.TVS}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'vote_average' }
      },
      {
        title: "Release Date",
        link: `/${ROUTES_TOKENS.TVS}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'first_air_date' }
      },
      {
        title: "Revenue",
        link: `/${ROUTES_TOKENS.TVS}`,
        queryParams: { [PARAM_TOKENS.SORTBY]: 'revenue' }
      },
    ]
  }
] as const;