import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Order } from '../interfaces/storageOptions.interface';
import { Transform } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

class GetStoragesQueryDto {
  @ApiProperty({ required: false, type: String, description: 'Name of the room' })
  @IsOptional()
  @IsString()
  roomName?: string;

  @ApiProperty({ required: false, type: String, description: 'Name of the storage' })
  @IsOptional()
  @IsString()
  storageName?: string;

  @ApiProperty({ required: false, type: Number, description: 'Starting index for pagination', minimum: 0 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiProperty({ required: false, type: Number, description: 'Number of items to return', minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  take?: number;

  @ApiProperty({ required: false, enum: Order, description: 'Order by chronological date (asc or desc)' })
  @IsOptional()
  @IsEnum(Order)
  chronologicalDate?: Order;

  @ApiProperty({ required: false, enum: Order, description: 'Order by alphabetical name (asc or desc)' })
  @IsOptional()
  @IsEnum(Order)
  alphabeticalName?: Order;
}

class GetStorageSuccessDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 3 })
  roomId: number;

  @ApiProperty({ example: 'some name' })
  name: string;

  @ApiProperty({ example: 'Description for storage' })
  description: string;

  @ApiProperty({ example: '2024-10-11T09:04:23.426Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-10-11T09:04:23.426Z' })
  updatedAt: Date;
}

class GetStorageValidationErrorsDto {
  @ApiProperty({
    example: [
      'skip must not be less than 0',
      'skip must be an integer number',
      'take must not be less than 1',
      'take must be an integer number',
      'chronologicalDate must be one of the following values: asc, desc',
      'alphabeticalName must be one of the following values: asc, desc',
      'Only one of alphabeticalName or chronologicalDate must be provided',
    ],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

export { GetStorageSuccessDto, GetStoragesQueryDto, GetStorageValidationErrorsDto };
