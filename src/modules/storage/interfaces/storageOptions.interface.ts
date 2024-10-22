enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type OrderBy =
  | {
      name?: Order;
      updatedAt?: Order;
    }
  | undefined;

type SortOptions = {
  chronologicalDate: Order | undefined;
  alphabeticalStorageName: Order | undefined;
};

type FilterOptions = {
  id: number | undefined;
  roomName: string | undefined;
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
