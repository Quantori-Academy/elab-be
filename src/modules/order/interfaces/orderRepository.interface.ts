import { CompleteOrderData, OrderList, OrderWithReagents } from '../types/order.type';
import { Order } from '@prisma/client';
import { PartialWithRequiredId } from 'src/common/types/idRequired.type';
import { OrderFilterOptions, OrderPaginationOptions, OrderSortOptions } from '../types/orderOptions.type';

export interface IOrderRepository {
  findById(id: number): Promise<Order | null>;
  findById(id: number, includeReagents: true): Promise<OrderWithReagents | null>;
  findById(id: number, includeReagents?: false): Promise<Order | null>;
  findAll(filterBy?: OrderFilterOptions, pagination?: OrderPaginationOptions, sortOptions?: OrderSortOptions): Promise<OrderList>;
  create(data: CompleteOrderData): Promise<OrderWithReagents>;
  update(order: PartialWithRequiredId<Order>): Promise<Order>;
  upsert(order: Order): Promise<void>;
  delete(id: number): Promise<OrderWithReagents>;
}
