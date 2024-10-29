import { CompleteOrderData, OrderWithReagents } from '../types/order.type';

export interface IOrderService {
  createOrder(orderDto: CompleteOrderData): Promise<OrderWithReagents>;
}
