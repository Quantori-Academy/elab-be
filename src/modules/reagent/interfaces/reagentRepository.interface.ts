import { IRepository } from 'src/common/interfaces/repository.interface';
import { FilterOptions, FlagOptions, PaginationOptions, SortOptions } from './reagentOptions.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';
import { Category } from '@prisma/client';
import { IReagent } from './reagentEntity.interface';

export interface IReagentRepository extends IRepository<IReagent> {
  findAll(filter?: FilterOptions, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]>;
  getAllByStructure(
    structure: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
    flag?: FlagOptions,
  ): Promise<IReagent | IReagent[]>;
  updateById(data: UpdateReagentDto, id: number, isDeleted: boolean): Promise<IReagent>;
}

export interface IWhereClause {
  isDeleted: boolean;
  category?: Category;
  name?: string;
  storageId?: number;
}
