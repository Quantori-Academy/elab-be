import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class EditRoleDto {
  @ApiProperty({ example: 'Admin' })
  @IsEnum(Role)
  role: Role;
}

class EditRoleSuccessResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'admin@elab.com' })
  email: string;

  @ApiProperty({ example: 'Admin' })
  role: Role;
}

class EditRoleErrorResponseDto {
  @ApiProperty({ example: 'User not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export { EditRoleDto, EditRoleSuccessResponseDto, EditRoleErrorResponseDto };
