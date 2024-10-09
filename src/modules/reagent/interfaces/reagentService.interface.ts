import { CreateReagentDto } from '../dto/createReagent.dto';
import { IReagent } from './reagentEntity.interface';

export interface IReagentService {
  create(data: CreateReagentDto): Promise<IReagent>;
}
