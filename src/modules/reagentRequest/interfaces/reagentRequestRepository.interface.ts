import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagentRequest } from './reagentRequestEntity.interface';
import { FilterOptions, PaginationOptions, SortOptions } from './reagentRequestOptions.interface';
import { UpdateReagentRequestDto } from '../dto/updateReagentRequest.dto';
import { Status } from '@prisma/client';

export interface IReagentRequestRepository extends IRepository<IReagentRequest> {
  findAll(filter?: FilterOptions, pagination?: PaginationOptions, sort?: SortOptions, id?: number): Promise<IReagentRequest[]>;
  updateById(data: UpdateReagentRequestDto, id: number): Promise<IReagentRequest>;
  findById(id: number, userId?: number): Promise<IReagentRequest | null>;
}

export interface IWhereClause {
  name?: string;
  status?: Status;
  userId?: number;
}
