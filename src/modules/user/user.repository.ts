import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IUser } from './interfaces/userEntity.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository implements IRepository<IUser> {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async save(user: IUser): Promise<void> {
    console.log(user);
    // save logic
  }
}