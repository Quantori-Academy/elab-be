export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  update(entity: any): Promise<T>;
  create(entity: T): Promise<any>;
  update(entity: T): Promise<any>;
}
