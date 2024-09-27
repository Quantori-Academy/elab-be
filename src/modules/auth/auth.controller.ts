import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGuard } from 'src/common/guards/login.guard';
import { Request, Response } from 'express';
import { Tokens } from '../security/interfaces/token.interface';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginErrorResponseDto, LoginSuccessResponseDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { UserPayload } from '../user/interfaces/userEntity.interface';

const ROUTE = 'auth';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Created',
    type: LoginSuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: LoginErrorResponseDto,
  })
  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const tokens: Tokens = await this.authService.login(req.body.user);
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return res.json({ access_token: tokens.access_token });
  }

  @Get('refreshAccessToken')
  async refreshAccessToken(@Req() req: Request) {
    console.log(req);
    const mockUser: UserPayload = {
      id: 1,
      email: 'email',
      role: Role.Admin,
    };
    return {
      access_token: await this.authService.refreshAccessToken(mockUser),
    };
  }
}
