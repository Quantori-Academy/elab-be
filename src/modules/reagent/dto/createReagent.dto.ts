import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateReagentDto {
  @ApiProperty({ example: 'Reagent A' })
  @IsString()
  name: string;

  @ApiProperty({ example: '58-08-2' })
  @IsString()
  casNumber: string;

  @ApiProperty({ example: 'Producer Name' })
  @IsString()
  producer: string;

  @ApiProperty({ example: 'CATALOG001' })
  @IsString()
  catalogId: string;

  @ApiProperty({ example: 'https://e-shop.com/catalog' })
  @IsString()
  catalogLink: string;

  @ApiProperty({ example: 234 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({ example: 'ml' })
  @IsString()
  quantityUnit: string;

  @ApiProperty({ example: 5.5 })
  @Transform(({ value }) => Number(value))
  @IsString()
  totalQuantity: number;

  @ApiProperty({ example: 'A sample reagent' })
  @IsString()
  description: string;

  @ApiProperty({ example: 0 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 2 })
  @Transform(({ value }) => Number(value))
  @IsString()
  storageId: number;

  @ApiProperty({ examples: ['Reagent', 'Sample'] })
  @IsEnum(Category)
  category: Category;
}

export class CreateReagentSuccessDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Reagent A' })
  @IsString()
  name: string;

  @ApiProperty({ example: '58-08-2' })
  @IsString()
  casNumber: string;

  @ApiProperty({ example: 'Producer Name' })
  @IsString()
  producer: string;

  @ApiProperty({ example: 'CATALOG001' })
  @IsString()
  catalogId: string;

  @ApiProperty({ example: 'https://e-shop.com/catalog' })
  @IsString()
  catalogLink: string;

  @ApiProperty({ example: 234 })
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({ example: 'ml' })
  @IsString()
  quantityUnit: string;

  @ApiProperty({ example: 5.5 })
  @IsString()
  totalQuantity: number;

  @ApiProperty({ example: 'A sample reagent' })
  @IsString()
  description: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 2 })
  @IsString()
  storageId: number;

  @ApiProperty({ examples: ['Reagent', 'Sample'] })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  updatedAt: Date;
}
