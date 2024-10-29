import { CompleteOrderData, OrderList, OrderWithReagents } from '../types/order.type';
import { Order } from '@prisma/client';
import { PartialWithRequiredId } from 'src/common/types/idRequired.type';

export interface IOrderRepository {
  findById(id: number): Promise<Order | null>;
  findById(id: number, includeReagents: true): Promise<OrderWithReagents | null>;
  findById(id: number, includeReagents?: false): Promise<Order | null>;
  findAll(): Promise<OrderList>;
  create(data: CompleteOrderData): Promise<OrderWithReagents>;
  update(order: PartialWithRequiredId<Order>): Promise<OrderWithReagents>;
  upsert(order: Order): Promise<void>;
  delete(id: number): Promise<OrderWithReagents>;
}
