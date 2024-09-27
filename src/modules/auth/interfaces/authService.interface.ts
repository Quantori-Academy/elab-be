import { AccessToken, Tokens } from 'src/modules/security/interfaces/token.interface';
import { IUser, UserPayload } from 'src/modules/user/interfaces/userEntity.interface';

export interface IAuthService {
  login(user: IUser): Promise<Tokens>;
  refreshAccessToken(user: UserPayload): Promise<AccessToken>;
}
