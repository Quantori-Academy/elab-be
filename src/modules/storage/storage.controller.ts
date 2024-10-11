import { Controller, Get, HttpStatus, Inject, Logger, Param, UseGuards } from '@nestjs/common';
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
import { LocationValidationPipe } from './pipes/location.pipe';
import { ParseLocationPipeErrorDto } from './dto/location.dto';

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
  async getStorages() {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const storages: Storage[] = await this.storageService.getStorages();
      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetStorageSuccessDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: GetStorageErrorDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ParseLocationPipeErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':location')
  async getStorage(@Param('location', LocationValidationPipe) location: string) {
    this.logger.log(`[${this.getStorage.name}] - Method start`);
    try {
      const storage: Storage | null = await this.storageService.getStoragByLocation(location);
      this.logger.log(`[${this.getStorage.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.getStorage.name}] - Exception thrown` + error);
      throw error;
    }
  }
}
