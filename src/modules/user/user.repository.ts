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

  async update(user: IUser): Promise<IUser> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async create(user: IUser): Promise<IUser> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async save(user: IUser): Promise<void> {
    const existingUser = await this.findById(user.id as number);
    if (existingUser) {
      await this.update(user);
    } else {
      await this.create(user);
    }
  }

  async delete(user: IUser): Promise<IUser> {
    return await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
