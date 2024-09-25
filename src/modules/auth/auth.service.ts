import { Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { IUser, UserPayload } from '../user/interfaces/userEntity.interface';
import { SecurityService } from '../security/security.service';
import { Tokens } from '../security/interfaces/token.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private securityService: SecurityService) {}

  async login(user: IUser): Promise<Tokens> {
    const userPayload: UserPayload = user;
    const tokens: Tokens = {
      access_token: await this.securityService.generateAccessToken(userPayload),
      refresh_token:
        await this.securityService.generateRefreshToken(userPayload),
    };
    return tokens;
  }
}
