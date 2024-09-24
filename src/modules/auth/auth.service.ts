import { Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/authService.interface';

@Injectable()
export class AuthService implements IAuthService {
  async login() {
    // auth logic comes here
  }
}
