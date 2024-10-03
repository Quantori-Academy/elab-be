import { Role } from '@prisma/client';
import { IUser, UserPayload } from './userEntity.interface';

export interface IUserService {
  getUser(userId: number): Promise<UserPayload>;
  validateUser(email: string, password: string): Promise<IUser | null>;
  editUserRole(userId: number, role: Role): Promise<UserPayload>;
  createUser(user: IUser): Promise<UserPayload>;
  omitPassword(user: IUser): UserPayload;
}
