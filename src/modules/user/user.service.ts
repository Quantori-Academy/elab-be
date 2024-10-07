import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IUser, UserPayload } from './interfaces/userEntity.interface';
import { IUserService } from './interfaces/userService.interface';
import { Role } from '@prisma/client';
import { UserRepository } from './user.repository';
import { SecurityService } from '../security/security.service';
import { EmailService } from '../email/email.service';
import { ResetToken } from '../security/interfaces/token.interface';
import generator from 'generate-password-ts';

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

  omitPassword(user: IUser): UserPayload {
    const { password, ...userPayload } = user;
    void password; // for lint (intentionally not using this variable)
    return userPayload;
  }

  async editUserRole(userId: number, role: Role): Promise<UserPayload> {
    let user: IUser | null = await this.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    user = await this.userRepository.update(user);
    const userPayload: UserPayload = this.omitPassword(user);
    return userPayload;
  }

  async createUser(user: IUser): Promise<UserPayload> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) throw new ConflictException('User with this email already exists');
    user.password = await this.securityService.hash(user.password);
    user = await this.userRepository.create(user);
    const userPayload: UserPayload = this.omitPassword(user);
    return userPayload;
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
    await this.userRepository.update(user);
    await this.userRepository.setPasswordResetFlag(user, false);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    const payload = { id: user.id as number, email };
    const token = await this.securityService.generateResetToken(payload);
    await this.emailService.sendPasswordResetEmail(email, token);
  }

  async resetPassword(reset_token: ResetToken, newPassword: string, confirmPassword: string) {
    const token = await this.securityService.verifyResetToken(reset_token);

    if (!token) {
      throw new NotFoundException('Token is invalid');
    }

    const user = await this.getUserById(token.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    user.password = await this.securityService.hash(newPassword, 10);
    await this.userRepository.update(user);
    await this.userRepository.setPasswordResetFlag(user, false);
  }

  async adminResetPassword(userId: number) {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    user.password = await this.securityService.hash(tempPassword, 10);
    await this.userRepository.update(user);
    await this.emailService.sendTempPasswordEmail(user.email, tempPassword);
    await this.userRepository.setPasswordResetFlag(user, true);
  }

  async deleteUser(userId: number) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(user);
  }
}
