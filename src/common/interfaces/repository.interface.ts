export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  save(entity: T): Promise<void>;
}