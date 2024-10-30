import { Reagent, Storage } from '@prisma/client';

type StorageWithReagents = Storage & {
  reagents: Reagent[];
};

type StorageWithReagentCountObject = Storage & {
  _count: {
    reagents: number;
  };
};

type StorageWithReagentCount = Storage & {
  reagentCount: number;
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

type StorageList = {
  size: number;
  storages: Storage[];
};

export { StorageWithReagents, StorageCreation, FilterBy, StorageList, StorageWithReagentCount, StorageWithReagentCountObject };
