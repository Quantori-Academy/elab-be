import { Status } from '@prisma/client';

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type OrderBy =
  | {
      updatedAt?: Order;
      createdAt?: Order;
      title?: Order;
      seller?: Order;
    }
  | undefined;

type OrderSortOptions = {
  chronologicalDate?: {
    updatedAt?: Order | undefined;
    createdAt?: Order | undefined;
  };
  alphabetical?: {
    title?: Order | undefined;
    seller?: Order | undefined;
  };
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

type OrderOptions = {
  filter: OrderFilterOptions;
  sort: OrderSortOptions;
  pagination: OrderPaginationOptions;
};

export { OrderOptions, OrderFilterOptions, OrderSortOptions, OrderPaginationOptions, Order, OrderBy };
