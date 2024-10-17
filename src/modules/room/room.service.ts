import { Inject, Injectable, Logger } from '@nestjs/common';
import { ROOM_REPOSITORY_TOKEN } from './room.repository';
import { IRoomRepository } from './interfaces/roomRepository.interface';
import { IRoomService } from './interfaces/roomService.interface';
@Injectable()
export class RoomService implements IRoomService {
  private readonly logger: Logger = new Logger(RoomService.name);

  constructor(@Inject(ROOM_REPOSITORY_TOKEN) private roomRepository: IRoomRepository) {}
}

const ROOM_SERVICE_TOKEN = Symbol('ROOM_SERVICE_TOKEN');
const RoomServiceProvider = {
  provide: ROOM_SERVICE_TOKEN,
  useClass: RoomService,
};

export { ROOM_SERVICE_TOKEN, RoomServiceProvider };
