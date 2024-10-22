import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ example: 'Reagent A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: '500 ml' })
  @IsString()
  desiredQuantity: string;

  @ApiProperty({ example: 'CO' })
  @IsOptional()
  @IsString()
  structureSmiles?: string;

  @ApiProperty({ example: 'image path/url' })
  @IsOptional()
  @IsString()
  structureImage?: string;

  @ApiProperty({ example: '123-45-67' })
  @IsOptional()
  @IsString()
  casNumber?: string;

  @ApiProperty({ example: 'Commenting here...' })
  @IsOptional()
  @IsString()
  userComments?: string;
}

export class CreateRequestSuccessDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Reagent A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: '500 ml' })
  @IsString()
  desiredQuantity: string;

  @ApiProperty({ examples: ['CO'] })
  @IsString()
  structureSmiles: string | null;

  @ApiProperty({ examples: ['image path/url'] })
  @IsString()
  structureImage: string | null;

  @ApiProperty({ examples: ['123-45-67'] })
  @IsString()
  casNumber: string | null;

  @ApiProperty({ examples: ['Commenting here...'] })
  userComments: string | null;

  @ApiProperty()
  procurementComments: string | null;

  @ApiProperty({ enum: Status, description: 'Returns status: Pending' })
  status: Status;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDate()
  updatedAt: Date;
}
