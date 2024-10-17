import { Inject, Injectable, Logger } from '@nestjs/common';
import { ROOM_REPOSITORY_TOKEN } from './room.repository';
import { IRoomRepository } from './interfaces/roomRepository.interface';
import { IRoomService } from './interfaces/roomService.interface';
import { PrismaService } from '../prisma/prisma.service';
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
}

const ROOM_SERVICE_TOKEN = Symbol('ROOM_SERVICE_TOKEN');
const RoomServiceProvider = {
  provide: ROOM_SERVICE_TOKEN,
  useClass: RoomService,
};

export { ROOM_SERVICE_TOKEN, RoomServiceProvider };
