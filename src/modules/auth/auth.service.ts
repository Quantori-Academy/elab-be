import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { AccessToken, RefreshToken, Tokens } from '../security/interfaces/token.interface';
import { SECURITY_SERVICE_TOKEN } from '../security/security.service';
import { ISession } from './interfaces/session.interface';
import { ISecurityService } from '../security/interfaces/securityService.interface';
import { IAuthRepository } from './interfaces/authRepository.interface';
import { AUTH_REPOSITORY_TOKEN } from './auth.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SECURITY_SERVICE_TOKEN) private securityService: ISecurityService,
    @Inject(AUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository,
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

  async logout(user: UserPayload | null, token: RefreshToken | null = null): Promise<void> {
    let session: ISession | false;
    if (user) {
      session = await this.isLoggedIn(user.id as number, null);
    } else {
      session = await this.isLoggedIn(null, token);
    }
    if (!session) throw new NotFoundException('Session not found');
    session.isLoggedIn = false;
    await this.authRepository.update(session);
  }

  async isLoggedIn(userId: number | null, token: RefreshToken | null = null): Promise<ISession | false> {
    let session: ISession | null;
    if (userId) {
      session = await this.authRepository.findSessionByUserId(userId);
    } else {
      session = await this.authRepository.findSessionByRefreshToken(token!);
    }
    if (!session || !session.isLoggedIn) return false;
    return session;
  }

  async refreshAccessToken(user: UserPayload): Promise<AccessToken> {
    return await this.securityService.generateAccessToken(user);
  }
}

const AUTH_SERVICE_TOKEN = Symbol('AUTH_SERVICE_TOKEN');
const AuthServiceProvider = {
  provide: AUTH_SERVICE_TOKEN,
  useClass: AuthService,
};

export { AUTH_SERVICE_TOKEN, AuthServiceProvider };
