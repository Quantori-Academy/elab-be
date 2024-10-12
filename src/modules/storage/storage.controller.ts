import { Controller, Get, HttpStatus, Inject, Logger, Param, Query, UseGuards } from '@nestjs/common';
import { STORAGE_SERVICE_TOKEN } from './storage.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStorageService } from './interfaces/storageService.interface';
import { Role, Storage } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { GetStorageErrorDto, GetStorageSuccessDto } from './dto/getStorage.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';

const ROUTE = 'storages';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class StorageController {
  private readonly logger: Logger = new Logger(StorageController.name);

  constructor(@Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: [GetStorageSuccessDto] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async getStorages(@Query() obj: any) {
    console.log(obj);
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const storages: Storage[] = await this.storageService.getAllStorages();
      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: [GetStorageSuccessDto] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':roomName')
  async getStoragesInRoom(@Param('roomName') roomName: string) {
    this.logger.log(`[${this.getStoragesInRoom.name}] - Method start`);
    try {
      const storages: Storage[] = (await this.storageService.getStoragesInRoom(roomName)) as Storage[];
      this.logger.log(`[${this.getStoragesInRoom.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStoragesInRoom.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetStorageSuccessDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: GetStorageErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':roomName/:storageName')
  async getUniqueStorage(@Param('roomName') roomName: string, @Param('storageName') storageName: string) {
    this.logger.log(`[${this.getUniqueStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageService.getUniqueStorage(roomName, storageName);
      this.logger.log(`[${this.getUniqueStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getUniqueStorage.name}] - Exception thrown` + error);
      throw error;
    }
  }
}
