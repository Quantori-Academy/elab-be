import { Inject, Injectable, Logger } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN } from './storage.repository';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { IStorageService } from './interfaces/storageService.interface';
import { Storage } from '@prisma/client';
import { FilterOptions, PaginationOptions, SortOptions, StorageOptions } from './interfaces/storageOptions.interface';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger: Logger = new Logger(StorageService.name);

  constructor(@Inject(STORAGE_REPOSITORY_TOKEN) private storageRepository: IStorageRepository) {}

  async getStorages(options: StorageOptions): Promise<Storage[]> {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const { roomName, storageName }: FilterOptions = options.filter;
      const pagination: PaginationOptions = options.pagination;
      const sort: SortOptions = options.sort;

      let storages: Storage[] | null = [];
      if (roomName && storageName) {
        // 1. Unique storage
        const result: Storage | null = await this.getUniqueStorage(roomName, storageName);
        storages = result ? [result] : [];
      } else if (roomName) {
        //    2. All storages in the room
        storages = await this.storageRepository.findAllByRoom(roomName, pagination, sort);
        return storages ? storages : [];
      } else if (storageName) {
        //     3. The same storage name in  different rooms
        storages = await this.storageRepository.findAllByName(storageName, pagination, sort);
      } else {
        //  4. Neither room nor storage name is provided (all rooms, all names)
        storages = await this.storageRepository.findAll(pagination, sort);
      }

      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getUniqueStorage(roomName: string, storageName: string): Promise<Storage | null> {
    this.logger.log(`[${this.getUniqueStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageRepository.findUniqueStorage(roomName, storageName);
      this.logger.log(`[${this.getUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getUniqueStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const STORAGE_SERVICE_TOKEN = Symbol('STORAGE_SERVICE_TOKEN');
const StorageServiceProvider = {
  provide: STORAGE_SERVICE_TOKEN,
  useClass: StorageService,
};

export { STORAGE_SERVICE_TOKEN, StorageServiceProvider };
