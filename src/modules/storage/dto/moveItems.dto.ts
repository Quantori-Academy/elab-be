import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsPositive, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ReagentIdsDto } from 'src/modules/order/dto/createOrder.dto';

class MoveItemsDto {
  @IsNotEmpty()
  @IsPositive()
  sourceStorageId: number;

  @IsNotEmpty()
  @IsPositive()
  destinationStorageId: number;

  @ApiProperty({ example: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReagentIdsDto)
  reagents: ReagentIdsDto[];
}

export { MoveItemsDto };
