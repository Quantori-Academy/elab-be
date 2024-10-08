import { IRepository } from 'src/common/interfaces/repository.interface';
import { ISession } from './session.interface';

export interface IAuthRepository extends IRepository<ISession> {
  findSessionByUserId(userId: number): Promise<ISession | null>;
}
