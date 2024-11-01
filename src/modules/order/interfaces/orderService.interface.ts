import { CompleteOrderData, OrderList, OrderWithReagents } from '../types/order.type';
import { OrdereOptions } from '../types/orderOptions.type';

export interface IOrderService {
  createOrder(orderDto: CompleteOrderData): Promise<OrderWithReagents>;
  orderList(options: OrdereOptions): Promise<OrderList>;
}
