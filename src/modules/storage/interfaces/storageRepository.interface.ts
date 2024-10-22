import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';
import { StoragePaginationOptions, StorageSortOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';
import { FilterBy, StorageWithReagents } from '../types/storage.types';

export interface IStorageRepository extends IRepository<Storage> {
  findById(id: number, includeReagents: true): Promise<StorageWithReagents | null>; // overload
  findById(id: number, includeReagents?: boolean): Promise<Storage | StorageWithReagents | null>; // implementation
  findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  create(storageDto: CreateStorageLocationsDto): Promise<Storage>;
  findAll(filterBy?: FilterBy, pagination?: StoragePaginationOptions, sortOptions?: StorageSortOptions): Promise<Storage[]>;
  findAllByRoom(
    roomId: number,
    pagination?: StoragePaginationOptions,
    sortOptions?: StorageSortOptions,
  ): Promise<Storage[] | null>;
  findAllByName(storageName: string, pagination?: StoragePaginationOptions, sortOptions?: StorageSortOptions): Promise<Storage[]>;
}
