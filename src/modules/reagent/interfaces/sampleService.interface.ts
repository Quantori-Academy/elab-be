import { IReagent } from './reagentEntity.interface';

export interface ISampleService {
  create(data: IReagent): Promise<IReagent>;
}
