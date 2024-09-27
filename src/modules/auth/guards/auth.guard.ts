import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from 'src/modules/security/security.service';
import { UserPayload } from 'src/modules/user/interfaces/userEntity.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token not provided or invalid format!');
    }
    try {
      const payload: UserPayload =
        await this.securityService.verifyToken(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Token verification failed!');
    }
    return true;
  }
}
