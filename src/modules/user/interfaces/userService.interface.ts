import { Role } from '@prisma/client';
import { IUser, UserPayload } from './userEntity.interface';

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserById(id: number): Promise<IUser | null>;
  validateUser(email: string, password: string): Promise<IUser | null>;
  editUserRole(userId: number, role: Role): Promise<UserPayload>;
}
