import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';
import { PaginationOptions, SortOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';
import { StorageWithReagents } from '../types/storage.types';

export interface IStorageRepository extends IRepository<Storage> {
  findById(id: number, includeReagents: true): Promise<StorageWithReagents | null>; // overload
  findById(id: number, includeReagents?: boolean): Promise<Storage | StorageWithReagents | null>; // implementation
  findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  create(storageDto: CreateStorageLocationsDto): Promise<Storage>;
  findAll(pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
  findAllByRoom(roomId: number, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[] | null>;
  findAllByName(storageName: string, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
}
