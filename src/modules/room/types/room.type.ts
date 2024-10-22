import { Room, Storage } from '@prisma/client';

export type RoomWithStorages = Room & {
  storages: Storage[];
};
