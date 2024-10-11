import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class LocationValidationPipe implements PipeTransform {
  private readonly logger: Logger = new Logger(LocationValidationPipe.name);

  transform(value: string): string {
    this.logger.log(`[${this.transform.name}] - Method start`);
    try {
      const locationPattern = /^Room\d+-Cabinet\d+-Shelf\d+$/;
      if (!locationPattern.test(value)) {
        throw new BadRequestException(
          'Location must follow the format RoomX-CabinetY-ShelfZ where X, Y, and Z are numeric strings.',
        );
      }
      this.logger.log(`[${this.transform.name}] - Method finished`);
      return value;
    } catch (error) {
      this.logger.error(`[${this.transform.name}] - Exception thrown: ${error}`);
      throw error;
    }
  }
}
