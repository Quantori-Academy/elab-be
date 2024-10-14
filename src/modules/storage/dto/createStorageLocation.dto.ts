import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

class CreateStorageLocationsDto {
  @ApiProperty({ example: 3 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  roomId: number;

  @ApiProperty({ example: 'Unique name' })
  @IsString()
  name: string;

  @IsString()
  @ApiProperty({ example: 'Description for storage' })
  description?: string | null;
}

class CreateStorageErrorDto {
  @ApiProperty({
    example: ['Storage with this name in Room{n} already exists', 'Room with id - N, is not found'],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;
}

class CreateStorageValidationErrorDto {
  @ApiProperty({
    example: ['roomId must not be less than 1', 'roomId must be an integer number'],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

export { CreateStorageLocationsDto, CreateStorageErrorDto, CreateStorageValidationErrorDto };
