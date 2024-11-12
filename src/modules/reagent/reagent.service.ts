import { Inject, Injectable, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentService } from './interfaces/reagentService.interface';
import { ReagentOptions } from './interfaces/reagentOptions.interface';
import { IReagentRepository, ReagentList } from './interfaces/reagentRepository.interface';
import { UpdateReagentDto } from './dto/updateReagent.dto';
import { IReagent } from './interfaces/reagentEntity.interface';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IReagentRepository) {}

  async create(data: IReagent): Promise<IReagent> {
    try {
      this.logger.log('Create reagent method start');
      const reagent: IReagent = await this.reagentRepository.create(data);
      this.logger.log('Created a reagent');
      return reagent;
    } catch (error) {
      this.logger.error('Failed to create a reagent: ', error);
      throw error;
    }
  }

  async getReagents(options: ReagentOptions): Promise<ReagentList> {
    try {
      this.logger.log('getReagents method start');
      const { filter, pagination, sort, flag } = options || {};
      return await this.reagentRepository.findAll(filter, pagination, sort, flag);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents: ', error);
      throw error;
    }
  }

  async getReagentById(id: number): Promise<IReagent | null> {
    try {
      this.logger.log('searchByStructure method start');
      const reagent: IReagent | null = await this.reagentRepository.findById(id);
      return reagent;
    } catch (error) {
      this.logger.error('Failed to fetch a reagent by ID: ', error);
      throw error;
    }
  }

  async editReagent(data: UpdateReagentDto, id: number): Promise<IReagent> {
    try {
      this.logger.log('editReagent method start');
      const quantityLeft = data.quantityLeft;
      const isDeleted = quantityLeft === 0;
      const newReagent: IReagent = await this.reagentRepository.updateById(data, id, isDeleted);
      return newReagent;
    } catch (error) {
      this.logger.error('Failed to edit a reagent: ', error);
      throw error;
    }
  }

  async deleteReagentById(id: number): Promise<IReagent> {
    try {
      this.logger.log('deleteReagentById method start');
      return await this.reagentRepository.delete(id);
    } catch (error) {
      this.logger.error('Failed to delete a reagent: ', error);
      throw error;
    }
  }
}

const REAGENT_SERVICE_TOKEN = Symbol('REAGENT_SERVICE_TOKEN');
const ReagentServiceProvider = {
  provide: REAGENT_SERVICE_TOKEN,
  useClass: ReagentService,
};

export { REAGENT_SERVICE_TOKEN, ReagentServiceProvider };
