import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IReagentRepository } from './interfaces/reagentRepository.interface';
import { ISampleService } from './interfaces/sampleService.interface';
import { IReagent } from './interfaces/reagentEntity.interface';
import { CreateSampleDto } from './dto/createSample.dto';

@Injectable()
class SampleService implements ISampleService {
  private logger = new Logger(SampleService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IReagentRepository) {}

  async create(data: CreateSampleDto): Promise<IReagent> {
    try {
      this.logger.log(`${this.create.name} - START`);
      return await this.reagentRepository.createSample(data);
    } catch (error) {
      this.logger.error('Failed to create a sample: ', error);
      throw new InternalServerErrorException('Failed to create a sample!');
    }
  }
}

const SAMPLE_SERVICE_TOKEN = Symbol('SAMPLE_SERVICE');
const SampleServiceProvider = {
  provide: SAMPLE_SERVICE_TOKEN,
  useClass: SampleService,
};

export { SAMPLE_SERVICE_TOKEN, SampleServiceProvider };
