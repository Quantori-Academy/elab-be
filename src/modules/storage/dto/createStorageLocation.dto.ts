import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

class CreateStorageLocationsDto {
  @ApiProperty({ example: 3 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  roomId: number;

  @ApiProperty({ example: 'Unique name' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Description for storage' })
  description?: string | null;
}

class CreateStorageConflictErrorDto {
  @ApiProperty({
    example: ['Storage with this name in Room{n} already exists'],
  })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: number;
}

class CreateStorageNotFoundErrorDto {
  @ApiProperty({
    example: ['Room with id - N, is not found'],
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;
}

class CreateStorageValidationErrorDto {
  @ApiProperty({
    example: ['roomId must not be less than 1', 'roomId must be an integer number', 'name must be a string'],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

export {
  CreateStorageLocationsDto,
  CreateStorageConflictErrorDto,
  CreateStorageValidationErrorDto,
  CreateStorageNotFoundErrorDto,
};
