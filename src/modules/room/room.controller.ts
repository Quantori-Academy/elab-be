import { Body, Controller, HttpStatus, Inject, Logger, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ROOM_SERVICE_TOKEN } from './room.service';
import { IRoomService } from './interfaces/roomService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, Room } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateRoomConflictErrorDto, CreateRoomDto, CreateRoomValidationErrorDto } from './dto/createRoom.dto';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';

const ROUTE = 'rooms';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class RoomController {
  private readonly logger: Logger = new Logger(RoomController.name);

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRoomDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: CreateRoomValidationErrorDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: CreateRoomConflictErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createRoom(@Body(ValidationPipe) roomDto: CreateRoomDto) {
    this.logger.log(`[${this.createRoom.name}] - Method start`);
    try {
      const room: Room = await this.roomService.createRoom(roomDto);
      this.logger.log(`[${this.createRoom.name}] - Method finished`);
      return room;
    } catch (error) {
      this.logger.error(`[${this.createRoom.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  constructor(@Inject(ROOM_SERVICE_TOKEN) private roomService: IRoomService) {}
}
