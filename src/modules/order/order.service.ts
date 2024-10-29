import { Inject, Injectable, Logger } from '@nestjs/common';
import { ORDER_REPOSITORY_TOKEN } from './order.repository';
import { IOrderService } from './interfaces/orderService.interface';
import { IOrderRepository } from './interfaces/orderRepository.interface';
import { CompleteOrderData, OrderWithReagents } from './types/order.type';

@Injectable()
export class OrderService implements IOrderService {
  private readonly logger: Logger = new Logger(OrderService.name);

  constructor(@Inject(ORDER_REPOSITORY_TOKEN) private orderRepository: IOrderRepository) {}

  async createOrder(orderDto: CompleteOrderData): Promise<OrderWithReagents> {
    try {
      this.logger.log(`[${this.createOrder.name}] - Method start`);
      const order: OrderWithReagents = await this.orderRepository.create(orderDto);
      this.logger.log(`[${this.createOrder.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.createOrder.name}] - Exception thrown: ` + error);
      throw error;
    }
  }
}

const ORDER_SERVICE_TOKEN = Symbol('ORDER_SERVICE_TOKEN');
const OrderServiceProvider = {
  provide: ORDER_SERVICE_TOKEN,
  useClass: OrderService,
};

export { OrderServiceProvider, ORDER_SERVICE_TOKEN };
