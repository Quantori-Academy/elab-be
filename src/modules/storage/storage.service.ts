import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN } from './storage.repository';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { IStorageService } from './interfaces/storageService.interface';
import { Storage } from '@prisma/client';
import { FilterOptions, PaginationOptions, SortOptions, StorageOptions } from './interfaces/storageOptions.interface';
import { CreateStorageLocationsDto } from './dto/createStorageLocation.dto';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger: Logger = new Logger(StorageService.name);

  constructor(@Inject(STORAGE_REPOSITORY_TOKEN) private storageRepository: IStorageRepository) {}

  async getStorages(options: StorageOptions): Promise<Storage[]> {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const { roomId, storageName }: FilterOptions = options.filter;
      const pagination: PaginationOptions = options.pagination;
      const sort: SortOptions = options.sort;

      let storages: Storage[] | null = [];
      if (roomId && storageName) {
        const result: Storage | null = await this.getUniqueStorage(roomId, storageName);
        storages = result ? [result] : [];
      } else if (roomId) {
        storages = await this.storageRepository.findAllByRoom(roomId, pagination, sort);
        return storages ? storages : [];
      } else if (storageName) {
        storages = await this.storageRepository.findAllByName(storageName, pagination, sort);
      } else {
        storages = await this.storageRepository.findAll(pagination, sort);
      }

      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getUniqueStorage(roomId: number, storageName: string): Promise<Storage | null> {
    this.logger.log(`[${this.getUniqueStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageRepository.findUniqueStorage(roomId, storageName);
      this.logger.log(`[${this.getUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getUniqueStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async createStorageLocation(storageDto: CreateStorageLocationsDto): Promise<Storage> {
    this.logger.log(`[${this.createStorageLocation.name}] - Method start`);
    try {
      const { roomId, name, description = null } = storageDto;

      const existingStorage: Storage | null = await this.storageRepository.findUniqueStorage(roomId, name);
      if (existingStorage) throw new NotFoundException(`Storage with this ${name} in Room${roomId} already exists`);

      const storage: Storage = await this.storageRepository.create({ roomId, name, description });
      this.logger.log(`[${this.createStorageLocation.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.createStorageLocation.name}] - Exception thrown: ${error}`);
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
