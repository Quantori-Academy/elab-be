import { IStorage } from './storage.interface';

export interface IRoom {
  id: number;
  name: string;
  description?: string;
  locations: IStorage[];
}
