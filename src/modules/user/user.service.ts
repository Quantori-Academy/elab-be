import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interfaces/userEntity.interface';
import { IUserService } from './interfaces/userService.interface';
import { UserRepository } from './user.repository';
import { SecurityService } from '../security/security.service';
import { EmailService } from '../email/email.service';
import { ResetToken } from '../security/interfaces/token.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private securityService: SecurityService,
    private emailService: EmailService,
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

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const passwordCheck = await this.securityService.compare(oldPassword, user.password);
    if (!passwordCheck) {
      throw new BadRequestException('Wrong password');
    }

    const newHashedPassword = await this.securityService.hash(newPassword, 10);
    user.password = newHashedPassword;
    await this.userRepository.save(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      const payload = { id: user.id as number, email };
      const token = await this.securityService.generateResetToken(payload);
      await this.emailService.sendPasswordResetEmail(email, token);
    }
  }

  async resetPassword(reset_token: ResetToken, newPassword: string, confirmPassword: string) {
    const token = await this.securityService.verifyResetToken(reset_token);

    if (!token) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Token is invalid',
      };
    }

    const user = await this.getUserById(token.id);

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Passwords do not match',
      };
    }
    user.password = await this.securityService.hash(newPassword, 10);

    await this.userRepository.save(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password has been successfully changed',
    };
  }
}
