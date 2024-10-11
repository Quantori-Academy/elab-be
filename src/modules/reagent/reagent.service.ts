import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';
import { IReagentService } from './interfaces/reagentService.interface';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IRepository<IReagent>) {}

  async create(data: IReagent): Promise<IReagent> {
    try {
      this.logger.log('Create reagent method start');
      const reagent = await this.reagentRepository.create(data);
      this.logger.log('Created a reagent');
      return reagent;
    } catch (error) {
      this.logger.error('Failed to create a reagent: ', error);
      throw new InternalServerErrorException('Failed to create a reagent!');
    }
  }
}

const REAGENT_SERVICE_TOKEN = Symbol('REAGENT_SERVICE_TOKEN');
const ReagentServiceProvider = {
  provide: REAGENT_SERVICE_TOKEN,
  useClass: ReagentService,
};

export { REAGENT_SERVICE_TOKEN, ReagentServiceProvider };
