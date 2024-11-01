import { Reagent } from '@prisma/client';

export interface ISampleService {
  create(data: Omit<Reagent, 'category'>): Promise<Reagent>;
}
