export interface IReagent {
  id?: number;
  name: string;
  casNumber: string;
  producer: string;
  catalogId: string;
  catalogLink: string;
  pricePerUnit: number;
  quantityUnit: string;
  totalQuantity: string;
  description: string;
  quantityLeft: number;
  expirationDate: Date;
  storageId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
