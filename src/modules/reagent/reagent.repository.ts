import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingForAsync } from 'src/common/decorators/logger.decorator';

class ReagentRepository implements IRepository<IReagent> {
  constructor(private readonly prisma: PrismaService) {}

  @LoggingForAsync()
  async create(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.create({
      data: reagent,
    });
  }

  @LoggingForAsync()
  async update(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.update({
      where: { id: reagent.id },
      data: reagent,
    });
  }

  @LoggingForAsync()
  async upsert(reagent: IReagent): Promise<void> {
    await this.prisma.reagent.upsert({
      where: { id: reagent.id },
      update: { ...reagent },
      create: { ...reagent },
    });
  }

  @LoggingForAsync()
  async findById(id: number): Promise<IReagent | null> {
    return await this.prisma.reagent.findUnique({
      where: { id },
    });
  }

  @LoggingForAsync()
  async delete(reagent: IReagent): Promise<IReagent> {
    return await this.prisma.reagent.delete({
      where: { id: reagent.id },
    });
  }
}

const REAGENT_REPOSITORY_TOKEN = Symbol('REAGENT_REPOSITORY_TOKEN');
const ReagentRepositoryProvider = {
  provide: REAGENT_REPOSITORY_TOKEN,
  useClass: ReagentRepository,
};

export { REAGENT_REPOSITORY_TOKEN, ReagentRepositoryProvider };
