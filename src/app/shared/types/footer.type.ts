export interface FooterSubcategory {
  title: string;
  link: string;
  queryParams: { [key: string]: any };
}

export interface FooterCategory {
  title: string;
  link: string;
  subcategories: FooterSubcategory[];
}