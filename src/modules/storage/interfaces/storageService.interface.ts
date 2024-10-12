import { Storage } from '@prisma/client';

export interface IStorageService {
  getAllStorages(): Promise<Storage[]>;
  getStoragesInRoom(roomName: string): Promise<Storage[] | null>;
  getUniqueStorage(roomName: string, storageName: string): Promise<Storage | null>;
  applyFilters(storages: Storage[], options: any): Promise<Storage[]>;
}
