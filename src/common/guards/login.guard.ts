import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      body: { email },
    } = context.switchToHttp().getRequest();
    const user = await this.userService.getUser(email);
    if (!user) throw new NotFoundException();
    return true;
  }
}
