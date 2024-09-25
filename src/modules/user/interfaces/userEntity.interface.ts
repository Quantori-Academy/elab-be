import { Role } from '@prisma/client';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: Role;
}

export type UserPayload = Omit<IUser, 'password'>;
