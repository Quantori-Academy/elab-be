import { Order, Prisma, ReagentRequest } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrder.dto';

type OnlyReagentId = {
  id: number;
};

type OrderWithReagents = Order & {
  reagents: ReagentRequest[];
};

type OrderWithReagentCountObject = Prisma.OrderGetPayload<{
  include: {
    reagents: true;
    _count: {
      select: {
        reagents: true;
      };
    };
  };
}>;

type OrderWithReagentCount = OrderWithReagents & {
  reagentCount: number;
};

type OrderList = {
  orders: OrderWithReagents[];
  size: number;
};

type CompleteOrderData = CreateOrderDto & {
  userId: number;
};

export { OrderWithReagents, OrderList, CompleteOrderData, OnlyReagentId, OrderWithReagentCountObject, OrderWithReagentCount };
