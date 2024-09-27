import { AccessToken, RefreshToken } from './token.interface';

export interface ISecurityService {
  generateAccessToken(payload: any): Promise<AccessToken>;
  generateRefreshToken(payload: any): Promise<RefreshToken>;
  hash(entity: any, salt: number): Promise<string>;
  compare(raw: any, hashed: any): Promise<boolean>;
}
