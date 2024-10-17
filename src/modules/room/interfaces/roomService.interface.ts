export interface IRoomService {
  getRoomNameById(id: number): Promise<string | null>;
  getRoomIdByName(roomName: string): Promise<number | null>;
}
