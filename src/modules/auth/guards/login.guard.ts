import { UserService } from 'src/modules/user/user.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UserPayload } from 'src/modules/user/interfaces/userEntity.interface';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required.');
    }

    const validUser: IUser | null = await this.userService.validateUser(email, password);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { password: omitPass, ...userPayload } = validUser;
    void omitPass; // for lint (intentionally not using this variable)

    request.user = userPayload as UserPayload;
    return true;
  }
}
