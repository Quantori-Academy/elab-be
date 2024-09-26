import { Tokens } from 'src/modules/security/interfaces/token.interface';
import { IUser } from 'src/modules/user/interfaces/userEntity.interface';

export interface IAuthService {
  login(user: IUser): Promise<Tokens>;
}
