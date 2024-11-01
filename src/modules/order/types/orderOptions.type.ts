import { Status } from '@prisma/client';

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type OrderBy =
  | {
      updatedAt?: Order;
    }
  | undefined;

type OrderSortOptions = {
  chronologicalDate?: Order | undefined;
};

type OrderFilterOptions = {
  title?: string | undefined;
  seller?: string | undefined;
  status?: Status | undefined;
};

type OrderPaginationOptions = {
  skip?: number | undefined;
  take?: number | undefined;
};

type OrdereOptions = {
  filter: OrderFilterOptions;
  sort: OrderSortOptions;
  pagination: OrderPaginationOptions;
};

export { OrdereOptions, OrderFilterOptions, OrderSortOptions, OrderPaginationOptions, Order, OrderBy };
