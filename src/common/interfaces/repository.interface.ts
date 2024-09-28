export interface IRepository<T> {
  findById(id: number): Promise<T | null>;
  update(id: number, data: any): Promise<T>;
}
