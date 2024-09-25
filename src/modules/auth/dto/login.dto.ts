import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'The access token returned after successful login',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    example: 'Inside cookie ',
  })
  refresh_token: string;
}

export class LoginErrorResponseDto {
  @ApiProperty({
    description: 'A descriptive message about the error',
    example: 'Invalid credentials. or Email and password are required',
  })
  message: string;

  @ApiProperty({ description: 'The error type', example: 'Unauthorized' })
  error: string;

  @ApiProperty({ description: 'HTTP status code of the error', example: 401 })
  statusCode: number;
}
