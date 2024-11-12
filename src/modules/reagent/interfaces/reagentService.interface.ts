import { ReagentOptions } from './reagentOptions.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';
import { IReagent } from './reagentEntity.interface';
import { ReagentList } from './reagentRepository.interface';

export interface IReagentService {
  create(data: IReagent): Promise<IReagent>;
  getReagents(options: ReagentOptions): Promise<ReagentList>;
  getReagentById(id: number): Promise<IReagent | null>;
  editReagent(data: UpdateReagentDto, id: number): Promise<IReagent>;
  deleteReagentById(id: number): Promise<IReagent>;
}
