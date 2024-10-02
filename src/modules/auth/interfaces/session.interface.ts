export interface ISession {
  id?: number;
  refreshToken: string;
  createdAt: Date;
  userId: number;
}
