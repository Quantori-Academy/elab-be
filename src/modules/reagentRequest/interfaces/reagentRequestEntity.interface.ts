import { Status } from '@prisma/client';

export interface IReagentRequest {
  id?: number;
  name: string;
  userId: number;
  desiredQuantity: string;
  structureSmiles?: string;
  structureImage?: string;
  casNumber?: string;
  userComments?: string;
  procurementComments: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
