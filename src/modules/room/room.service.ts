import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY_TOKEN } from './room.repository';
import { IRoomRepository } from './interfaces/roomRepository.interface';
import { IRoomService } from './interfaces/roomService.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Room } from '@prisma/client';
import { RoomWithStorages } from './types/room.type';
@Injectable()
export class RoomService implements IRoomService {
  private readonly logger: Logger = new Logger(RoomService.name);

  constructor(
    @Inject(ROOM_REPOSITORY_TOKEN) private roomRepository: IRoomRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getRoomNameById(id: number): Promise<string | null> {
    this.logger.log(`[${this.getRoomNameById.name}] - Method start`);
    try {
      const room = await this.prisma.room.findUnique({
        where: { id },
        select: { name: true },
      });
      this.logger.log(`[${this.getRoomNameById.name}] - Method finished`);
      return room ? room.name : null;
    } catch (error) {
      this.logger.error(`[${this.getRoomNameById.name}] - Exception thrown: ${error}`);
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

  async createRoom(roomDto: Room): Promise<Room> {
    this.logger.log(`[${this.createRoom.name}] - Method start`);
    try {
      const roomExists = await this.roomRepository.findRoomIdByName(roomDto.name);
      if (roomExists) throw new ConflictException(`Room with name ${roomDto.name} already exists`);

      const room: Room = await this.roomRepository.create(roomDto);
      this.logger.log(`[${this.createRoom.name}] - Method finished`);
      return room;
    } catch (error) {
      this.logger.error(`[${this.createRoom.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`[${this.delete.name}] - Method start`);
    try {
      const room: RoomWithStorages | null = await this.roomRepository.findById(id, true);
      if (!room) throw new NotFoundException('Room Not Found');
      if (room.storages.length !== 0) {
        throw new ConflictException('Cannot delete Room because it has associated storage locations.');
      }

      await this.roomRepository.delete(id);
      this.logger.log(`[${this.delete.name}] - Method finished`);
    } catch (error) {
      this.logger.error(`[${this.delete.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}

const ROOM_SERVICE_TOKEN = Symbol('ROOM_SERVICE_TOKEN');
const RoomServiceProvider = {
  provide: ROOM_SERVICE_TOKEN,
  useClass: RoomService,
};

export { ROOM_SERVICE_TOKEN, RoomServiceProvider };