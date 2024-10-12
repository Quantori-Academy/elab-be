type Order = 'asc' | 'desc';

type SortOptions = {
  chronological: Order;
  alphabetical: Order;
};

type FilterOptions = {
  room: string;
  name: string;
};

type PaginationOptions = {
  start: number;
  count: number;
};

export { FilterOptions, SortOptions, PaginationOptions };
