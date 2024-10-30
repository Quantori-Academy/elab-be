import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IReagentRequest } from './interfaces/reagentRequestEntity.interface';
import { IReagentRequestRepository } from './interfaces/reagentRequestRepository.interface';
import { Prisma, Status } from '@prisma/client';
import { OrderBy, PaginationOptions, SortOptions } from './interfaces/reagentRequestOptions.interface';
import { UpdateReagentRequestDto } from './dto/updateReagentRequest.dto';

@Injectable()
class ReagentRequestRepository implements IReagentRequestRepository {
  private logger = new Logger(ReagentRequestRepository.name);

  constructor(private prisma: PrismaService) {}

  async create(request: IReagentRequest): Promise<IReagentRequest> {
    this.logger.log('Create method start');
    return await this.prisma.reagentRequest.create({
      data: request,
    });
  }

  async update(request: IReagentRequest): Promise<IReagentRequest> {
    this.logger.log('Update method start');
    return await this.prisma.reagentRequest.update({
      where: { id: request.id },
      data: request,
    });
  }

  async updateById(data: UpdateReagentRequestDto, id: number): Promise<IReagentRequest> {
    this.logger.log('UpdateById method start');
    return await this.prisma.reagentRequest.update({
      where: { id },
      data,
    });
  }

  async upsert(request: IReagentRequest): Promise<void> {
    this.logger.log('Upsert method start');
    await this.prisma.reagentRequest.upsert({
      where: { id: request.id },
      update: { ...request },
      create: { ...request },
    });
  }

  async delete(id: number): Promise<IReagentRequest> {
    this.logger.log('Delete method start');
    return await this.prisma.reagentRequest.delete({
      where: { id },
    });
  }

  async findById(id: number): Promise<IReagentRequest | null> {
    this.logger.log('findById method start');
    return await this.prisma.reagentRequest.findUnique({
      where: { id },
    });
  }

  async findAll(pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]> {
    this.logger.log('findAll method start');
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sort);
    if (id) {
      this.logger.log(`[${this.findAll.name}] - Finished with checking User ID`);
      return await this.prisma.reagentRequest.findMany({
        where: { userId: id },
        skip,
        take,
        orderBy,
      });
    }
    this.logger.log(`[${this.findAll.name}] - Finished`);
    return await this.prisma.reagentRequest.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async getAllByStatus(
    status: Status,
    pagination?: PaginationOptions,
    sort?: SortOptions,
    id?: number,
  ): Promise<IReagentRequest[]> {
    this.logger.log(`[${this.getAllByStatus.name}] - Started`);
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sort);
    if (id) {
      this.logger.log(`[${this.getAllByStatus.name}] - Finished with checking User ID`);
      return await this.prisma.reagentRequest.findMany({
        where: { userId: id },
        skip,
        take,
        orderBy,
      });
    }
    this.logger.log(`[${this.getAllByStatus.name}] - Finished`);
    return await this.prisma.reagentRequest.findMany({
      where: { status },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByName(name: string, pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]> {
    this.logger.log(`[${this.getAllByName.name}] - Started`);
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sort);
    if (id) {
      this.logger.log(`[${this.getAllByName.name}] - Finished with checking User ID`);
      return await this.prisma.reagentRequest.findMany({
        where: { userId: id },
        skip,
        take,
        orderBy,
      });
    }
    this.logger.log(`[${this.getAllByName.name}] - Finished`);
    return await this.prisma.reagentRequest.findMany({
      where: { name },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByNameAndStatus(
    name: string,
    status: Status,
    pagination?: PaginationOptions,
    sort?: SortOptions,
    id?: number,
  ): Promise<IReagentRequest[]> {
    this.logger.log(`[${this.getAllByNameAndStatus.name}] - Started`);
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sort);
    if (id) {
      this.logger.log(`[${this.getAllByNameAndStatus.name}] - Finished with checking User ID`);
      return await this.prisma.reagentRequest.findMany({
        where: { userId: id },
        skip,
        take,
        orderBy,
      });
    }
    this.logger.log(`[${this.getAllByNameAndStatus.name}] - Finished`);
    return await this.prisma.reagentRequest.findMany({
      where: {
        AND: [{ name }, { status }],
      },
      skip,
      take,
      orderBy,
    });
  }

  private orderFactory(
    sortOptions: SortOptions | undefined,
  ): Prisma.ReagentOrderByWithRelationInput | Prisma.ReagentOrderByWithRelationInput[] | undefined {
    try {
      this.logger.log(`[${this.orderFactory.name}] - Started`);
      if (!sortOptions) return undefined;
      const orderBy: OrderBy = {};
      if (sortOptions.sortByCreatedDate) {
        orderBy.createdAt = sortOptions.sortByCreatedDate;
      }
      if (sortOptions.sortByUpdatedDate) {
        orderBy.updatedAt = sortOptions.sortByUpdatedDate;
      }
      if (sortOptions.sortByQuantity) {
        orderBy.desiredQuantity = sortOptions.sortByQuantity;
      }

      this.logger.log(`[${this.orderFactory.name}] - Finished`);
      if (Object.keys(orderBy).length === 1) {
        return orderBy;
      } else if (Object.keys(orderBy).length > 1) {
        const orderArr = Object.entries(orderBy).map(([key, value]) => {
          return { [key]: value };
        });
        return orderArr;
      } else {
        return undefined;
      }
    } catch (error) {
      this.logger.error('Error in orderFactory: ', error);
      throw error;
    }
  }
}

const REQUEST_REPOSITORY_TOKEN = Symbol('REQUEST_REPOSITORY_TOKEN');
const RequestRepositoryProvider = {
  provide: REQUEST_REPOSITORY_TOKEN,
  useClass: ReagentRequestRepository,
};

export { REQUEST_REPOSITORY_TOKEN, RequestRepositoryProvider };
