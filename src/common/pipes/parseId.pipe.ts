import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Value is required.');
    }

    const message = `Invalid value for parameter "${metadata.data}": "${value}" is not a valid id.`;
    const isValidInteger = /^\d+$/.test(value);
    if (!isValidInteger) throw new BadRequestException(message);

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue === 0) throw new BadRequestException(message);

    return parsedValue;
  }
}
