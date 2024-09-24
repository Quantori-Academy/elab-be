import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/userEntity.interface';
import { IUserService } from './interfaces/userService.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  getUser(id: number): Promise<IUser | undefined> {
    return this.userRepository.get(id);
  }

  createUser(user: IUser): Promise<void> {
    return this.userRepository.save(user);
  }
}
