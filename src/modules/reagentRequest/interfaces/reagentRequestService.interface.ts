import { IReagentRequest } from './reagentRequestEntity.interface';
import { ReagentRequestOptions } from './reagentRequestOptions.interface';

export interface IReagentRequestService {
  create(request: IReagentRequest): Promise<IReagentRequest>;
  getReagentRequestsForProcurementOficcer(options: ReagentRequestOptions): Promise<IReagentRequest[]>;
  getReagentRequestsForResearchers(options: ReagentRequestOptions, id: number): Promise<IReagentRequest[]>;
}
