enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type OrderBy =
  | {
      name?: Order;
      createdAt?: Order;
    }
  | undefined;

type SortOptions = {
  chronologicalDate: Order | undefined;
  alphabeticalName: Order | undefined;
};

type FilterOptions = {
  id: number | undefined;
  roomId: number | undefined;
  storageName: string | undefined;
};

type PaginationOptions = {
  skip: number | undefined;
  take: number | undefined;
};

type StorageOptions = {
  filter: FilterOptions;
  sort: SortOptions;
  pagination: PaginationOptions;
};

export { StorageOptions, FilterOptions, SortOptions, PaginationOptions, Order, OrderBy };
