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

  async update(userId: number, userData: Partial<IUser>): Promise<IUser> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
