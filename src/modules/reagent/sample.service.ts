import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
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
        const results = await this.reagentRepository.findManyById(usedReagentSample.map((reagent) => reagent.reagentId));
        for (const result of results) {
          if (!result || result.quantityLeft === undefined || result.id === undefined) {
            throw new BadRequestException(`Invalid reagent data`);
          }
          if (result.quantityLeft === 0) {
            throw new BadRequestException(`The reagent ${result.name} (id- ${result.id}) doesn't have enough quantityLeft`);
          }
          const usedData = usedReagentSample.find((reagent) => reagent.reagentId === result.id);
          if (!usedData) {
            throw new BadRequestException(`Used data for reagent ${result.name} (id- ${result.id}) not found`);
          }
          if (result.quantityLeft < usedData?.quantityUsed) {
            throw new BadRequestException(
              `The reagent ${result.name} (id- ${result.id}) doesn't have enough quantityLeft (${result.quantityLeft}), to be used this much - ${usedData.quantityUsed}`,
            );
          }
          const newQuantityLeft = result.quantityLeft - usedData.quantityUsed;
          const isDeleted = newQuantityLeft === 0;
          await this.reagentRepository.updateById({ quantityLeft: newQuantityLeft }, result.id, isDeleted);
        }
      }
      return await this.reagentRepository.createSample(data);
    } catch (error) {
      this.logger.error('Failed to create a sample: ', error);
      throw error;
    }
  }
}

const SAMPLE_SERVICE_TOKEN = Symbol('SAMPLE_SERVICE');
const SampleServiceProvider = {
  provide: SAMPLE_SERVICE_TOKEN,
  useClass: SampleService,
};

export { SAMPLE_SERVICE_TOKEN, SampleServiceProvider };
