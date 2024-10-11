import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';

export interface IStorageRepository extends IRepository<Storage> {
  findUniqueStorage(roomName: string, storageName: string): Promise<Storage | null>;
  findAllInRoom(roomName: string): Promise<Storage[] | null>;
}
