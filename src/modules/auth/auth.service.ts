import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { AccessToken, Tokens } from '../security/interfaces/token.interface';
import { SecurityService } from '../security/security.service';
import { AuthRepository } from './auth.repository';
import { ISession } from './interfaces/session.interface';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private securityService: SecurityService,
    private authRepository: AuthRepository,
  ) {}

  @LoggingForAsync()
  async login(payload: UserPayload): Promise<Tokens> {
    const tokens: Tokens = {
      access_token: await this.securityService.generateAccessToken(payload),
      refresh_token: await this.securityService.generateRefreshToken(payload),
    };
    const session: ISession = {
      refreshToken: tokens.refresh_token,
      isLoggedIn: true,
      createdAt: new Date(),
      userId: payload.id!,
    };
    await this.authRepository.upsert(session);
    return tokens;
  }

  @LoggingForAsync()
  async logout(user: UserPayload): Promise<void> {
    const session: ISession | false = await this.isLoggedIn(user.id as number);
    if (!session) throw new NotFoundException('Session not found');
    session.isLoggedIn = false;
    await this.authRepository.update(session);
  }

  @LoggingForAsync()
  async isLoggedIn(userId: number): Promise<ISession | false> {
    const session: ISession | null = await this.authRepository.findSessionByUserId(userId);
    if (!session || !session.isLoggedIn) return false;
    return session;
  }

  @LoggingForAsync()
  async refreshAccessToken(user: UserPayload): Promise<AccessToken> {
    return await this.securityService.generateAccessToken(user);
  }
}
