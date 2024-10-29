import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentService } from './interfaces/reagentService.interface';
import { ReagentOptions, ReagentSearchOptions } from './interfaces/reagentOptions.interface';
import { IReagentRepository } from './interfaces/reagentRepository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';
import { UpdateReagentDto } from './dto/updateReagent.dto';

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
        return await this.reagentRepository.getAllByNameAndCategory(filter.name, filter.category, pagination, sort);
      } else if (filter.category) {
        this.logger.log('Fetching reagents by category');
        return await this.reagentRepository.getAllByCategory(filter.category, pagination, sort);
      } else if (filter.name) {
        this.logger.log('Fetching reagents by name');
        return await this.reagentRepository.getAllByName(filter.name, pagination, sort);
      } else {
        this.logger.log('Fetching all Reagents');
        return await this.reagentRepository.findAll(pagination, sort);
      }
    } catch (error) {
      this.logger.error('Failed to fetch a reagents: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagents!');
    }
  }

  async searchByStructure(options: ReagentSearchOptions): Promise<IReagent | IReagent[]> {
    try {
      this.logger.log('searchByStructure method start');
      const { pagination, sort, structure, flag } = options || {};
      return await this.reagentRepository.getAllByStructure(structure, pagination, sort, flag);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents in a search by Structure: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagents in a search by Structure!');
    }
  }

  async getReagentById(id: number): Promise<IReagent | null> {
    try {
      this.logger.log('searchByStructure method start');
      const reagent = await this.reagentRepository.findById(id);
      return reagent;
    } catch (error) {
      this.logger.error('Failed to fetch a reagent by ID: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagent by ID!');
    }
  }

  async editReagent(data: UpdateReagentDto, id: number): Promise<IReagent> {
    try {
      this.logger.log('editReagent method start');
      const quantityLeft = data.quantityLeft;
      const isDeleted = quantityLeft === 0;
      const newReagent = await this.reagentRepository.updateById(data, id, isDeleted);
      return newReagent;
    } catch (error) {
      this.logger.error('Failed to edit a reagent: ', error);
      throw new InternalServerErrorException('Failed to edit a reagent!');
    }
  }
}

const REAGENT_SERVICE_TOKEN = Symbol('REAGENT_SERVICE_TOKEN');
const ReagentServiceProvider = {
  provide: REAGENT_SERVICE_TOKEN,
  useClass: ReagentService,
};

export { REAGENT_SERVICE_TOKEN, ReagentServiceProvider };
