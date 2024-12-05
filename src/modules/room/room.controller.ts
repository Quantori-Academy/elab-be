import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ROOM_SERVICE_TOKEN } from './room.service';
import { IRoomService } from './interfaces/roomService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Entity, Role, Room } from '@prisma/client';
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
import {
  UpdateRoomConflictErrorDto,
  UpdateRoomDto,
  UpdateRoomNotFoundErrorDto,
  UpdateRoomSuccessDto,
  UpdateRoomValidationErrorDto,
} from './dto/updateRoom.dto';
import { GetRoomSuccessDto } from './dto/getRooms.dto';
import { AuditLogService } from 'src/common/services/auditLog.service';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { GetRoomHistorySuccessDto } from './dto/getRoomHistory.dto';

const ROUTE = 'rooms';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class RoomController {
  private readonly logger: Logger = new Logger(RoomController.name);

  constructor(@Inject(ROOM_SERVICE_TOKEN) private roomService: IRoomService,  private auditLogService: AuditLogService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRoomSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: CreateRoomValidationErrorDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: CreateRoomConflictErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createRoom(@Body(ValidationPipe) roomDto: CreateRoomDto, @Req() req: any) {
    this.logger.log(`[${this.createRoom.name}] - Method start`);
    try {
      const user: UserPayload = (req as any).user as UserPayload; 
      const room: Room = await this.roomService.createRoom(roomDto);
      this.logger.log(`[${this.createRoom.name}] - Method finished`);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: 'CREATE ROOM',
        entity: Entity.Room,
        newData: room
      });
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
  async deleteRoom(@Param('id', ParseIdPipe) id: number, @Req() req: any) {
    this.logger.log(`[${this.deleteRoom.name}] - Method start`);
    try {
      const user: UserPayload = (req as any).user as UserPayload; 
      const deletedRoom = await this.roomService.delete(id);
      this.logger.log(`[${this.deleteRoom.name}] - Method finished`);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: 'DELETE ROOM',
        entity: Entity.Room,
        oldData: deletedRoom
      });
      return {
        message: 'Room Successfully deleted',
        code: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`[${this.deleteRoom.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: UpdateRoomSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: UpdateRoomValidationErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: UpdateRoomNotFoundErrorDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: UpdateRoomConflictErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async updateRoom(@Param('id', ParseIdPipe) id: number, @Body(ValidationPipe) roomDto: UpdateRoomDto, @Req() req: any) {
    this.logger.log(`[${this.updateRoom.name}] - Method start`);
    try {
      const user: UserPayload = (req as any).user as UserPayload; 
      const oldRoom = await this.roomService.getRoomById(id);
      const room: Room = await this.roomService.update(id, roomDto);
      this.logger.log(`[${this.updateRoom.name}] - Method finished`);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: 'UPDATE ROOM',
        entity: Entity.Room,
        oldData: oldRoom,
        newData: room
      });
      return room;
    } catch (error) {
      this.logger.error(`[${this.updateRoom.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: [GetRoomSuccessDto] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @UseGuards(AuthGuard)
  @Get('')
  async getRooms() {
    this.logger.log(`[${this.getRooms.name}] - Method start`);
    try {
      const rooms: Room[] = await this.roomService.getRooms();
      this.logger.log(`[${this.getRooms.name}] - Method finished`);
      return rooms;
    } catch (error) {
      this.logger.error(`[${this.getRooms.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetRoomHistorySuccessDto })
  @Roles(Role.ProcurementOfficer, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/history')
  async getRoomHistory() {
    try {
      const history = await this.auditLogService.getHistory(Entity.Room);
      return history;
    } catch (error) {
      this.logger.error(`[${this.getRoomHistory.name}] - Exception thrown: ` + error);
      throw error; 
    }
  }
}
