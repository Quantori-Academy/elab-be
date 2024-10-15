import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';
import { PaginationOptions, SortOptions } from './storageOptions.interface';

export interface IStorageRepository extends IRepository<Storage> {
  findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  getRoomNameById(id: number): Promise<string | null>;
  getRoomIdByName(roomName: string): Promise<number | null>;
  findAll(pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
  findAllByRoom(roomId: number, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[] | null>;
  findAllByName(storageName: string, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
}
