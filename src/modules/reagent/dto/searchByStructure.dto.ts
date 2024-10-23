import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Order } from 'src/modules/storage/interfaces/storageOptions.interface';

export class SearchByStructureDto {
  @ApiProperty({ example: 'c1cccnc1' })
  @IsString()
  structure: string;

  @ApiProperty({ required: false, type: String, description: 'Name of the reagent or sample' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, enum: Category, description: 'Category of reagent: it is Reagent or Sample' })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiProperty({ required: false, enum: Order, description: 'Sorting by the name of Reagent (asc | desc)' })
  @IsOptional()
  @IsEnum(Order)
  sortByName?: Order;

  @ApiProperty({ required: false, enum: Order, description: 'Sorting by the creation date of Reagent (asc | desc)' })
  @IsOptional()
  @IsEnum(Order)
  sortByCreationDate?: Order;

  @ApiProperty({ required: false, enum: Order, description: 'Sorting by the updated date of Reagent (asc | desc)' })
  @IsOptional()
  @IsEnum(Order)
  sortByUpdatedDate?: Order;

  @ApiProperty({ required: false, type: Number, description: 'Starting index of pagination', minimum: 0 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsInt()
  skip?: number;

  @ApiProperty({ required: false, type: Number, description: 'Returned items', minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @IsInt()
  take?: number;
}

export class SearchByStructureSuccessDto {
  @ApiProperty({ example: 'Reagent A' })
  @IsString()
  name: string;

  @ApiProperty({ examples: ['Reagent', 'Sample'] })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ example: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1' })
  @IsString()
  structure: string;

  @ApiProperty({ example: 'Description of the reagent' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5.5 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  storageId: number;
}

export class SearchByStructureErrorDto {
  @ApiProperty({
    examples: [
      'skip must not be less than 0',
      'skip must be an integer number',
      'take must not be less than 1',
      'take must be an integer number',
      'sortByCreationDate must be one of the following values: asc, desc',
      'sortByUpdatedDate must be one of the following values: asc, desc',
      'sortByName must be one of the following values: asc, desc',
    ],
  })
  @IsString()
  message: string;

  @ApiProperty({ example: 'Bad request' })
  @IsString()
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  @IsNumber()
  statusCode: number;
}