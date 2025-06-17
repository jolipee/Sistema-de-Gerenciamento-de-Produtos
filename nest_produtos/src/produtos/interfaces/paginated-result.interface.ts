export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}