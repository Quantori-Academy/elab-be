import { ReagentOptions, ReagentSearchOptions } from './reagentOptions.interface';
import { IReagent } from './reagentEntity.interface';

export interface IReagentService {
  create(data: IReagent): Promise<IReagent>;
  getReagents(options: ReagentOptions): Promise<IReagent[]>;
  searchByStructure(options: ReagentSearchOptions): Promise<IReagent | IReagent[]>;
}
