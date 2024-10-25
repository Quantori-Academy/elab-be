import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { STORAGE_REPOSITORY_TOKEN } from './storage.repository';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { IStorageService } from './interfaces/storageService.interface';
import { Storage } from '@prisma/client';
import { CreateStorageLocationsDto } from './dto/createStorageLocation.dto';
import { ROOM_SERVICE_TOKEN } from '../room/room.service';
import { IRoomService } from '../room/interfaces/roomService.interface';
import { FilterBy, StorageList, StorageWithReagents } from './types/storage.types';
import { StorageFilterOptions, StoragePaginationOptions, StorageSortOptions, StorageOptions } from './types/storageOptions.type';
import { UpdateStroageDto } from './dto/updateStorage.dto';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger: Logger = new Logger(StorageService.name);

  constructor(
    @Inject(STORAGE_REPOSITORY_TOKEN) private storageRepository: IStorageRepository,
    @Inject(ROOM_SERVICE_TOKEN) private roomService: IRoomService,
  ) {}

  async getStorages(options: StorageOptions): Promise<StorageList> {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      let storageList: StorageList | null = {
        size: 0,
        storages: [],
      };
      const { roomName, storageName }: StorageFilterOptions = options.filter;
      const pagination: StoragePaginationOptions = options.pagination;
      const sort: StorageSortOptions = options.sort;

      const filterBy: FilterBy = {
        name: storageName,
        roomIds: undefined,
      };

      if (roomName) {
        const roomIds: number[] = await this.roomService.getRoomIdsBySubName(roomName);
        filterBy.roomIds = roomIds;
      }

      storageList = await this.storageRepository.findAll(filterBy, pagination, sort);

      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storageList;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getStorage(id: number): Promise<Storage | null> {
    this.logger.log(`[${this.getStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageRepository.findById(id);
      this.logger.log(`[${this.getStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async createStorageLocation(storageDto: CreateStorageLocationsDto): Promise<Storage> {
    this.logger.log(`[${this.createStorageLocation.name}] - Method start`);
    try {
      const { roomName, name, description = null } = storageDto;

      const roomId: number | null = await this.roomService.getRoomIdByName(roomName);
      if (!roomId) throw new NotFoundException(`Room ${roomName} - Doesn't exists`);

      const existingStorage: Storage | null = await this.storageRepository.findUniqueStorage(roomId, name);
      if (existingStorage) throw new ConflictException(`Storage with this - ${name} - in Room${roomName} already exists`);

      const storage: Storage = await this.storageRepository.create({ roomId, name, description });
      this.logger.log(`[${this.createStorageLocation.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.createStorageLocation.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const storage: StorageWithReagents | null = await this.storageRepository.findById(id, true);
      if (!storage) throw new NotFoundException('Storage Not Found');
      if (storage.reagents.length !== 0) {
        throw new ConflictException('Cannot delete storage because it has associated reagents.');
      }

      await this.storageRepository.delete(id);
      this.logger.log(`[${this.delete.name}] - Method finished`);
    } catch (error) {
      this.logger.error(`[${this.delete.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async update(id: number, storageDto: UpdateStroageDto): Promise<Storage> {
    this.logger.log(`[${this.update.name}] - Method start`);
    try {
      let storage: Storage | null = await this.storageRepository.findById(id);
      if (!storage) throw new NotFoundException('Storage Not Found');

      storage = await this.storageRepository.update({ id, ...storageDto });

      this.logger.log(`[${this.update.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.update.name}] - Exception thrown: ${error}`);
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
