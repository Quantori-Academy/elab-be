export interface IRepository<T> {
  get(id: string): Promise<T | undefined>;
  save(entity: T): Promise<void>;
}
