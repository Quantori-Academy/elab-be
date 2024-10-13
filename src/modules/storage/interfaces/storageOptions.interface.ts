enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type SortOptions = {
  chronologicalDate: Order | undefined;
  alphabeticalName: Order | undefined;
};

type FilterOptions = {
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

export { StorageOptions, FilterOptions, SortOptions, PaginationOptions, Order };
