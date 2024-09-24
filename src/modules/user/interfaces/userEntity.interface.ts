import { UserRoles } from '../enums/roles';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRoles;
}
