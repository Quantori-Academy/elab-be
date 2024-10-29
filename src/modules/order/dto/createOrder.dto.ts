import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { IsArray, IsInt, MaxLength, ValidateNested } from 'class-validator';

class ReagentIdsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;
}

class CreateOrderDto {
  @ApiProperty({ example: 'title' })
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'oriflame' })
  @MaxLength(200)
  seller: string;

  @ApiProperty({ example: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReagentIdsDto)
  reagents: ReagentIdsDto[];

  @ApiHideProperty()
  @Exclude()
  status: Status = Status.Pending;
}

export { CreateOrderDto };
