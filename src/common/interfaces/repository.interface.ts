export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  upsert(entity: T): Promise<void>;
  delete(entity: Partial<T>): Promise<T>;
}
