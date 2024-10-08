import { Role } from '@prisma/client';
import { IUser, UserPayload } from './userEntity.interface';
import { ResetToken } from 'src/modules/security/interfaces/token.interface';

export interface IUserService {
  getUser(userId: number): Promise<UserPayload>;
  validateUser(email: string, password: string): Promise<IUser | null>;
  editUserRole(userId: number, role: Role): Promise<UserPayload>;
  createUser(user: IUser): Promise<UserPayload>;
  omitPassword(user: IUser): UserPayload;
  deleteUser(userId: number): any;
  adminResetPassword(userId: number): any;
  resetPassword(reset_token: ResetToken, newPassword: string, confirmPassword: string): any;
  forgotPassword(email: string): Promise<void>;
  changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void>;
}
