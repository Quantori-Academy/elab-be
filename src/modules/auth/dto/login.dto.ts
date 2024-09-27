import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'admin@elab.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Admin_123',
  })
  password: string;
}

export class LoginSuccessResponseDto {
  @ApiProperty({
    description: 'The access token returned after successful login',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'The refresh token returned after successful login *(inside cookie)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(located inside cookie not body)',
  })
  refresh_token: string;
}

export class LoginErrorResponseDto {
  @ApiProperty({
    description: 'A descriptive message about the error',
    example: 'Invalid credentials/Email and password are required',
  })
  message: string;

  @ApiProperty({
    description: 'The error type',
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code of the error',
    example: 401,
  })
  statusCode: number;
}
