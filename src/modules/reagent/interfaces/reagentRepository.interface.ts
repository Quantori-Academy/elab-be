import { IRepository } from 'src/common/interfaces/repository.interface';
import { PaginationOptions, SortOptions } from './reagentOptions.interface';
import { IReagent } from './reagentEntity.interface';

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
  getAllByStructure(structure: string, pagination?: PaginationOptions, sorting?: SortOptions): Promise<IReagent | IReagent[]>;
}
