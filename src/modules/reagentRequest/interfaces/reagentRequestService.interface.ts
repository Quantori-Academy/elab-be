import { IReagentRequest } from './reagentRequestEntity.interface';

export interface IReagentRequestService {
  create(request: IReagentRequest): Promise<IReagentRequest>;
}
