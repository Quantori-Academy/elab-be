import { AccessToken, Tokens } from 'src/modules/security/interfaces/token.interface';
import { IUser, UserPayload } from 'src/modules/user/interfaces/userEntity.interface';
import { ISession } from './session.interface';

export interface IAuthService {
  login(user: IUser): Promise<Tokens>;
  refreshAccessToken(user: UserPayload): Promise<AccessToken>;
  isLoggedIn(userId: number): Promise<ISession | false>;
  logout(user: UserPayload): Promise<void>;
}
