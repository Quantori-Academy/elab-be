import { Storage } from '@prisma/client';
import { StorageOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';

export interface IStorageService {
  getStorages(options: StorageOptions): Promise<Storage[]>;
  getUniqueStorage(roomId: number, storageName: string): Promise<Storage | null>;
  createStorageLocation(storage: CreateStorageLocationsDto): Promise<Storage>;
  delete(id: number): Promise<void>;
}
