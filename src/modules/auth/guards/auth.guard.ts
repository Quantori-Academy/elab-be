import { ISecurityService } from 'src/modules/security/interfaces/securityService.interface';
import { SECURITY_SERVICE_TOKEN } from 'src/modules/security/security.service';
import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { UserPayload } from 'src/modules/user/interfaces/userEntity.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthGuard.name);

  constructor(@Inject(SECURITY_SERVICE_TOKEN) private securityService: ISecurityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(`[${this.canActivate.name}] - Method start`);
    try {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      if (type !== 'Bearer' || !token) {
        this.logger.log(`[${this.canActivate.name}] - Forbidden`);
        return false;
      }
      const payload: UserPayload = await this.securityService.verifyAccessToken(token);
      request.user = payload;

      this.logger.log(`[${this.canActivate.name}] - Method finished`);
      return true;
    } catch (error) {
      this.logger.error(`[${this.canActivate.name}] Exception thrown ` + error);
      throw error;
    }
  }
}
