import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagentRequest } from './reagentRequestEntity.interface';
import { PaginationOptions, SortOptions } from './reagentRequestOptions.interface';
import { Status } from '@prisma/client';
import { UpdateReagentRequestDto } from '../dto/updateReagentRequest.dto';

export interface IReagentRequestRepository extends IRepository<IReagentRequest> {
  findAll(pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]>;
  updateById(data: UpdateReagentRequestDto, id: number): Promise<IReagentRequest>;
  getAllByStatus(status: Status, pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]>;
  getAllByName(name: string, pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]>;
  getAllByNameAndStatus(
    name: string,
    status: Status,
    pagination?: PaginationOptions,
    sort?: SortOptions,
    id?: number,
  ): Promise<IReagentRequest[]>;
}
