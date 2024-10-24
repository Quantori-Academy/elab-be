import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagentRequest } from './reagentRequestEntity.interface';
import { PaginationOptions, SortOptions } from './reagentRequestOptions.interface';
import { Status } from '@prisma/client';

export interface IReagentRequestRepository extends IRepository<IReagentRequest> {
  findAll(pagination?: PaginationOptions, sort?: SortOptions): Promise<IReagentRequest[]>;
  getAllByStatus(status: Status, pagination?: PaginationOptions, sort?: SortOptions): Promise<IReagentRequest[]>;
  getAllByName(name: string, pagination?: PaginationOptions, sort?: SortOptions): Promise<IReagentRequest[]>;
  getAllByNameAndStatus(
    name: string,
    status: Status,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<IReagentRequest[]>;
}
