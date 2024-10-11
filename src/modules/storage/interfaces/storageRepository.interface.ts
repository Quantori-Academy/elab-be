import { IRepository } from 'src/common/interfaces/repository.interface';
import { Storage } from '@prisma/client';

export interface IStorageRepository extends IRepository<Storage> {
  findByStorageLocation(location: string): Promise<Storage | null>;
}
