import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { IUser } from 'src/modules/user/interfaces/userEntity.interface';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required.');
    }
    const validUser: IUser | null = await this.userService.validateUser(
      email,
      password,
    );
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    request.body.user = validUser;
    return true;
  }
}
