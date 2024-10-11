import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ParseLocationPipeErrorDto {
  @ApiProperty({
    example: 'Location must follow the format RoomX-CabinetY-ShelfZ where X, Y, and Z are numeric strings.',
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}
