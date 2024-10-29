import { IRepository } from 'src/common/interfaces/repository.interface';
import { FlagOptions, PaginationOptions, SortOptions } from './reagentOptions.interface';
import { IReagent } from './reagentEntity.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';

export interface IReagentRepository extends IRepository<IReagent> {
  getAllByName(name: string, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]>;
  getAllByCategory(category: string, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]>;
  getAllByNameAndCategory(
    name: string,
    category: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
  ): Promise<IReagent[]>;
  findAll(pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent[]>;
  getAllByStructure(
    structure: string,
    pagination?: PaginationOptions,
    sorting?: SortOptions,
    flag?: FlagOptions,
  ): Promise<IReagent | IReagent[]>;
  updateById(data: UpdateReagentDto, id: number): Promise<IReagent>;
}
