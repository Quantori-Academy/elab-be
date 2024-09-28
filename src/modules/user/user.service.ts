import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, UserPayload } from './interfaces/userEntity.interface';
import { IUserService } from './interfaces/userService.interface';
import { UserRepository } from './user.repository';
import { SecurityService } from '../security/security.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private securityService: SecurityService,
  ) {}

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getUserById(id: number): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.getUserByEmail(email);
    if (user && (await this.securityService.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async editRole(userId: number, role: Role): Promise<UserPayload> {
    const user: IUser | null = await this.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    const { password, ...modifiedUser } = await this.userRepository.update(userId, user);
    void password; // for lint (intentionally not using this variable)
    return modifiedUser as UserPayload;
  }
}
