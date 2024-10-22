import { Reagent, Storage } from '@prisma/client';

export type StorageWithReagents = Storage & {
  reagents: Reagent[];
};

export type StorageCreation = {
  roomId: number;
  name: string;
  description?: string | null;
};
