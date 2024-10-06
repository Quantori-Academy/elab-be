import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ISession } from './interfaces/session.interface';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';

@Injectable()
export class AuthRepository implements Partial<IRepository<ISession>> {
  constructor(private readonly prisma: PrismaService) {}

  @LoggingForAsync()
  async findSessionByUserId(userId: number): Promise<ISession | null> {
    return await this.prisma.session.findFirst({
      where: {
        userId,
      },
    });
  }

  @LoggingForAsync()
  async update(session: ISession): Promise<ISession> {
    return await this.prisma.session.update({
      where: { userId: session.userId },
      data: session,
    });
  }

  @LoggingForAsync()
  async create(session: ISession): Promise<ISession> {
    return await this.prisma.session.create({
      data: session,
    });
  }

  @LoggingForAsync()
  async upsert(session: ISession): Promise<void> {
    await this.prisma.session.upsert({
      where: { userId: session.userId },
      update: {
        ...session,
      },
      create: {
        ...session,
      },
    });
  }
}
