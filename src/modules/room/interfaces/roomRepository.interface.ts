import { IRepository } from 'src/common/interfaces/repository.interface';
import { Room } from '@prisma/client';

export interface IRoomRepository extends IRepository<Room> {}
