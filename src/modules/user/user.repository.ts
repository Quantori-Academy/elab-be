import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IUser } from './interfaces/userEntity.interface';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';

@Injectable()
class UserRepository implements IRepository<IUser> {
  constructor(private readonly prisma: PrismaService) {}

  @LoggingForAsync()
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  @LoggingForAsync()
  async findById(id: number): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  @LoggingForAsync()
  async update(user: IUser): Promise<IUser> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  @LoggingForAsync()
  async create(user: IUser): Promise<IUser> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  @LoggingForAsync()
  async setPasswordResetFlag(user: IUser, bool: boolean) {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isPasswordResetRequired: bool,
      },
    });
  }

  @LoggingForAsync()
  async upsert(user: IUser): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...user,
      },
      create: {
        ...user,
      },
    });
  }

  @LoggingForAsync()
  async delete(user: IUser): Promise<IUser> {
    return await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}

const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
const UserRepositoryProvider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: UserRepository,
};

export { USER_REPOSITORY_TOKEN, UserRepositoryProvider };
