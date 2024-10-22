import { Reagent, Storage } from '@prisma/client';

type StorageWithReagents = Storage & {
  reagents: Reagent[];
};

type FilterBy = {
  roomIds?: number[] | undefined;
  name?: string | undefined;
};

export { StorageWithReagents, FilterBy };
