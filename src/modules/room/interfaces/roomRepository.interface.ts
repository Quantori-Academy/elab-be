import { IRepository } from 'src/common/interfaces/repository.interface';
import { Room } from '@prisma/client';
import { CreateRoomDto } from '../dto/createRoom.dto';
import { RoomWithStorages } from '../types/room.type';

export interface IRoomRepository extends IRepository<Room> {
  findById(id: number, includeStorages: true): Promise<RoomWithStorages | null>; // overload
  findById(id: number, includeStorages?: boolean): Promise<Room | RoomWithStorages | null>; // implementation signature
  findRoomIdByName(roomName: string): Promise<number | null>;
  findRoomNameById(id: number): Promise<string | null>;
  findRoomIdsBySubName(roomName: string): Promise<number[]>;
  create(room: CreateRoomDto): Promise<Room>;
}
