import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

class UpdateOrderDto {
  @ApiProperty({ example: 'title' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  title?: string | undefined;

  @ApiProperty({ example: 'Seler name' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  seller?: string | undefined;

  @ApiProperty({ required: false, example: 'Fulfilled' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsEnum(Status)
  status?: Status;
}

class UpdateOrderSuccessDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 3 })
  userId: number;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'seller' })
  seller: string;

  @ApiProperty({ example: Status.Fulfilled })
  status: Status;

  @ApiProperty({ example: '2024-10-18T12:57:35.834Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-10-23T17:09:00.204Z' })
  updatedAt: string;
}

class UpdateOrderValidationErrorDto {
  @ApiProperty({
    example: [
      'Invalid value for "id" is not a valid integer',
      'title must be a string',
      'title must be shorter than or equal to 200 characters',
      'seller must be a string',
      'seller must be shorter than or equal to 200 characters',
      'status must be one of the following values: Pending, Ordered, Fulfilled, Declined',
    ],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

class UpdateOrderNotFoundErrorDto {
  @ApiProperty({
    example: 'Order Not Found',
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;
}

export { UpdateOrderDto, UpdateOrderSuccessDto, UpdateOrderValidationErrorDto, UpdateOrderNotFoundErrorDto };
