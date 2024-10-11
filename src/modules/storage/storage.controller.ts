import { Controller, Get, HttpStatus, Inject, Logger, UseGuards } from '@nestjs/common';
import { STORAGE_SERVICE_TOKEN } from './storage.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStorageService } from './interfaces/storageService.interface';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { IStorage } from './interfaces/storage.interface';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';

const ROUTE = 'storages';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class StorageController {
  private readonly logger: Logger = new Logger(StorageController.name);

  constructor(@Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async getStorages() {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const users: IStorage[] = await this.storageService.getStorages();
      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return users;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown` + error);
      throw error;
    }
  }
}
