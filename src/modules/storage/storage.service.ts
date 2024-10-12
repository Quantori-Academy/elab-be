import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN } from './storage.repository';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { IStorageService } from './interfaces/storageService.interface';
import { Storage } from '@prisma/client';
import { FilterOptions, PaginationOptions, SortOptions } from './interfaces/fIlterOptions.types';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger: Logger = new Logger(StorageService.name);

  constructor(@Inject(STORAGE_REPOSITORY_TOKEN) private storageRepository: IStorageRepository) {}

  async getAllStorages(): Promise<Storage[]> {
    this.logger.log(`[${this.getAllStorages.name}] - Method start`);
    try {
      const storages: Storage[] = await this.storageRepository.findAll();
      this.logger.log(`[${this.getAllStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getAllStorages.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getStoragesInRoom(roomName: string): Promise<Storage[]> {
    this.logger.log(`[${this.getStoragesInRoom.name}] - Method start`);
    try {
      const storages: Storage[] | null = await this.storageRepository.findAllInRoom(roomName);
      if (!storages) throw new NotFoundException('Room not found');

      this.logger.log(`[${this.getStoragesInRoom.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStoragesInRoom.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getUniqueStorage(roomName: string, storageName: string): Promise<Storage | null> {
    this.logger.log(`[${this.getUniqueStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageRepository.findUniqueStorage(roomName, storageName);
      if (!storage) throw new NotFoundException('Storage not found');
      this.logger.log(`[${this.getUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getUniqueStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async applyFilters(storages: Storage[], options: FilterOptions): Promise<Storage[]> {
    console.log(options);
    return storages;
  }

  async applySorting(storages: Storage[], options: SortOptions): Promise<Storage[]> {
    console.log(options);
    return storages;
  }

  async applyPagination(storages: Storage[], options: PaginationOptions): Promise<Storage[]> {
    console.log(options);
    return storages;
  }
}

const STORAGE_SERVICE_TOKEN = Symbol('STORAGE_SERVICE_TOKEN');
const StorageServiceProvider = {
  provide: STORAGE_SERVICE_TOKEN,
  useClass: StorageService,
};

export { STORAGE_SERVICE_TOKEN, StorageServiceProvider };
