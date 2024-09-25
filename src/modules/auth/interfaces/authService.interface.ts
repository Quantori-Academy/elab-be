import { IUser } from 'src/modules/user/interfaces/userEntity.interface';

export interface IAuthService {
  login(user: IUser): Promise<any>;
}
