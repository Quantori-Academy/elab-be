import { ReagentOptions, ReagentSearchOptions } from './reagentOptions.interface';
import { UpdateReagentDto } from '../dto/updateReagent.dto';
import { Reagent } from '@prisma/client';

export interface IReagentService {
  create(data: Reagent): Promise<Reagent>;
  getReagents(options: ReagentOptions): Promise<Reagent[]>;
  searchByStructure(options: ReagentSearchOptions): Promise<Reagent | Reagent[]>;
  getReagentById(id: number): Promise<Reagent | null>;
  editReagent(data: UpdateReagentDto, id: number): Promise<Reagent>;
}
