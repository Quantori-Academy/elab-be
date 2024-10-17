import { Controller, Inject, Logger } from '@nestjs/common';
import { ROOM_SERVICE_TOKEN } from './room.service';
import { IRoomService } from './interfaces/roomService.interface';
import { ApiTags } from '@nestjs/swagger';

const ROUTE = 'rooms';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class RoomController {
  private readonly logger: Logger = new Logger(RoomController.name);

  constructor(@Inject(ROOM_SERVICE_TOKEN) private roomService: IRoomService) {}
}
