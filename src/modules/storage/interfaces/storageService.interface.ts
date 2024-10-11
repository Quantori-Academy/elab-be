import { IStorage } from './storage.interface';

export interface IStorageService {
  getStoragByLocation(location: string): Promise<IStorage | null>;
  getStorages(): Promise<IStorage[]>;
}
