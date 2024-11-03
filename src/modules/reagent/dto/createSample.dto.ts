import { ApiProperty } from '@nestjs/swagger';
import { Category, Package } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSampleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  structure: string;

  @ApiProperty({ example: 'A sample reagent', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 'ml' })
  @IsString()
  quantityUnit: string;

  @ApiProperty({ example: 5.5 })
  @IsString()
  totalQuantity: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 2 })
  @Transform(({ value }) => Number(value))
  @IsString()
  storageId: number;

  @ApiProperty({ isArray: true, type: Number, required: false })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.map((v: string | number) => Number(v)))
  @IsNumber({}, { each: true })
  usedReagentSample?: number[];
}

export class CreateSampleSuccessDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  casNumber?: null;

  @ApiProperty({ required: false })
  producer?: null;

  @ApiProperty({ required: false })
  catalogId?: null;

  @ApiProperty({ required: false })
  catalogLink?: null;

  @ApiProperty({ required: false })
  pricePerUnit?: null;

  @ApiProperty({ required: false })
  @IsString()
  structure?: string | null;

  @ApiProperty({ example: 'A sample reagent', required: false })
  @IsString()
  description?: string | null;

  @ApiProperty({ example: 'ml' })
  @IsString()
  quantityUnit: string;

  @ApiProperty({ example: 5.5 })
  @IsString()
  totalQuantity: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 2 })
  @Transform(({ value }) => Number(value))
  @IsString()
  storageId: number;

  @ApiProperty({ enum: Category, description: 'Category is either Reagent or Sample' })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ enum: Package, description: 'Package (enum) is either Bottle or SolventsBox or PackageBox', required: false })
  @IsEnum(Package)
  package: Package | null;

  @ApiProperty({ isArray: true, type: Number, required: false })
  usedReagentSample?: number[] | null;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  updatedAt: Date;
}
