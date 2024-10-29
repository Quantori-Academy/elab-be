import { Order, ReagentRequest, Status } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrder.dto';

type OrderWithReagents = Order & {
  reagents: ReagentRequest[];
};

type OrderList = {
  orders: OrderWithReagents[];
  size: number;
};

type CompleteOrderData = CreateOrderDto & {
  userId: number;
  status: Status;
};

export { OrderWithReagents, OrderList, CompleteOrderData };
