import { Status } from '@prisma/client';

export interface IReagentRequest {
  id?: number;
  name: string;
  userId: number;
  desiredQuantity: number;
  quantityUnit: string;
  structureSmiles?: string | null;
  casNumber?: string | null;
  userComments?: string | null;
  procurementComments?: string | null;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
  orderId?: number;
}
