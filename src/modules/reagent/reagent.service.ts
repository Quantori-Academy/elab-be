import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IReagent } from './interfaces/reagentEntity.interface';
import { CreateReagentDto } from './dto/createReagent.dto';
import { IReagentService } from './interfaces/reagentService.interface';

@Injectable()
class ReagentService implements IReagentService {
  private readonly logger = new Logger(ReagentService.name);
  constructor(@Inject(REAGENT_REPOSITORY_TOKEN) private reagentRepository: IRepository<IReagent>) {}

  async create(data: CreateReagentDto): Promise<IReagent> {
    try {
      this.logger.log('Create reagent method');
      const { storageLocation, ...rest } = data;
      const storage = { id: 1 }; // await this.storageRepository.findByLocation() returns storage
      this.logger.log('Checking if storage exists');
      if (!storage) {
        this.logger.warn(`Storage with this location - ${storageLocation} - not found`);
        throw new NotFoundException('This storage does not exist');
      }
      const reagent = await this.reagentRepository.create({ ...rest, storageId: storage.id });
      this.logger.log('Created a reagent');
      return reagent;
    } catch (error) {
      this.logger.error('Failed to create a reagent: ', error);
      throw new InternalServerErrorException('Failed to create a reagent!');
    }
  }
}

const REAGENT_SERVICE_TOKEN = Symbol('REAGENT_SERVICE_TOKEN');
const ReagentServiceProvider = {
  provide: REAGENT_SERVICE_TOKEN,
  useClass: ReagentService,
};

export { REAGENT_SERVICE_TOKEN, ReagentServiceProvider };
