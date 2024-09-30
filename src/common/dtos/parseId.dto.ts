import { ApiProperty } from '@nestjs/swagger';

export class ParseIdPipeErrorDto {
  @ApiProperty({ example: 'Invalid value for "id" is not a valid integer.' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
