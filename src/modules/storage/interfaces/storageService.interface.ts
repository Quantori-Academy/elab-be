import { Storage } from '@prisma/client';
import { StorageOptions } from './storageOptions.interface';
import { CreateStorageLocationsDto } from '../dto/createStorageLocation.dto';
import { StorageList } from '../types/storage.types';
import { UpdateStroageDto } from '../dto/updateStorage.dto';

export interface IStorageService {
  getStorages(options: StorageOptions): Promise<StorageList>;
  getStorage(id: number): Promise<Storage | null>;
  createStorageLocation(storage: CreateStorageLocationsDto): Promise<Storage>;
  delete(id: number): Promise<void>;
  update(id: number, roomDto: UpdateStroageDto): Promise<Storage>;
}
