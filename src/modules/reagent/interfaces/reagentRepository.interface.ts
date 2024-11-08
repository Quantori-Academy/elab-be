import { IRepository } from 'src/common/interfaces/repository.interface';
import { FilterOptions, FlagOptions, PaginationOptions, SortOptions } from './reagentOptions.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';
import { Category } from '@prisma/client';
import { IReagent } from './reagentEntity.interface';
import { CreateSampleDto } from '../dto/createSample.dto';

export interface IReagentRepository extends IRepository<IReagent> {
  findManyById(ids: number[]): Promise<IReagent[]>;
  findAll(filter?: FilterOptions, pagination?: PaginationOptions, sorting?: SortOptions): Promise<ReagentList>;
  getAllByStructure(
    structure: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
    flag?: FlagOptions,
  ): Promise<IReagent | IReagent[]>;
  updateById(data: UpdateReagentDto, id: number, isDeleted: boolean): Promise<IReagent>;
  createSample(sample: CreateSampleDto): Promise<IReagent>;
}

export interface IWhereClause {
  isDeleted: boolean;
  category?: Category;
  name?: {
    contains: string;
    mode?: 'insensitive';
  };
  storageId?: number;
}

export type ReagentList = {
  reagents: IReagent[];
  size: number;
};
