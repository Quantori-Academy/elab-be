import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

class CreateReagentFromRequestDto {
  @ApiProperty({ example: 2 })
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsNotEmpty()
  storageId: number;

  @ApiProperty({ example: 'Producer Name' })
  @IsString()
  @IsNotEmpty()
  producer: string;

  @ApiProperty({ example: 'CATALOG001' })
  @IsString()
  @IsNotEmpty()
  catalogId: string;

  @ApiProperty({ example: 'https://e-shop.com/catalog' })
  @IsString()
  @IsNotEmpty()
  catalogLink: string;

  @ApiProperty({ example: 666 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  pricePerUnit: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  expirationDate: Date;
}

class CreateReagentValidationErrorDto {
  @ApiProperty({
    example: [
      'storageId should not be empty',
      'storageId must be a positive number',
      'producer should not be empty',
      'producer must be a string',
      'catalogId should not be empty',
      'catalogId must be a string',
      'catalogLink should not be empty',
      'catalogLink must be a string',
      'pricePerUnit should not be empty',
      'pricePerUnit must be a number conforming to the specified constraints',
      'expirationDate should not be empty',
      'expirationDate must be a Date instance',
    ],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

class ReagentNotFoundErrorDto {
  @ApiProperty({ example: 'Reagent request is not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;
}
export { CreateReagentFromRequestDto, CreateReagentValidationErrorDto, ReagentNotFoundErrorDto };
