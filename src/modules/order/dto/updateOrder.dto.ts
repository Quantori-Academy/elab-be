import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ReagentRequest, Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

class UpdateOrderDto {
  @ApiProperty({ example: 'Title' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  title?: string | undefined;

  @ApiProperty({ example: 'Seller name' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  seller?: string | undefined;

  @ApiProperty({ example: 'Fulfilled' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsEnum(Status)
  status?: Status | undefined;
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

  @ApiProperty({
    example: [
      {
        id: 13,
        userId: 5,
        name: 'Reagent A',
        structureSmiles: 'CO',
        casNumber: '123-45-67',
        desiredQuantity: 500,
        quantityUnit: 'ml',
        userComments: 'Commenting here...',
        procurementComments: null,
        status: 'Fulfilled',
        createdAt: '2024-11-01T13:48:27.215Z',
        updatedAt: '2024-11-04T14:52:31.912Z',
        orderId: 31,
      },
    ],
  })
  reagents: ReagentRequest;
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
      "Fulfilled/Declined orders can't be edited",
      'Pending orders can be changed only to Submitted status',
      'Order with status Submitted cannot be modified. You can only change its status to Fulfilled or Declined.',
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
