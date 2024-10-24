import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Order } from 'src/modules/storage/interfaces/storageOptions.interface';

export class GetReagentRequestDto {
  @ApiProperty({ required: false, description: 'Starting index of pagination', minimum: 0 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsInt()
  skip?: number;

  @ApiProperty({ required: false, description: 'returned items', minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @IsInt()
  take?: number;

  @ApiProperty({ required: false, enum: Order, description: 'asc or desc' })
  @IsOptional()
  @IsEnum(Order)
  sortByQuantity?: Order;

  @ApiProperty({ required: false, enum: Order, description: 'asc or desc' })
  @IsOptional()
  @IsEnum(Order)
  sortByCreatedDate?: Order;

  @ApiProperty({ required: false, enum: Order, description: 'asc or desc' })
  @IsOptional()
  @IsEnum(Order)
  sortByUpdatedDate?: Order;

  @ApiProperty({ required: false, enum: Status, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({ required: false, description: 'Filter by name' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class GetReagentRequestSuccessDto {
  @ApiProperty({ description: 'Name of the Reagent Request' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Id of the user who creted the Reagent Request' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: '500 ml', description: 'desired Quantity of the Requested Reagent, e.g. 500 ml' })
  @IsString()
  desiredQuantity: string;

  @ApiProperty({ description: 'Structure of the Requested Reagent' })
  @IsString()
  structureSmiles?: string | null;

  @ApiProperty({ description: 'path/url to Image of the structure of the Requested Reagent' })
  @IsString()
  structureImage?: string | null;

  @ApiProperty({ description: 'CAS Number of the Requested Reagent' })
  @IsString()
  casNumber?: string | null;

  @ApiProperty({ description: 'User comments on the Reagent Request' })
  @IsString()
  userComments?: string | null;

  @ApiProperty({ description: 'Procurement comments on the Reagent Request' })
  @IsString()
  procurementComments?: string | null;

  @ApiProperty({ enum: Status, description: 'Status of the Reagent Request' })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ description: 'Created date of the Reagent Request' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Created date of the Reagent Request' })
  @IsDate()
  updatedAt: Date;
}