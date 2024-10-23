import { Status } from '@prisma/client';

export interface IReagentRequest {
  id?: number;
  name: string;
  userId: number;
  desiredQuantity: string;
  structureSmiles?: string | null;
  structureImage?: string | null;
  casNumber?: string | null;
  userComments?: string | null;
  procurementComments?: string | null;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}