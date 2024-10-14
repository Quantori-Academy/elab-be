import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';
import { PaginationOptions, SortOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';

export interface IStorageRepository extends IRepository<Storage> {
  findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  create(storageDto: CreateStorageLocationsDto): Promise<Storage>;
  getRoomNameById(id: number): Promise<string | null>;
  getRoomIdByName(roomName: string): Promise<number | null>;
  findAll(pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
  findAllByRoom(roomId: number, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[] | null>;
  findAllByName(storageName: string, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]>;
}
