import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { OrderBy, PaginationOptions, SortOptions } from './interfaces/reagentOptions.interface';
import { Category, Prisma } from '@prisma/client';
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
    const orderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async delete(id: number): Promise<IReagent> {
    return await this.prisma.reagent.delete({
      where: { id },
    });
  }

  async getAllByName(name: string, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: { name },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByCategory(category: Category, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: { category },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByNameAndCategory(
    name: string,
    category: Category,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
  ): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    return await this.prisma.reagent.findMany({
      where: {
        AND: [{ name }, { category }],
      },
      skip,
      take,
      orderBy,
    });
  }

  async getAllByStructure(structure: string, pagination?: PaginationOptions, sorting?: SortOptions) {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    let inputString = `SELECT name, category, structure, description, quantityLeft, storageId FROM reagent WHERE structure @> ${structure}`;

    if (orderBy) {
      if (Object.keys(orderBy).length === 1) {
        const [key, value] = Object.entries(orderBy);
        inputString += ` ORDER BY ${key} ${value} `;
      } else {
        const order = Object.entries(orderBy).map(([key, value]) => {
          return `${key} ${value}`;
        });
        inputString += ` ORDER BY ${order.join(', ')} `;
      }
    }

    inputString += `LIMIT ${take} OFFSET ${skip}`;
    return await this.prisma.$queryRaw`${inputString}`;
  }

  private orderFactory(
    sortOptions: SortOptions | undefined,
  ): Prisma.ReagentOrderByWithRelationInput | Prisma.ReagentOrderByWithRelationInput[] | undefined {
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
      if (Object.keys(orderBy).length === 1) {
        return orderBy;
      } else if (Object.keys(orderBy).length > 1) {
        const res = Object.entries(orderBy).map(([key, value]) => {
          return { [key]: value };
        });
        return res;
      } else {
        return undefined;
      }
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
