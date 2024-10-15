import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentService } from './interfaces/reagentService.interface';
import { ReagentOptions } from './interfaces/reagentOptions.interface';
import { IReagentRepository } from './interfaces/reagentRepository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IReagentRepository) {}

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

  async getReagents(options: ReagentOptions): Promise<IReagent[]> {
    try {
      this.logger.log('getReagents method start');
      const { filter, pagination, sort } = options || {};
      if (filter.category && filter.name) {
        this.logger.log('Fetching reagents by both name and category');
        return await this.reagentRepository.getAllByBoth(filter.name, filter.category, pagination, sort);
      } else if (filter.category) {
        this.logger.log('Fetching reagents by category');
        return await this.reagentRepository.getAllByCategory(filter.category, pagination, sort);
      } else if (filter.name) {
        this.logger.log('Fetching reagents by name');
        return await this.reagentRepository.getAllByName(filter.name, pagination, sort);
      } else {
        this.logger.log('Fetching all Reagents');
        return await this.reagentRepository.findAll();
      }
    } catch (error) {
      this.logger.error('Failed to fetch a reagents: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagents!');
    }
  }
}

const REAGENT_SERVICE_TOKEN = Symbol('REAGENT_SERVICE_TOKEN');
const ReagentServiceProvider = {
  provide: REAGENT_SERVICE_TOKEN,
  useClass: ReagentService,
};

export { REAGENT_SERVICE_TOKEN, ReagentServiceProvider };
