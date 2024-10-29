import { Order, ReagentRequest } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrder.dto';

type OnlyReagentId = {
  id: number;
};
type OrderWithReagents = Order & {
  reagents: ReagentRequest[];
};

type OrderList = {
  orders: OrderWithReagents[];
  size: number;
};

type CompleteOrderData = CreateOrderDto & {
  userId: number;
};

export { OrderWithReagents, OrderList, CompleteOrderData, OnlyReagentId };
