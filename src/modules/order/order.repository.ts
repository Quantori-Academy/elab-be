import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IOrderRepository } from './interfaces/orderRepository.interface';
import { CompleteOrderData, OrderList, OrderWithReagents } from './types/order.type';
import { Order } from '@prisma/client';
import { PartialWithRequiredId } from 'src/common/types/idRequired.type';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private readonly logger: Logger = new Logger(OrderRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Order | null>;
  async findById(id: number, includeReagents: true): Promise<OrderWithReagents | null>;
  async findById(id: number, includeReagents: boolean = false): Promise<Order | OrderWithReagents | null> {
    this.logger.log(`[${this.findById.name}] - Method start`);
    try {
      const order: Order | OrderWithReagents | null = await this.prisma.order.findUnique({
        where: { id },
        include: {
          reagents: includeReagents,
        },
      });
      this.logger.log(`[${this.findById.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.findById.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAll(): Promise<OrderList> {
    this.logger.log(`[${this.findAll.name}] - Method start`);
    try {
      const where = {
        include: {
          reagents: true,
        },
      };

      const [orders, size] = await this.prisma.$transaction([this.prisma.order.findMany(where), this.prisma.order.count()]);

      this.logger.log(`[${this.findAll.name}] - Method finished`);
      return { orders, size };
    } catch (error) {
      this.logger.error(`[${this.findAll.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async create(data: CompleteOrderData): Promise<OrderWithReagents> {
    this.logger.log(`[${this.create.name}] - Method start`);
    try {
      const requestedReagentIds = data.reagents.map((reagent) => reagent.id);
      const existingReagents = await this.prisma.reagentRequest.findMany({
        where: {
          id: { in: requestedReagentIds },
        },
        select: { id: true },
      });

      const existingReagentIds = existingReagents.map((reagent) => reagent.id);
      const missingIds = requestedReagentIds.filter((id) => !existingReagentIds.includes(id));
      if (missingIds.length > 0) {
        this.logger.error(`[${this.create.name}] - Exception thrown: invalid regent ids`);
        throw new NotFoundException(`The following reagent IDs not found: ${missingIds}`);
      }

      const order: OrderWithReagents = await this.prisma.order.create({
        data: {
          ...data,
          reagents: {
            connect: data.reagents.map((reagent) => ({ id: reagent.id })),
          },
        },
        include: {
          reagents: true,
        },
      });
      this.logger.log(`[${this.create.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.create.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async update(order: PartialWithRequiredId<Order>): Promise<OrderWithReagents> {
    this.logger.log(`[${this.update.name}] - Method start`);
    try {
      const updatedOrder: OrderWithReagents = await this.prisma.order.update({
        where: { id: order.id },
        include: {
          reagents: true,
        },
        data: order,
      });
      this.logger.log(`[${this.update.name}] - Method finished`);
      return updatedOrder;
    } catch (error) {
      this.logger.error(`[${this.update.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async upsert(order: Order): Promise<void> {
    this.logger.log(`[${this.upsert.name}] - Method start`);
    try {
      await this.prisma.order.upsert({
        where: { id: order.id },
        update: {
          ...order,
        },
        create: {
          ...order,
        },
      });
      this.logger.log(`[${this.upsert.name}] - Method finished`);
    } catch (error) {
      this.logger.error(`[${this.upsert.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<OrderWithReagents> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const deletedOrder: OrderWithReagents = await this.prisma.order.delete({
        where: { id },
        include: {
          reagents: true,
        },
      });
      this.logger.log(`[${this.delete.name}] - Method finished`);
      return deletedOrder;
    } catch (error) {
      this.logger.error(`[${this.delete.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const ORDER_REPOSITORY_TOKEN = Symbol('ORDER_REPOSITORY_TOKEN');
const OrderRepositoryProvider = {
  provide: ORDER_REPOSITORY_TOKEN,
  useClass: OrderRepository,
};

export { OrderRepositoryProvider, ORDER_REPOSITORY_TOKEN };
