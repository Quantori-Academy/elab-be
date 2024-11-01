import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Order } from '../types/orderOptions.type';
import { OrderWithReagentCount } from '../types/order.type';
import { HttpStatus } from '@nestjs/common';
import { Status } from '@prisma/client';

class GetOrdersQueryDto {
  @ApiProperty({ required: false, type: String, description: 'title of the order' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, type: String, description: 'Name of the seller' })
  @IsOptional()
  @IsString()
  seller?: string;

  @ApiProperty({ required: false, description: 'Status of order' })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

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

class GetOrderListResponseDto {
  @ApiProperty({
    example: [
      {
        id: 19,
        userId: 3,
        title: 'title',
        seller: 'Oriflame',
        status: 'Pending',
        createdAt: '2024-10-29T11:39:54.455Z',
        updatedAt: '2024-10-31T13:48:19.996Z',
        reagents: [
          {
            id: 1,
            userId: 1,
            name: 'Reagent A',
            structureSmiles: 'CO',
            casNumber: '123-45-67',
            desiredQuantity: 12.1,
            quantityUnit: '121212',
            userComments: 'Commenting here...',
            procurementComments: null,
            status: 'Pending',
            createdAt: '2024-10-29T10:56:20.529Z',
            updatedAt: '2024-10-29T13:25:13.528Z',
            orderId: 25,
          },
        ],
        reagentCount: 1,
      },
    ],
  })
  orders: OrderWithReagentCount[];

  @ApiProperty({ example: 2 })
  size: number;
}

class GetOrderValidationErrorsDto {
  @ApiProperty({
    example: [
      'skip must not be less than 0',
      'skip must be an integer number',
      'take must not be less than 1',
      'take must be an integer number',
      'chronologicalDate must be one of the following values: asc, desc',
    ],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

export { GetOrdersQueryDto, GetOrderListResponseDto, GetOrderValidationErrorsDto };
