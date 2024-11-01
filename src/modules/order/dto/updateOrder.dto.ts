import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

class UpdateOrderDto {
  @ApiProperty({ example: 'title' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  title?: string | undefined;

  @ApiProperty({ example: 'Seler name' })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  seller?: string | undefined;

  @ApiProperty({ required: false, example: 'Fulfilled' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsEnum(Status)
  status?: Status;
}

export { UpdateOrderDto };
