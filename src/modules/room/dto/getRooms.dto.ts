import { ApiProperty } from '@nestjs/swagger';

class GetRoomSuccessDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'some name' })
  name: string;

  @ApiProperty({ example: 'Description for storage' })
  description: string;
}

export { GetRoomSuccessDto };