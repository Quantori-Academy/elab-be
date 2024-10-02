import { Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGuard } from 'src/modules/auth/guards/login.guard';
import { Request, Response } from 'express';
import { Tokens } from '../security/interfaces/token.interface';
import { ApiBearerAuth, ApiBody, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginErrorResponseDto, LoginSuccessResponseDto } from './dto/login.dto';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { RefreshTokenErrorResponseDto, RefreshTokenSuccessResponseDto } from './dto/refreshToken.dto';
import { AuthGuard } from './guards/auth.guard';
import { LogoutErrorResponseDto, LogoutSuccessResponseDto } from './dto/logout.dto';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';

const ROUTE = 'auth';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginSuccessResponseDto })
  @ApiResponse({ status: 401, type: LoginErrorResponseDto })
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user: UserPayload = (req as any).user as UserPayload;
    const tokens: Tokens = await this.authService.login(user);
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return res.status(200).json({ access_token: tokens.access_token });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: LogoutSuccessResponseDto })
  @ApiResponse({ status: 403, type: ForbiddenErrorDto })
  @ApiResponse({ status: 404, type: LogoutErrorResponseDto })
  @UseGuards(AuthGuard)
  @Delete('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const user: UserPayload = (req as any).user as UserPayload;
    await this.authService.logout(user);
    res.clearCookie('refresh_token', { httpOnly: true });
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: RefreshTokenSuccessResponseDto })
  @ApiResponse({ status: 401, type: RefreshTokenErrorResponseDto })
  @UseGuards(RefreshTokenGuard)
  @Get('refreshAccessToken')
  async refreshAccessToken(@Req() req: Request) {
    const user: UserPayload = (req as any).user as UserPayload;
    return {
      access_token: await this.authService.refreshAccessToken(user),
    };
  }
}
