import { Storage } from '@prisma/client';
import { StorageOptions } from './storageOptions.interface';

export interface IStorageService {
  getStorages(options: StorageOptions): Promise<Storage[]>;
  getUniqueStorage(roomName: string, storageName: string): Promise<Storage | null>;
}
