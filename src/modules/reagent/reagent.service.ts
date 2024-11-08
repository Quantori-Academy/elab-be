import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentService } from './interfaces/reagentService.interface';
import { ReagentOptions, ReagentSearchOptions } from './interfaces/reagentOptions.interface';
import { IReagentRepository, ReagentList } from './interfaces/reagentRepository.interface';
import { UpdateReagentDto } from './dto/updateReagent.dto';
import { Category, Status } from '@prisma/client';
import { IReagent } from './interfaces/reagentEntity.interface';
import { REQUEST_REPOSITORY_TOKEN } from '../reagentRequest/reagentRequest.repository';
import { IReagentRequestRepository } from '../reagentRequest/interfaces/reagentRequestRepository.interface';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(
    @Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IReagentRepository,
    @Inject(REQUEST_REPOSITORY_TOKEN) private requestRepository: IReagentRequestRepository,
  ) {}

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
      const { filter, pagination, sort } = options || {};
      return await this.reagentRepository.findAll(filter, pagination, sort);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents: ', error);
      throw error;
    }
  }

  async searchByStructure(options: ReagentSearchOptions): Promise<IReagent | IReagent[]> {
    try {
      this.logger.log('searchByStructure method start');
      const { pagination, sort, structure, flag } = options || {};
      return await this.reagentRepository.getAllByStructure(structure, pagination, sort, flag);
    } catch (error) {
      this.logger.error('Failed to fetch a reagents in a search by Structure: ', error);
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

  async createReagentFromReagentRequest(reagentRequestId: number, storageId: number): Promise<IReagent | null> {
    this.logger.log(`[${this.createReagentFromReagentRequest.name}] - Method start`);
    try {
      const reagentRequest = await this.requestRepository.findById(reagentRequestId);
      if (!reagentRequest) return null;

      if (reagentRequest.status !== Status.Fulfilled) {
        throw new BadRequestException('Only from Fulfilled requests can be created reagents');
      }

      const reagentData: IReagent = {
        storageId,
        name: reagentRequest.name,
        casNumber: reagentRequest.casNumber ?? '',
        quantityUnit: reagentRequest.quantityUnit,
        totalQuantity: reagentRequest.desiredQuantity,
        description: 'created from reagent request',
        quantityLeft: reagentRequest.desiredQuantity,
        structure: reagentRequest.structureSmiles ?? undefined,
        package: reagentRequest.package,
        isDeleted: false,
        category: Category.Reagent,
        expirationDate: reagentRequest.expirationDate,
        producer: reagentRequest.producer,
        catalogId: reagentRequest.catalogId,
        catalogLink: reagentRequest.catalogLink,
        pricePerUnit: reagentRequest.pricePerUnit,
      };

      const [reagent] = await Promise.all([
        this.create(reagentData),
        this.requestRepository.updateById({ status: Status.Completed }, reagentRequestId),
      ]);

      this.logger.log(`[${this.createReagentFromReagentRequest.name}] - Method finished`);
      return reagent;
    } catch (error) {
      this.logger.error(`[${this.createReagentFromReagentRequest.name}] - Exception thrown` + error);
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
