import { Storage } from '@prisma/client';
import { StorageOptions } from './storageOptions.interface';

export interface IStorageService {
  getStorages(options: StorageOptions): Promise<Storage[]>;
  getUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
}
