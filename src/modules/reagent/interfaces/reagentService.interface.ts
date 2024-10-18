import { ReagentOptions, SearchOptions } from './reagentOptions.interface';
import { IReagent } from './reagentEntity.interface';

export interface IReagentService {
  create(data: IReagent): Promise<IReagent>;
  getReagents(options: ReagentOptions): Promise<IReagent[]>;
  searchByStructure(options: SearchOptions): Promise<IReagent | IReagent[]>;
}
