export interface Subcategory {
  title: string;
  link: string;
}

export interface Category {
  categoryTitle: string;
  subcategories: Subcategory[];
}

export interface HeaderNavigationItem {
  title: string;
  link: string;
  categories: Category[];
}