import { Order } from '@prisma/client';
import { CompleteOrderData, OrderList, OrderWithReagents } from '../types/order.type';
import { OrdereOptions } from '../types/orderOptions.type';
import { UpdateOrderDto } from '../dto/updateOrder.dto';

export interface IOrderService {
  createOrder(orderDto: CompleteOrderData): Promise<OrderWithReagents>;
  orderList(options: OrdereOptions): Promise<OrderList>;
  updateOrder(id: number, data: UpdateOrderDto): Promise<Order>;
}
