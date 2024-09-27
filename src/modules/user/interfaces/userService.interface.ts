import { IUser } from './userEntity.interface';

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserById(id: number): Promise<IUser | null>;
  validateUser(email: string, password: string): Promise<IUser | null>;
}
