import { IUser } from './userEntity.interface';

export interface IUserService {
  getUser(id: number): Promise<IUser | undefined>;
  createUser(user: IUser): Promise<void>;
}
