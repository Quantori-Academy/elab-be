import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
      const { usedReagentSample } = data;
      if (usedReagentSample) {
        const promises = usedReagentSample.map(async ({ reagentId, quantityUsed }) => {
          const reagent = await this.reagentRepository.findById(reagentId);
          return { reagent, quantityUsed, reagentId };
        });
        const results = await Promise.all(promises);
        for (const { reagent, quantityUsed, reagentId } of results) {
          if (!reagent || reagent.quantityLeft === undefined || reagent.id === undefined) {
            throw new BadRequestException(`Invalid reagent data for ID: ${reagentId}`);
          }
          if (reagent.quantityLeft === 0) {
            throw new BadRequestException(`The reagent ${reagent.id} doesn't have enough quantityLeft`);
          }
          if (reagent.quantityLeft < quantityUsed) {
            throw new BadRequestException(
              `The reagent ${reagent.id} doesn't have enough quantityLeft (${reagent.quantityLeft}), to be used this much - ${quantityUsed}`,
            );
          }
          const newQuantityLeft = reagent.quantityLeft - quantityUsed;
          const isDeleted = newQuantityLeft === 0;
          await this.reagentRepository.updateById({ quantityLeft: newQuantityLeft }, reagent.id, isDeleted);
        }
      }
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
