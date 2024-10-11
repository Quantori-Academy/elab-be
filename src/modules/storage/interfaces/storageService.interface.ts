import { Storage } from '@prisma/client';

export interface IStorageService {
  getStoragByLocation(location: string): Promise<Storage | null>;
  getStorages(): Promise<Storage[]>;
}
