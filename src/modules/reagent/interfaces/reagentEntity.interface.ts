import { Category } from '@prisma/client';

export interface IReagent {
  id?: number;
  name: string;
  casNumber: string;
  producer: string;
  catalogId: string;
  catalogLink: string;
  pricePerUnit: number;
  quantityUnit: string;
  totalQuantity: number;
  description: string;
  quantityLeft: number;
  expirationDate: Date;
  storageId: number;
  category: Category;
  structure?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
