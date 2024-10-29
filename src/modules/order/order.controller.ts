import { Body, Controller, Inject, Logger, Post, Req, ValidationPipe } from '@nestjs/common';
import { ORDER_SERVICE_TOKEN } from './order.service';
import { IOrderService } from './interfaces/orderService.interface';
import { ApiTags } from '@nestjs/swagger';
import { CompleteOrderData, OrderWithReagents } from './types/order.type';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Request } from 'express';
import { UserPayload } from '../user/interfaces/userEntity.interface';

const ROUTE = 'orders';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class OrderController {
  private readonly logger: Logger = new Logger(OrderController.name);

  constructor(@Inject(ORDER_SERVICE_TOKEN) private orderService: IOrderService) {}

  @Post('')
  async createOrder(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) orderDto: CreateOrderDto,
  ): Promise<OrderWithReagents> {
    this.logger.log(`[${this.createOrder.name}] - Method start`);
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      const complteOrderData: CompleteOrderData = {
        userId: user.id!,
        ...orderDto,
      };
      const order: OrderWithReagents = await this.orderService.createOrder(complteOrderData);
      this.logger.log(`[${this.createOrder.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.createOrder.name}] - Exception thrown: ` + error);
      throw error;
    }
  }
}
