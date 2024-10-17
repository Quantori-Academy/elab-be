import { Room } from '@prisma/client';

export interface IRoomService {
  getRoomNameById(id: number): Promise<string | null>;
  getRoomIdByName(roomName: string): Promise<number | null>;
  createRoom(room: any): Promise<Room>;
  delete(id: number): Promise<void>;
}
