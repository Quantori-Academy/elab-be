import { UserPayload } from 'src/modules/user/interfaces/userEntity.interface';
import { AccessToken, RefreshToken } from './token.interface';

export interface ISecurityService {
  generateAccessToken(payload: any): Promise<AccessToken>;
  generateRefreshToken(payload: any): Promise<RefreshToken>;
  verifyRefreshToken(token: RefreshToken): Promise<UserPayload>;
  hash(entity: any, salt: number): Promise<string>;
  compare(raw: any, hashed: any): Promise<boolean>;
}
