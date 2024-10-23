import { Room, Storage } from '@prisma/client';

type RoomWithStorages = Room & {
  storages: Storage[];
};

type IdOnly = {
  id: number;
};

export { RoomWithStorages, IdOnly };
