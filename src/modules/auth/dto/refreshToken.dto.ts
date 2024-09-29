import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenSuccessResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
}

export class RefreshTokenErrorResponseDto {
  @ApiProperty({
    example: 'Refresh token not found, Invalid token , Expired Token',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    example: 401,
  })
  statusCode: number;
}