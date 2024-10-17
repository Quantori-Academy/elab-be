import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

class DeleteStorageSuccessDto {
  @ApiProperty({ example: 'Storage Successfully deleted' })
  message: number;
  @ApiProperty({ example: 200 })
  code: number;
}

class DeleteStorageNotFoundErrorDto {
  @ApiProperty({
    example: 'Storage Not Found',
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;
}

class DeleteStorageBadRequestErrorDto {
  @ApiProperty({
    example: 'Cannot delete storage because it has associated reagents.',
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}

export { DeleteStorageSuccessDto, DeleteStorageNotFoundErrorDto, DeleteStorageBadRequestErrorDto };
