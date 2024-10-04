import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { AccessToken, Tokens } from '../security/interfaces/token.interface';
import { SecurityService } from '../security/security.service';
import { AuthRepository } from './auth.repository';
import { ISession } from './interfaces/session.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly _logger: Logger = new Logger(AuthService.name);
  constructor(
    private securityService: SecurityService,
    private authRepository: AuthRepository,
  ) {}

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

  async logout(user: UserPayload): Promise<void> {
    try {
      this._logger.log(this.logout.name);
      const session: ISession | false = await this.isLoggedIn(user.id as number);
      if (!session) throw new NotFoundException('Session not found');
      session.isLoggedIn = false;
      await this.authRepository.update(session);
    } catch (error: any) {
      this._logger.error(this.logout.name + ' ' + error);
      throw error;
    }
  }

  async isLoggedIn(userId: number): Promise<ISession | false> {
    try {
      this._logger.log(this.isLoggedIn.name);
      const session: ISession | null = await this.authRepository.findSessionByUserId(userId);
      if (!session || !session.isLoggedIn) return false;
      return session;
    } catch (error: any) {
      this._logger.error(this.isLoggedIn.name + ' ' + error);
      throw error;
    }
  }

  async refreshAccessToken(user: UserPayload): Promise<AccessToken> {
    return await this.securityService.generateAccessToken(user);
  }
}
