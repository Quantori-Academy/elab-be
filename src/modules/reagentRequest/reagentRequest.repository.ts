import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagentRequest } from './interfaces/reagentRequestEntity.interface';

@Injectable()
class ReagentRequestRepository implements IRepository<IReagentRequest> {
  private logger = new Logger(ReagentRequestRepository.name);

  constructor(private prisma: PrismaService) {}

  async create(request: IReagentRequest): Promise<IReagentRequest> {
    this.logger.log('Create method start');
    return await this.prisma.reagentRequest.create({
      data: request,
    });
  }

  async update(request: IReagentRequest): Promise<IReagentRequest> {
    this.logger.log('Update method start');
    return await this.prisma.reagentRequest.update({
      where: { id: request.id },
      data: request,
    });
  }

  async upsert(request: IReagentRequest): Promise<void> {
    this.logger.log('Upsert method start');
    await this.prisma.reagentRequest.upsert({
      where: { id: request.id },
      update: { ...request },
      create: { ...request },
    });
  }

  async delete(id: number): Promise<IReagentRequest> {
    this.logger.log('Delete method start');
    return await this.prisma.reagentRequest.delete({
      where: { id },
    });
  }

  async findById(id: number): Promise<IReagentRequest | null> {
    this.logger.log('findById method start');
    return await this.prisma.reagentRequest.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<IReagentRequest[]> {
    this.logger.log('findAll method start');
    return await this.prisma.reagentRequest.findMany();
  }
}

const REQUEST_REPOSITORY_TOKEN = Symbol('REQUEST_REPOSITORY_TOKEN');
const RequestRepositoryProvider = {
  provide: REQUEST_REPOSITORY_TOKEN,
  useClass: ReagentRequestRepository,
};

export { REQUEST_REPOSITORY_TOKEN, RequestRepositoryProvider };
