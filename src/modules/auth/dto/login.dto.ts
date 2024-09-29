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
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(located inside cookie not body)',
  })
  refresh_token: string;
}

export class LoginErrorResponseDto {
  @ApiProperty({
    example: 'Invalid credentials/Email and password are required',
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
