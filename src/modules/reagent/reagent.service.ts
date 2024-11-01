import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentService } from './interfaces/reagentService.interface';
import { ReagentOptions, ReagentSearchOptions } from './interfaces/reagentOptions.interface';
import { IReagentRepository } from './interfaces/reagentRepository.interface';
import { UpdateReagentDto } from './dto/updateReagent.dto';
import { Reagent } from '@prisma/client';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IReagentRepository) {}

  async create(data: Omit<Reagent, 'category'>): Promise<Reagent> {
    try {
      this.logger.log('Create reagent method start');
      const reagent: Reagent = await this.reagentRepository.create({ ...data, category: 'Reagent' });
      this.logger.log('Created a reagent');
      return reagent;
    } catch (error) {
      this.logger.error('Failed to create a reagent: ', error);
      throw new InternalServerErrorException('Failed to create a reagent!');
    }
  }

  async getReagents(options: ReagentOptions): Promise<Reagent[]> {
    try {
      this.logger.log('getReagents method start');
      const { filter, pagination, sort } = options || {};
      return await this.reagentRepository.findAll(filter, pagination, sort);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagents!');
    }
  }

  async searchByStructure(options: ReagentSearchOptions): Promise<Reagent | Reagent[]> {
    try {
      this.logger.log('searchByStructure method start');
      const { pagination, sort, structure, flag } = options || {};
      return await this.reagentRepository.getAllByStructure(structure, pagination, sort, flag);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents in a search by Structure: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagents in a search by Structure!');
    }
  }

  async getReagentById(id: number): Promise<Reagent | null> {
    try {
      this.logger.log('searchByStructure method start');
      const reagent: Reagent | null = await this.reagentRepository.findById(id);
      return reagent;
    } catch (error) {
      this.logger.error('Failed to fetch a reagent by ID: ', error);
      throw new InternalServerErrorException('Failed to fetch a reagent by ID!');
    }
  }

  async editReagent(data: UpdateReagentDto, id: number): Promise<Reagent> {
    try {
      this.logger.log('editReagent method start');
      const quantityLeft = data.quantityLeft;
      const isDeleted = quantityLeft === 0;
      const newReagent: Reagent = await this.reagentRepository.updateById(data, id, isDeleted);
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
