import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LocationValidationPipe implements PipeTransform {
  transform(value: string): string {
    const locationPattern = /^Room\d+-Cabinet\d+-Shelf\d+$/;

    if (!locationPattern.test(value)) {
      throw new BadRequestException(
        'Location must follow the format RoomX-CabinetY-ShelfZ where X, Y, and Z are numeric strings.',
      );
    }
    return value;
  }
}
