export interface IAuthService {
  login(id: string): Promise<void>;
}
