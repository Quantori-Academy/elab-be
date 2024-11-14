import { CompleteOrderData, OrderList, OrderWithReagents } from '../types/order.type';
import { OrderOptions } from '../types/orderOptions.type';
import { UpdateOrderDto } from '../dto/updateOrder.dto';

export interface IOrderService {
  createOrder(orderDto: CompleteOrderData): Promise<OrderWithReagents>;
  orderList(options: OrderOptions): Promise<OrderList>;
  updateOrder(id: number, data: UpdateOrderDto): Promise<OrderWithReagents>;
  getOrderById(id: number): Promise<OrderWithReagents | null>;
}
