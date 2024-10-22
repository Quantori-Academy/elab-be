import { Room } from '@prisma/client';
import { CreateRoomDto } from '../dto/createRoom.dto';

export interface IRoomService {
  getRoomNameById(id: number): Promise<string | null>;
  getRoomIdByName(roomName: string): Promise<number | null>;
  createRoom(room: CreateRoomDto): Promise<Room>;
  delete(id: number): Promise<void>;
}
