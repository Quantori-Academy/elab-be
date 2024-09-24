import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository/repository.interface';
import { IUser } from './interfaces/userEntity.interface';

@Injectable()
export class UserRepository implements IRepository<IUser> {
  async get(id: string): Promise<IUser | undefined> {
    const user: IUser = {
      id: 'asd',
      email: 'mockemail',
      password: 'password',
    };
    const a = id;
    console.log(a);
    return user;
  }

  async save(user: IUser): Promise<void> {
    console.log(user);
  }
}
