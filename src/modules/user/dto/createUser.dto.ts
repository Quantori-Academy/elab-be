import { Role } from '@prisma/client';
import { IUser } from '../interfaces/userEntity.interface';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto implements IUser {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ example: 'strongPassword8character' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

class CreateUserErrorDto {
  @ApiProperty({ example: 'User with this email already exists' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}

class CreateUserValidationErrorDto {
  @ApiProperty({
    example: [
      'Invalid email address',
      'Password must be at least 8 characters long',
      'Password must be a string',
      'role must be one of the following values: Admin, ProcurementOfficer, Researcher',
    ],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export { CreateUserDto, CreateUserErrorDto, CreateUserValidationErrorDto };
