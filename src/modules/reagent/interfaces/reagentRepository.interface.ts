import { IRepository } from 'src/common/interfaces/repository.interface';
import { FilterOptions, FlagOptions, PaginationOptions, SortOptions } from './reagentOptions.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';
import { Category, Reagent } from '@prisma/client';

export interface IReagentRepository extends IRepository<Reagent> {
  findAll(filter?: FilterOptions, pagination?: PaginationOptions, sorting?: SortOptions): Promise<Reagent[]>;
  getAllByStructure(
    structure: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
    flag?: FlagOptions,
  ): Promise<Reagent | Reagent[]>;
  updateById(data: UpdateReagentDto, id: number, isDeleted: boolean): Promise<Reagent>;
}

export interface IWhereClause {
  isDeleted: boolean;
  category?: Category;
  name?: string;
  storageId?: number;
}
