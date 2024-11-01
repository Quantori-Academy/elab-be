import { Inject, Injectable, Logger } from '@nestjs/common';
import { ORDER_REPOSITORY_TOKEN } from './order.repository';
import { IOrderService } from './interfaces/orderService.interface';
import { IOrderRepository } from './interfaces/orderRepository.interface';
import { CompleteOrderData, OrderList, OrderWithReagents } from './types/order.type';
import { OrdereOptions } from './types/orderOptions.type';
import { Order } from '@prisma/client';
import { UpdateOrderDto } from './dto/updateOrder.dto';

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

  async orderList(options: OrdereOptions): Promise<OrderList> {
    try {
      this.logger.log(`[${this.orderList.name}] - Method start`);
      const { filter, pagination, sort } = options;
      const order: OrderList = await this.orderRepository.findAll(filter, pagination, sort);
      this.logger.log(`[${this.orderList.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.orderList.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
    this.logger.log(`[${this.updateOrder.name}] - Method start`);
    try {
      const order: Order = await this.orderRepository.update({ id, ...data });
      this.logger.log(`[${this.updateOrder.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.updateOrder.name}] - Exception thrown: ` + error);
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
