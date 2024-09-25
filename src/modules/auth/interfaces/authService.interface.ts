export interface IAuthService {
  login(id: number): Promise<any>;
}
