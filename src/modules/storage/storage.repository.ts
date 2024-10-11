import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageRepository } from './interfaces/storageRepository.interface';
import { Storage } from '@prisma/client';

@Injectable()
export class StorageRepository implements IStorageRepository {
  private readonly logger: Logger = new Logger(StorageRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Storage | null> {
    this.logger.log(`[${this.findById.name}] - Method start`);
    try {
      const storage: Storage | null = await this.prisma.storage.findUnique({
        where: { id },
      });
      this.logger.log(`[${this.findById.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.findById.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async getRoomIdByName(roomName: string): Promise<number | null> {
    this.logger.log(`[${this.getRoomIdByName.name}] - Method start`);
    try {
      const room = await this.prisma.room.findUnique({
        where: { name: roomName },
        select: { id: true },
      });
      this.logger.log(`[${this.getRoomIdByName.name}] - Method finished`);
      return room ? room.id : null;
    } catch (error) {
      this.logger.error(`[${this.getRoomIdByName.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findUniqueStorage(roomName: string, storageName: string): Promise<Storage | null> {
    this.logger.log(`[${this.findUniqueStorage.name}] - Method start`);
    try {
      const roomId: number | null = await this.getRoomIdByName(roomName);
      if (!roomId) return null;

      const storage: Storage | null = await this.prisma.storage.findUnique({
        where: {
          roomId_name: {
            roomId: roomId,
            name: storageName,
          },
        },
      });
      this.logger.log(`[${this.findUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.findUniqueStorage.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAll(): Promise<Storage[]> {
    this.logger.log(`[${this.findAll.name}] - Method start`);
    try {
      const storages: Storage[] = await this.prisma.storage.findMany();
      this.logger.log(`[${this.findAll.name}] - Method finished,`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.findAll.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAllInRoom(roomName: string): Promise<Storage[] | null> {
    this.logger.log(`[${this.findAll.name}] - Method start`);
    try {
      const roomId: number | null = await this.getRoomIdByName(roomName);
      if (!roomId) return null;

      const storages: Storage[] = await this.prisma.storage.findMany({
        where: { roomId },
      });
      this.logger.log(`[${this.findAll.name}] - Method finished,`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.findAll.name}] - Exception thrown: ${error}`);
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

  async create(storage: Storage): Promise<Storage> {
    this.logger.log(`[${this.create.name}] - Method start`);
    try {
      const newStorage = await this.prisma.storage.create({
        data: storage,
      });
      this.logger.log(`[${this.create.name}] - Method finished`);
      return newStorage;
    } catch (error) {
      this.logger.error(`[${this.create.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(storage: Storage): Promise<Storage> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const deletedStorage = await this.prisma.storage.delete({
        where: { id: storage.id },
      });
      this.logger.log(`[${this.delete.name}] - Method finished`);
      return deletedStorage;
    } catch (error) {
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
}

const STORAGE_REPOSITORY_TOKEN = Symbol('STORAGE_REPOSITORY_TOKEN');
const StorageRepositoryProvider = {
  provide: STORAGE_REPOSITORY_TOKEN,
  useClass: StorageRepository,
};

export { STORAGE_REPOSITORY_TOKEN, StorageRepositoryProvider };
