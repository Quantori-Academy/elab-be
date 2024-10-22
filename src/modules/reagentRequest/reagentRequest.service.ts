import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REQUEST_REPOSITORY_TOKEN } from './reagentRequest.repository';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagentRequest } from './interfaces/reagentRequestEntity.interface';
import { IReagentRequestService } from './interfaces/reagentRequestService.interface';

@Injectable()
class ReagentRequestService implements IReagentRequestService {
  private logger = new Logger(ReagentRequestService.name);

  constructor(@Inject(REQUEST_REPOSITORY_TOKEN) private requestRepository: IRepository<IReagentRequest>) {}

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
}

const REQUEST_SERVICE_TOKEN = Symbol('REQUEST_SERVICE_TOKEN');
const RequestServiceProvider = {
  provide: REQUEST_SERVICE_TOKEN,
  useClass: ReagentRequestService,
};

export { REQUEST_SERVICE_TOKEN, RequestServiceProvider };
