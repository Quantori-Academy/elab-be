import { Room, Storage } from '@prisma/client';

type RoomWithStorages = Room & {
  storages: Storage[];
};

type RoomWithStorageCount = Room & {
  storageCount: number;
};

type RoomWithStorageCountObject = Room & {
  _count: {
    storages: number;
  };
};

type IdOnly = {
  id: number;
};

export { RoomWithStorages, IdOnly, RoomWithStorageCountObject, RoomWithStorageCount };
