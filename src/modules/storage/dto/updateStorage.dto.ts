import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class UpdateStroageDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'new unique name' })
  name?: string | undefined;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Description for storage' })
  description?: string | undefined;
}

export { UpdateStroageDto };
