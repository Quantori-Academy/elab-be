import { ApiProperty } from '@nestjs/swagger';

class GetStorageSuccessDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 3 })
  roomId: number;

  @ApiProperty({ example: 'Room2-Cabinet1-Shelf4' })
  location: string;

  @ApiProperty({ example: 'some name' })
  name: string;

  @ApiProperty({ example: 'Description for storage' })
  description: string;

  @ApiProperty({ example: '2024-10-11T09:04:23.426Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-10-11T09:04:23.426Z' })
  updatedAt: Date;
}

class GetStorageErrorDto {
  @ApiProperty({ example: 'Storage not found' })
  message: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export { GetStorageSuccessDto, GetStorageErrorDto };
