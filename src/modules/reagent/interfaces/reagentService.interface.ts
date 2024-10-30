import { ReagentOptions, ReagentSearchOptions } from './reagentOptions.interface';
import { IReagent } from './reagentEntity.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';

export interface IReagentService {
  create(data: IReagent): Promise<IReagent>;
  getReagents(options: ReagentOptions): Promise<IReagent[]>;
  searchByStructure(options: ReagentSearchOptions): Promise<IReagent | IReagent[]>;
  getReagentById(id: number): Promise<IReagent | null>;
  editReagent(data: UpdateReagentDto, id: number): Promise<IReagent>;
}
