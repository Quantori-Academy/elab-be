import { Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { AccessToken, Tokens } from '../security/interfaces/token.interface';
import { SecurityService } from '../security/security.service';
import { AuthRepository } from './auth.repository';
import { ISession } from './interfaces/session.interface';

@Injectable()
export class AuthService implements IAuthService {
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
      createdAt: new Date(),
      userId: payload.id!,
    };
    await this.authRepository.save(session);
    return tokens;
  }

  async refreshAccessToken(user: UserPayload): Promise<AccessToken> {
    return await this.securityService.generateAccessToken(user);
  }
}
