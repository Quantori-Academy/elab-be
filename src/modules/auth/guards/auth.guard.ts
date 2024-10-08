import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ISecurityService } from 'src/modules/security/interfaces/securityService.interface';
import { SECURITY_SERVICE_TOKEN } from 'src/modules/security/security.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';
import { SecurityService } from 'src/modules/security/security.service';
import { UserPayload } from 'src/modules/user/interfaces/userEntity.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(SECURITY_SERVICE_TOKEN) private securityService: ISecurityService) {}

  @LoggingForAsync()
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      return false;
    }
    try {
      const payload: UserPayload = await this.securityService.verifyAccessToken(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
