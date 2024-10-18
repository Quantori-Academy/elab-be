import { Reagent, Storage } from '@prisma/client';

export type StorageWithReagents = Storage & {
  reagents: Reagent[];
};
