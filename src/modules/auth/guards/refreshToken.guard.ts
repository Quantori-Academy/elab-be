import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPayload } from 'src/modules/user/interfaces/userEntity.interface';
import { SecurityService } from 'src/modules/security/security.service';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private securityService: SecurityService) {}

  @LoggingForAsync()
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const refreshToken = request.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found.');
    }
    try {
      const payload: UserPayload = await this.securityService.verifyRefreshToken(refreshToken);
      // for lint (intentionally not using these variables)
      const { iat, exp, ...userPayload } = payload;
      void iat;
      void exp;

      request.user = userPayload as UserPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
