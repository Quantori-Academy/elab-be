import { UpdateReagentRequestDto } from '../dto/updateReagentRequest.dto';
import { IReagentRequest } from './reagentRequestEntity.interface';
import { ReagentRequestOptions } from './reagentRequestOptions.interface';

export interface IReagentRequestService {
  create(request: IReagentRequest): Promise<IReagentRequest>;
  getReagentRequestsForProcurementOficcer(options: ReagentRequestOptions): Promise<IReagentRequest[]>;
  getReagentRequestsForResearchers(options: ReagentRequestOptions, id: number): Promise<IReagentRequest[]>;
  getRequestById(id: number): Promise<IReagentRequest | null>;
  editReagentRequest(data: UpdateReagentRequestDto, id: number): Promise<IReagentRequest>;
  getRequestByIdForResearcher(id: number, userId: number): Promise<IReagentRequest | null>;
}
