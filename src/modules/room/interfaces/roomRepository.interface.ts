import { IRepository } from 'src/common/interfaces/repository.interface';
import { Room } from '@prisma/client';
import { CreateRoomDto } from '../dto/createRoom.dto';

export interface IRoomRepository extends IRepository<Room> {
  findRoomIdByName(roomName: string): Promise<number | null>;
  findRoomNameById(id: number): Promise<string | null>;
  create(room: CreateRoomDto): Promise<Room>;
}
