import { Role } from '@prisma/client';

export interface Users {
  email: string;
  password: string;
  role: Role;
}
