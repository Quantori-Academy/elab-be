import { Injectable, PipeTransform, BadRequestException, HttpStatus } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetStoragesQueryDto } from '../dto/getStorage.dto';
import { FilterOptions, PaginationOptions, SortOptions, StorageOptions } from '../interfaces/storageOptions.interface';

@Injectable()
export class ValidateParseStorageOptionsPipe implements PipeTransform {
  async transform(queries: any): Promise<StorageOptions> {
    const queryDto = plainToClass(GetStoragesQueryDto, queries);

    const errors: ValidationError[] = await validate(queryDto);

    if (errors.length > 0) {
      const [messages] = errors.map((error: ValidationError) => {
        return error.constraints ? Object.values(error.constraints) : [];
      });

      throw new BadRequestException({
        message: messages,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
      });
    }

    const filters: FilterOptions = {
      roomName: queryDto.roomName,
      storageName: queryDto.storageName,
    };

    const sorts: SortOptions = {
      alphabeticalName: queryDto.alphabeticalName,
      chronologicalDate: queryDto.chronologicalDate,
    };

    const paginations: PaginationOptions = {
      skip: queryDto.skip,
      take: queryDto.take,
    };

    const options: StorageOptions = {
      filter: filters,
      sort: sorts,
      pagination: paginations,
    };

    return options;
  }
}
