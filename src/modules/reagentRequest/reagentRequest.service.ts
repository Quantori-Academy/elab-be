import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REQUEST_REPOSITORY_TOKEN } from './reagentRequest.repository';
import { IReagentRequest } from './interfaces/reagentRequestEntity.interface';
import { IReagentRequestService } from './interfaces/reagentRequestService.interface';
import { ReagentRequestOptions } from './interfaces/reagentRequestOptions.interface';
import { IReagentRequestRepository } from './interfaces/reagentRequestRepository.interface';
import { UpdateReagentRequestDto } from './dto/updateReagentRequest.dto';

@Injectable()
class ReagentRequestService implements IReagentRequestService {
  private logger = new Logger(ReagentRequestService.name);

  constructor(@Inject(REQUEST_REPOSITORY_TOKEN) private requestRepository: IReagentRequestRepository) {}

  async create(request: IReagentRequest): Promise<IReagentRequest> {
    try {
      this.logger.log('Create method start');
      const reagentRequest = await this.requestRepository.create(request);
      this.logger.log('Create method end');
      return reagentRequest;
    } catch (error) {
      this.logger.error('Failed to create Reagent Request: ', error);
      throw new InternalServerErrorException('Failed to create a Reagent Request!');
    }
  }

  async getReagentRequestsForProcurementOficcer(options: ReagentRequestOptions): Promise<IReagentRequest[]> {
    try {
      this.logger.log(`${this.getReagentRequestsForProcurementOficcer.name} - Start`);
      const { filter, pagination, sort } = options || {};
      if (filter.name && filter.status) {
        this.logger.log(`${this.getReagentRequestsForProcurementOficcer.name} - Filter By Name And Status`);
        return await this.requestRepository.getAllByNameAndStatus(filter.name, filter.status, pagination, sort);
      } else if (filter.name) {
        this.logger.log(`${this.getReagentRequestsForProcurementOficcer.name} - Filter By Name`);
        return await this.requestRepository.getAllByName(filter.name, pagination, sort);
      } else if (filter.status) {
        this.logger.log(`${this.getReagentRequestsForProcurementOficcer.name} - Filter By Status`);
        return await this.requestRepository.getAllByStatus(filter.status, pagination, sort);
      } else {
        this.logger.log(`${this.getReagentRequestsForProcurementOficcer.name} - Fetch All Reagent Requests`);
        return await this.requestRepository.findAll(pagination, sort);
      }
    } catch (error) {
      this.logger.error('Failed to fetch Reagent Requests: ', error);
      throw new InternalServerErrorException('Failed to fetch a Reagent Requests!');
    }
  }

  async getReagentRequestsForResearchers(options: ReagentRequestOptions, id: number): Promise<IReagentRequest[]> {
    try {
      this.logger.log(`${this.getReagentRequestsForResearchers.name} - Start`);
      const { filter, pagination, sort } = options || {};
      if (filter.name && filter.status) {
        this.logger.log(`${this.getReagentRequestsForResearchers.name} - Filter By Name And Status`);
        return await this.requestRepository.getAllByNameAndStatus(filter.name, filter.status, pagination, sort, id);
      } else if (filter.name) {
        this.logger.log(`${this.getReagentRequestsForResearchers.name} - Filter By Name`);
        return await this.requestRepository.getAllByName(filter.name, pagination, sort, id);
      } else if (filter.status) {
        this.logger.log(`${this.getReagentRequestsForResearchers.name} - Filter By Status`);
        return await this.requestRepository.getAllByStatus(filter.status, pagination, sort, id);
      } else {
        this.logger.log(`${this.getReagentRequestsForResearchers.name} - Fetch All Reagent Requests`);
        return await this.requestRepository.findAll(pagination, sort, id);
      }
    } catch (error) {
      this.logger.error('Failed to fetch Reagent Requests: ', error);
      throw new InternalServerErrorException('Failed to fetch a Reagent Requests!');
    }
  }

  async getRequestById(id: number): Promise<IReagentRequest | null> {
    try {
      this.logger.log(`${this.getRequestById.name} START`);
      return await this.requestRepository.findById(id);
    } catch (error) {
      this.logger.error('Failed to fetch Reagent Request by ID: ', error);
      throw new InternalServerErrorException('Failed to fetch a Reagent Request by ID!');
    }
  }

  async editReagentRequest(data: UpdateReagentRequestDto, id: number): Promise<IReagentRequest> {
    try {
      return await this.requestRepository.updateById(data, id);
    } catch (error) {
      this.logger.error('Failed to edit Reagent Request: ', error);
      throw new InternalServerErrorException('Failed to edit a Reagent Request!');
    }
  }
}

const REQUEST_SERVICE_TOKEN = Symbol('REQUEST_SERVICE_TOKEN');
const RequestServiceProvider = {
  provide: REQUEST_SERVICE_TOKEN,
  useClass: ReagentRequestService,
};

export { REQUEST_SERVICE_TOKEN, RequestServiceProvider };
