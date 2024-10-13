import { Controller, Get, HttpStatus, Inject, Logger, Query, UseGuards } from '@nestjs/common';
import { STORAGE_SERVICE_TOKEN } from './storage.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStorageService } from './interfaces/storageService.interface';
import { Role, Storage } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { GetStoragesQueryDto, GetStorageSuccessDto } from './dto/getStorage.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';
import { StorageOptions } from './interfaces/storageOptions.interface';
import { ValidateParseStorageOptionsPipe } from './pipes/validateParseQueries.pipe';

const ROUTE = 'storages';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class StorageController {
  private readonly logger: Logger = new Logger(StorageController.name);

  constructor(@Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {}

  @ApiBearerAuth()
  @ApiQuery({ type: GetStoragesQueryDto })
  @ApiResponse({ status: HttpStatus.OK, type: [GetStorageSuccessDto] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async getStorages(@Query(ValidateParseStorageOptionsPipe) options: StorageOptions) {
    this.logger.log(`[${this.getStorages.name}] - Method start`);
    try {
      const storages: Storage[] = await this.storageService.getStorages(options);
      this.logger.log(`[${this.getStorages.name}] - Method finished`);
      return storages;
    } catch (error) {
      this.logger.error(`[${this.getStorages.name}] - Exception thrown` + error);
      throw error;
    }
  }
}
