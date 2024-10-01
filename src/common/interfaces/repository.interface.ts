export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  update(entity: any): Promise<T>;
}
