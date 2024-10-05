import { Role } from '@prisma/client';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: Role;
  isPasswordResetRequired?: boolean;
}

export type UserPayload = Omit<IUser, 'password' | 'isPasswordResetRequired'> & {
  iat?: number;
  exp?: number;
};
