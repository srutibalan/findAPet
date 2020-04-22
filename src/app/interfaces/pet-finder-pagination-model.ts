export interface PetFinderPaginationModel {
  count_per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
  _links: Links;
}
export interface Links {
  next: Next;
}
export interface Next {
  href: string;
}
