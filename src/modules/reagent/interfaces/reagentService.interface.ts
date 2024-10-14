import { IReagent } from './reagentEntity.interface';

export interface IReagentService {
  create(data: IReagent): Promise<IReagent>;
}
