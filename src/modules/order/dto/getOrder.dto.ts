import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Order } from '../types/orderOptions.type';

class GetOrdersQueryDto {
  @ApiProperty({ required: false, type: String, description: 'title of the order' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, type: String, description: 'Name of the seller' })
  @IsOptional()
  @IsString()
  seller?: string;

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
}

export { GetOrdersQueryDto };
