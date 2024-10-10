export interface IStorage {
  id: number;
  roomId: number;
  name: string;
  description?: string | null;
  // reagents: IReagent[];  temporary for now
  createdAt: Date;
  updatedAt: Date;
}
