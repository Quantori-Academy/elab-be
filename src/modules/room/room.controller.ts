import { Body, Controller, Delete, HttpStatus, Inject, Logger, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ROOM_SERVICE_TOKEN } from './room.service';
import { IRoomService } from './interfaces/roomService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, Room } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { DeleteRoomConflictErrorDto, DeleteRoomNotFoundErrorDto, DeleteRoomSuccessDto } from './dto/deleteRoom.dto';
import { ParseIdPipeErrorDto } from 'src/common/dtos/parseId.dto';
import {
  CreateRoomConflictErrorDto,
  CreateRoomDto,
  CreateRoomSuccessDto,
  CreateRoomValidationErrorDto,
} from './dto/createRoom.dto';

const ROUTE = 'rooms';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class RoomController {
  private readonly logger: Logger = new Logger(RoomController.name);

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRoomSuccessDto })
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

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: DeleteRoomSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ParseIdPipeErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: DeleteRoomNotFoundErrorDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: DeleteRoomConflictErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteRoom(@Param('id', ParseIdPipe) id: number) {
    this.logger.log(`[${this.deleteRoom.name}] - Method start`);
    try {
      await this.roomService.delete(id);
      this.logger.log(`[${this.deleteRoom.name}] - Method finished`);
      return {
        message: 'Room Successfully deleted',
        code: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`[${this.deleteRoom.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  constructor(@Inject(ROOM_SERVICE_TOKEN) private roomService: IRoomService) {}
}
