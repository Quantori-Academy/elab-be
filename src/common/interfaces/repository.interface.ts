export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  create(entity: T): Promise<any>;
  update(entity: T): Promise<any>;
  upsert(entity: T): Promise<void>;
}
