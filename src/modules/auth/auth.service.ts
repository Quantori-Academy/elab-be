import { Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private userService: UserService) {}
  async login() {
    return this.userService.getUser(1);
    // auth logic comes here
  }
}
