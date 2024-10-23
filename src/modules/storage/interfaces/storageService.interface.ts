import { Storage } from '@prisma/client';
import { StorageOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';
import { StorageList } from '../types/storage.types';

export interface IStorageService {
  getStorages(options: StorageOptions): Promise<StorageList>;
  createStorageLocation(storage: CreateStorageLocationsDto): Promise<Storage>;
  delete(id: number): Promise<void>;
}
