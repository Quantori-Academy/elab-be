import { ApiProperty } from '@nestjs/swagger';

export class RoleGuardErrorDto {
  @ApiProperty({ example: 'Forbidden resource' })
  message: string;

  @ApiProperty({ example: 'Forbidden', description: "User doesn't have permission" })
  error: string;

  @ApiProperty({ example: 403 })
  statusCode: number;
}