import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { FlagOptions, PaginationOptions, ReagentSearchOptions, SortOptions } from '../interfaces/reagentOptions.interface';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { SearchByStructureDto } from '../dto/searchByStructure.dto';

@Injectable()
export class ValidateParseForSearchPipe implements PipeTransform {
  async transform(queries: any): Promise<ReagentSearchOptions> {
    const queryDto = plainToClass(SearchByStructureDto, queries);
    const errors: ValidationError[] = await validate(queryDto);

    if (errors.length > 0) {
      const messages: string[] = [];

      errors.forEach((error: ValidationError) => {
        if (error.constraints) {
          Object.values(error.constraints).forEach((constraint) => {
            messages.push(constraint);
          });
        }
      });
      throw new BadRequestException({
        messages,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
      });
    }

    const sort: SortOptions = {
      sortByName: queryDto.sortByName,
      sortByCreationDate: queryDto.sortByCreationDate,
      sortByUpdatedDate: queryDto.sortByUpdatedDate,
    };

    const pagination: PaginationOptions = {
      skip: queryDto.skip,
      take: queryDto.take,
    };

    const flag: FlagOptions = {
      isFullStructure: queryDto.isFullStructure,
    };

    const options: ReagentSearchOptions = {
      sort,
      pagination,
      structure: queryDto.structure,
      flag,
    };

    return options;
  }
}
