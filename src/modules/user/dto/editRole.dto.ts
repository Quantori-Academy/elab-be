import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class EditRoleDto {
  @IsEnum(Role)
  role: Role;
}
