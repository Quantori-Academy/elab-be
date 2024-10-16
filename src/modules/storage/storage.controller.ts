import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { STORAGE_SERVICE_TOKEN } from './storage.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStorageService } from './interfaces/storageService.interface';
import { Role, Storage } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { GetStoragesQueryDto, GetStorageSuccessDto, GetStorageValidationErrorsDto } from './dto/getStorage.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';
import { StorageOptions } from './interfaces/storageOptions.interface';
import { ValidateParseStorageOptionsPipe } from './pipes/validateParseQueries.pipe';
import {
  CreateStorageConflictErrorDto,
  CreateStorageLocationsDto,
  CreateStorageNotFoundErrorDto,
  CreateStorageValidationErrorDto,
} from './dto/createStorageLocation.dto';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { DeleteStorageNotFoundErrorDto, DeleteStorageSuccessDto } from './dto/deleteStorage.dto';
import { ParseIdPipeErrorDto } from 'src/common/dtos/parseId.dto';

const ROUTE = 'storages';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class StorageController {
  private readonly logger: Logger = new Logger(StorageController.name);

  constructor(@Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService) {}

  @ApiBearerAuth()
  @ApiQuery({ type: GetStoragesQueryDto })
  @ApiResponse({ status: HttpStatus.OK, type: [GetStorageSuccessDto] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: GetStorageValidationErrorsDto })
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

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: GetStorageSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: CreateStorageValidationErrorDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: CreateStorageNotFoundErrorDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: CreateStorageConflictErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createStorageLocation(@Body(new ValidationPipe({ transform: true })) storageDto: CreateStorageLocationsDto) {
    this.logger.log(`[${this.createStorageLocation.name}] - Method start`);
    try {
      const storage: Storage = await this.storageService.createStorageLocation(storageDto);
      this.logger.log(`[${this.createStorageLocation.name}] - Method finished`);
      return storage;
    } catch (error) {
      this.logger.error(`[${this.createStorageLocation.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: DeleteStorageSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ParseIdPipeErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: DeleteStorageNotFoundErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteStorage(@Param('id', ParseIdPipe) id: number) {
    this.logger.log(`[${this.deleteStorage.name}] - Method start`);
    try {
      await this.storageService.delete(id);
      this.logger.log(`[${this.deleteStorage.name}] - Method finished`);
      return {
        message: 'Storage Successfully deleted',
        code: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`[${this.deleteStorage.name}] - Exception thrown: ` + error);
      throw error;
    }
  }
}
