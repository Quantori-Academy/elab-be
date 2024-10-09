import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({ example: 'ml' })
  @IsString()
  quantityUnit: string;

  @ApiProperty({ example: '500 ml' })
  @IsString()
  totalQuantity: string;

  @ApiProperty({ example: 'A sample reagent' })
  @IsString()
  description: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 'Room 1, Cabinet 3, Shelf 5' })
  @IsString()
  storageLocation: string;
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

  @ApiProperty({ example: '500 ml' })
  @IsString()
  totalQuantity: string;

  @ApiProperty({ example: 'A sample reagent' })
  @IsString()
  description: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  quantityLeft: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ example: 'Room 1, Cabinet 3, Shelf 5' })
  @IsString()
  storageLocation: string;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  updatedAt: Date;
}

export class CreateReagentErrorDto {
  @ApiProperty({ example: 'The storage does not exist' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
