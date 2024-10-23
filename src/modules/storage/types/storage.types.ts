import { Reagent, Storage } from '@prisma/client';

type StorageWithReagents = Storage & {
  reagents: Reagent[];
};

type StorageCreation = {
  roomId: number;
  name: string;
  description?: string | null;
};
type FilterBy = {
  roomIds?: number[] | undefined;
  name?: string | undefined;
};

export { StorageWithReagents, StorageCreation, FilterBy };
