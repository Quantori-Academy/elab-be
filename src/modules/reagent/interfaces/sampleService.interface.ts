import { Reagent } from '@prisma/client';

export interface ISampleService {
  create(data: Reagent): Promise<Reagent>;
}
