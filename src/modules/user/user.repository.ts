import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IUser } from './interfaces/userEntity.interface';
import { UserRoles } from './enums/roles';

@Injectable()
export class UserRepository implements IRepository<IUser> {
  async get(id: number): Promise<IUser | undefined> {
    const user: IUser = {
      id: 123,
      email: 'mockemail',
      password: 'password',
      role: UserRoles.admin,
    };
    console.log(id);
    return user;
  }

  async save(user: IUser): Promise<void> {
    console.log(user);
  }
}
