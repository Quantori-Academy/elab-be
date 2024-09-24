import { IUser } from './userEntity.interface';

export interface IUserService {
  getUser(id: string): Promise<IUser | undefined>;
  createUser(user: IUser): Promise<void>;
}
