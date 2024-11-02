import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { FilterOptions, FlagOptions, OrderBy, PaginationOptions, SortOptions } from './interfaces/reagentOptions.interface';
import { Prisma } from '@prisma/client';
import { IReagentRepository, IWhereClause } from './interfaces/reagentRepository.interface';
import { UpdateReagentDto } from './dto/updateReagent.dto';
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

  async updateById(data: UpdateReagentDto, id: number, isDeleted: boolean): Promise<IReagent> {
    return await this.prisma.reagent.update({
      where: { id },
      data: {
        ...data,
        isDeleted,
      },
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

  async findAll(filter?: FilterOptions, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    const whereClause: IWhereClause = { isDeleted: false };

    if (filter?.category) {
      whereClause.category = filter.category;
    }

    if (filter?.name) {
      whereClause.name = filter.name;
    }

    if (filter?.storageId) {
      whereClause.storageId = filter.storageId;
    }

    return await this.prisma.reagent.findMany({
      where: whereClause,
      include: {
        storage: {
          select: {
            name: true,
            room: {
              select: {
                name: true,
              },
            },
          },
        },
      },
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

  async getAllByStructure(
    structure: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
    flag?: FlagOptions,
  ): Promise<IReagent | IReagent[]> {
    const { skip = 0, take = 10 } = pagination || {};
    const orderBy = this.orderFactory(sorting);
    const { isFullStructure } = flag || {};
    let inputString;
    console.log(isFullStructure);
    if (isFullStructure === undefined) {
      inputString = `SELECT name, "category", "structure", "description", "quantityLeft", "storageId" 
                   FROM "Reagent" 
                   WHERE isDeleted = FALSE AND structure @>$1`;
    } else {
      console.log(isFullStructure);
      inputString = `SELECT name, "category", "structure", "description", "quantityLeft", "storageId" 
                   FROM "Reagent" 
                   WHERE 
                      (${isFullStructure} = TRUE AND isDeleted = FALSE AND structure =$1) OR
                      (${isFullStructure} = FALSE AND isDeleted = FALSE AND structure @>$1 AND structure !=$1)`;
    }

    if (orderBy) {
      if (Array.isArray(orderBy)) {
        const orderClause = orderBy.map((order) => {
          const [key, value] = Object.entries(order)[0];
          return `"${key}" ${value}`;
        });
        inputString += ` ORDER BY ${orderClause.join(' ,')}`;
        console.log(` ORDER BY ${orderClause.join(' ,')}`);
      } else {
        const orderClause = Object.entries(orderBy).map(([key, value]) => {
          return `"${key}" ${value}`;
        });
        inputString += ` ORDER BY ${orderClause[0]} `;
      }
    }

    inputString += ` LIMIT ${take} OFFSET ${skip}`;
    console.log(inputString);
    return await this.prisma.$queryRawUnsafe(inputString, structure);
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
