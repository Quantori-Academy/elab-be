import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';
import { StorageCreation, StorageWithReagents, FilterBy, StorageList } from '../types/storage.types';
import { StoragePaginationOptions, StorageSortOptions } from './storageOptions.interface';
import { PartialWithRequiredId } from 'src/common/types/idRequired.type';

export interface IStorageRepository extends IRepository<Storage> {
  findById(id: number, includeReagents: true): Promise<StorageWithReagents | null>; // overload
  findById(id: number, includeReagents?: boolean): Promise<Storage | StorageWithReagents | null>; // implementation
  findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  create(storageDto: StorageCreation): Promise<Storage>;
  findAllByName(storageName: string, pagination?: StoragePaginationOptions, sortOptions?: StorageSortOptions): Promise<Storage[]>;
  findAll(filterBy?: FilterBy, pagination?: StoragePaginationOptions, sortOptions?: StorageSortOptions): Promise<StorageList>;
  update(data: PartialWithRequiredId<Storage>): Promise<Storage>;
  findAllByRoom(
    roomId: number,
    pagination?: StoragePaginationOptions,
    sortOptions?: StorageSortOptions,
  ): Promise<Storage[] | null>;
}
