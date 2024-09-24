export interface IRepository<T> {
  get(id: number): Promise<T | undefined>;
  save(entity: T): Promise<void>;
}
