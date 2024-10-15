import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { OrderBy, PaginationOptions, SortOptions } from './interfaces/reagentOptions.interface';
import { Category } from '@prisma/client';
import { IReagentRepository } from './interfaces/reagentRepository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';

@Injectable()
class ReagentRepository implements IReagentRepository {
  private logger = new Logger(ReagentRepository.name);

  constructor(private prisma: PrismaService) {}

  async create(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.create({
      data: reagent,
    });
  }

  async update(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.update({
      where: { id: reagent.id },
      data: reagent,
    });
  }

  async upsert(reagent: IReagent): Promise<void> {
    await this.prisma.reagent.upsert({
      where: { id: reagent.id },
      update: { ...reagent },
      create: { ...reagent },
    });
  }

  async findById(id: number): Promise<IReagent | null> {
    return await this.prisma.reagent.findUnique({
      where: { id },
    });
  }

  async findAll(pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy: OrderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async delete(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.delete({
      where: { id: reagent.id },
    });
  }

  async getAllByName(name: string, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy: OrderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: { name },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByCategory(category: Category, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy: OrderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: { category },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByBoth(
    name: string,
    category: Category,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
  ): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy: OrderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: {
        AND: [{ name }, { category }],
      },
      skip,
      take,
      orderBy,
    });
  }

  private orderFactory(sortOptions: SortOptions | undefined): OrderBy {
    this.logger.log(`[${this.orderFactory.name}] - Started`);
    try {
      if (!sortOptions) return undefined;

      const orderBy: OrderBy = {};
      if (sortOptions.sortByName) {
        orderBy.name = sortOptions.sortByName;
      }
      if (sortOptions.sortByCreationDate) {
        orderBy.createdAt = sortOptions.sortByCreationDate;
      }
      if (sortOptions.sortByUpdatedDate) {
        orderBy.updatedAt = sortOptions.sortByUpdatedDate;
      }
      this.logger.log(`[${this.orderFactory.name}] - Finished`);
      return Object.keys(orderBy).length > 0 ? orderBy : undefined;
    } catch (error) {
      this.logger.error(`[${this.orderFactory.name}] - Error: ${error}`);
      throw error;
    }
  }
}

const REAGENT_REPOSITORY_TOKEN = Symbol('REAGENT_REPOSITORY_TOKEN');
const ReagentRepositoryProvider = {
  provide: REAGENT_REPOSITORY_TOKEN,
  useClass: ReagentRepository,
};

export { REAGENT_REPOSITORY_TOKEN, ReagentRepositoryProvider };
