export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type OrderBy = { name?: Order; createdAt?: Order; updatedAt?: Order } | undefined;

export type SortOptions = {
  sortByName?: Order;
  sortByCreationDate?: Order;
  sortByUpdatedDate?: Order;
};

export type FilterOptions = {
  name?: string;
  category?: string;
  storageId?: number;
};

export type PaginationOptions = {
  skip: number | undefined;
  take: number | undefined;
};

export type FlagOptions = {
  isFullStructure?: boolean;
};

export type ReagentOptions = {
  filter: FilterOptions;
  sort: SortOptions;
  pagination: PaginationOptions;
};

export type ReagentSearchOptions = {
  sort: SortOptions;
  pagination: PaginationOptions;
  structure: string;
  flag: FlagOptions;
};
