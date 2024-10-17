import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IRoomRepository } from './interfaces/roomRepository.interface';
import { Prisma, Room } from '@prisma/client';
import { CreateRoomDto } from './dto/createRoom.dto';

@Injectable()
export class RoomRepository implements IRoomRepository {
  private readonly logger: Logger = new Logger(RoomRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Room | null> {
    this.logger.log(`[${this.findById.name}] - Method start`);
    try {
      const room: Room | null = await this.prisma.room.findUnique({ where: { id } });
      this.logger.log(`[${this.findById.name}] - Method finished`);
      return room;
    } catch (error) {
      this.logger.error(`[${this.findById.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findRoomIdByName(roomName: string): Promise<number | null> {
    this.logger.log(`[${this.findRoomIdByName.name}] - Method start`);
    try {
      const room = await this.prisma.room.findUnique({
        where: { name: roomName },
        select: { id: true },
      });
      this.logger.log(`[${this.findRoomIdByName.name}] - Method finished`);
      return room ? room.id : null;
    } catch (error) {
      this.logger.error(`[${this.findRoomIdByName.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findRoomNameById(id: number): Promise<string | null> {
    this.logger.log(`[${this.findRoomNameById.name}] - Method start`);
    try {
      const room = await this.prisma.room.findUnique({
        where: { id },
        select: { name: true },
      });
      this.logger.log(`[${this.findRoomNameById.name}] - Method finished`);
      return room ? room.name : null;
    } catch (error) {
      this.logger.error(`[${this.findRoomNameById.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async findAll(): Promise<Room[]> {
    this.logger.log(`[${this.findAll.name}] - Method start`);
    try {
      const rooms: Room[] = await this.prisma.room.findMany({});
      this.logger.log(`[${this.findAll.name}] - Method finished,`);
      return rooms;
    } catch (error) {
      this.logger.error(`[${this.findAll.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async update(room: Room): Promise<Room> {
    this.logger.log(`[${this.update.name}] - Method start`);
    try {
      const updatedRoom: Room = await this.prisma.room.update({
        where: { id: room.id },
        data: room,
      });
      this.logger.log(`[${this.update.name}] - Method finished`);
      return updatedRoom;
    } catch (error) {
      this.logger.error(`[${this.update.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async create(roomDto: CreateRoomDto): Promise<Room> {
    this.logger.log(`[${this.create.name}] - Method start`);
    try {
      const room: Room = await this.prisma.room.create({
        data: roomDto,
      });
      this.logger.log(`[${this.create.name}] - Method finished`);
      return room;
    } catch (error) {
      this.logger.error(`[${this.create.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<Room> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const deletedRoom: Room = await this.prisma.room.delete({
        where: { id },
      });
      this.logger.log(`[${this.delete.name}] - Method finished`);
      return deletedRoom;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        error = new NotFoundException('Room Not Found');
      }
      this.logger.error(`[${this.delete.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async upsert(room: Room): Promise<void> {
    this.logger.log(`[${this.upsert.name}] - Method start`);
    try {
      await this.prisma.room.upsert({
        where: { id: room.id },
        update: {
          ...room,
        },
        create: {
          ...room,
        },
      });
      this.logger.log(`[${this.upsert.name}] - Method finished`);
    } catch (error) {
      this.logger.error(`[${this.upsert.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const ROOM_REPOSITORY_TOKEN = Symbol('ROOM_REPOSITORY_TOKEN');
const RoomRepositoryProvider = {
  provide: ROOM_REPOSITORY_TOKEN,
  useClass: RoomRepository,
};

export { ROOM_REPOSITORY_TOKEN, RoomRepositoryProvider };
