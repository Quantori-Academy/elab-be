import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ISession } from './interfaces/session.interface';

@Injectable()
export class AuthRepository implements Partial<IRepository<ISession>> {
  constructor(private readonly prisma: PrismaService) {}

  async findSessionByUserId(userId: number): Promise<ISession | null> {
    return await this.prisma.session.findFirst({
      where: {
        userId,
      },
    });
  }

  async update(session: ISession): Promise<ISession> {
    return await this.prisma.session.update({
      where: { userId: session.userId },
      data: session,
    });
  }
  async create(session: ISession): Promise<ISession> {
    {
      return await this.prisma.session.create({
        data: session,
      });
    }
  }
  async save(session: ISession): Promise<void> {
    const existingSession = await this.findSessionByUserId(session.userId);
    if (existingSession) {
      await this.update(session);
    } else {
      await this.create(session);
    }
  }
}
