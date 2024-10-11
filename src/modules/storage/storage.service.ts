import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN } from './storage.repository';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { IStorageService } from './interfaces/storageService.interface';
import { Storage } from '@prisma/client';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger: Logger = new Logger(StorageService.name);

  constructor(@Inject(STORAGE_REPOSITORY_TOKEN) private storageRepository: IStorageRepository) {}

  async getStoragByLocation(location: string): Promise<Storage | null> {
    this.logger.log(`[${this.getStoragByLocation.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageRepository.findByStorageLocation(location);
      if (!storage) throw new NotFoundException('Storage not found');
      this.logger.log(`[${this.getStoragByLocation.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getStoragByLocation.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
  async getStorages(): Promise<Storage[]> {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const storages: Storage[] = await this.storageRepository.findAll();
      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const STORAGE_SERVICE_TOKEN = Symbol('AUTHSTORAGE_SERVICE_TOKEN_SERVICE_TOKEN');
const StorageServiceProvider = {
  provide: STORAGE_SERVICE_TOKEN,
  useClass: StorageService,
};

export { STORAGE_SERVICE_TOKEN, StorageServiceProvider };