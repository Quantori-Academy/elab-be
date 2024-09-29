import { ApiProperty } from '@nestjs/swagger';

export class RoleGuardErrorDto {
  @ApiProperty({ example: 'Forbidden resource' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;

  @ApiProperty({ example: 403 })
  statusCode: number;
}
