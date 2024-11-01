import { Category, Package } from '@prisma/client';

export interface IReagent {
  id?: number;
  name: string;
  casNumber?: string | null;
  producer?: string;
  catalogId?: string;
  catalogLink?: string;
  pricePerUnit?: number;
  quantityUnit: string;
  totalQuantity: number;
  description?: string;
  quantityLeft: number;
  expirationDate: Date;
  storageId: number;
  category: Category;
  package?: Package;
  structure?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
