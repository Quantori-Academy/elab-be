import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { Prisma, Storage } from '@prisma/client';
import { OrderBy, PaginationOptions, SortOptions } from './interfaces/storageOptions.interface';
import { CreateStorageLocationsDto } from './dto/createStorageLocation.dto';
import { StorageWithReagents } from './types/storage.types';

@Injectable()
export class StorageRepository implements IStorageRepository {
  private readonly logger: Logger = new Logger(StorageRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<Storage | null>; // base
  findById(id: number, includeReagents: true): Promise<StorageWithReagents | null>; // overload

  // implementation signature
  async findById(id: number, includeReagents: boolean = false): Promise<Storage | StorageWithReagents | null> {
    this.logger.log(`[${this.findById.name}] - Method start`);
    try {
      const storage: Storage | null = await this.prisma.storage.findUnique({
        where: { id },
        include: {
          room: true,
          reagents: includeReagents,
        },
      });
      this.logger.log(`[${this.findById.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.findById.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findUniqueStorage(roomId: number, storageName: string): Promise<Storage | null> {
    this.logger.log(`[${this.findUniqueStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.prisma.storage.findUnique({
        where: {
          roomId_name: {
            roomId,
            name: storageName,
          },
        },
        include: {
          room: true,
        },
      });
      this.logger.log(`[${this.findUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.findUniqueStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAll(pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]> {
    this.logger.log(`[${this.findAll.name}] - Method start`);
    try {
      const { skip = 0, take = 10 } = pagination || {};
      const orderBy: OrderBy = this.orderFactory(sortOptions);
      const storages: Storage[] = await this.prisma.storage.findMany({
        skip,
        take,
        orderBy,
        include: {
          room: true,
        },
      });
      this.logger.log(`[${this.findAll.name}] - Method finished,`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.findAll.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAllByName(storageName: string, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[]> {
    this.logger.log(`[${this.findAllByName.name}] - Method start`);
    try {
      const { skip = 0, take = 10 } = pagination || {};
      const orderBy: OrderBy = this.orderFactory(sortOptions);

      const storages: Storage[] = await this.prisma.storage.findMany({
        where: {
          name: storageName,
        },
        skip,
        take,
        orderBy,
        include: {
          room: true,
        },
      });
      this.logger.log(`[${this.findAllByName.name}] - Method finished,`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.findAllByName.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAllByRoom(roomId: number, pagination?: PaginationOptions, sortOptions?: SortOptions): Promise<Storage[] | null> {
    this.logger.log(`[${this.findAllByRoom.name}] - Method start`);
    try {
      const { skip = 0, take = 10 } = pagination || {};
      const orderBy: OrderBy = this.orderFactory(sortOptions);
      const storages: Storage[] = await this.prisma.storage.findMany({
        where: { roomId },
        skip,
        take,
        orderBy,
        include: {
          room: true,
        },
      });
      this.logger.log(`[${this.findAllByRoom.name}] - Method finished,`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.findAllByRoom.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async update(storage: Storage): Promise<Storage> {
    this.logger.log(`[${this.update.name}] - Method start`);
    try {
      const updatedStorage: Storage = await this.prisma.storage.update({
        where: { id: storage.id },
        data: storage,
      });
      this.logger.log(`[${this.update.name}] - Method finished`);
      return updatedStorage;
    } catch (error) {
      this.logger.error(`[${this.update.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async create(storageDto: CreateStorageLocationsDto): Promise<Storage> {
    this.logger.log(`[${this.create.name}] - Method start`);
    try {
      const storage: Storage = await this.prisma.storage.create({
        data: storageDto,
        include: {
          room: true,
        },
      });
      this.logger.log(`[${this.create.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.create.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<Storage> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const deletedStorage: Storage = await this.prisma.storage.delete({
        where: { id },
      });
      this.logger.log(`[${this.delete.name}] - Method finished`);
      return deletedStorage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        error = new NotFoundException('Storage Not Found');
      }
      this.logger.error(`[${this.delete.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async upsert(storage: Storage): Promise<void> {
    this.logger.log(`[${this.upsert.name}] - Method start`);
    try {
      await this.prisma.storage.upsert({
        where: { id: storage.id },
        update: {
          ...storage,
        },
        create: {
          ...storage,
        },
      });
      this.logger.log(`[${this.upsert.name}] - Method finished`);
    } catch (error) {
      this.logger.error(`[${this.upsert.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  private orderFactory(sortOptions: SortOptions | undefined): OrderBy {
    this.logger.log(`[${this.orderFactory.name}] - Method start`);
    try {
      if (!sortOptions) return undefined;
      const orderBy: OrderBy = {};
      if (sortOptions.alphabeticalName) {
        orderBy.name = sortOptions.alphabeticalName;
      }
      if (sortOptions.chronologicalDate) {
        orderBy.createdAt = sortOptions.chronologicalDate;
      }
      this.logger.log(`[${this.orderFactory.name}] - Method finished`);
      return Object.keys(orderBy).length > 0 ? orderBy : undefined;
    } catch (error) {
      this.logger.error(`[${this.orderFactory.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const STORAGE_REPOSITORY_TOKEN = Symbol('STORAGE_REPOSITORY_TOKEN');
const StorageRepositoryProvider = {
  provide: STORAGE_REPOSITORY_TOKEN,
  useClass: StorageRepository,
};

export { STORAGE_REPOSITORY_TOKEN, StorageRepositoryProvider };
