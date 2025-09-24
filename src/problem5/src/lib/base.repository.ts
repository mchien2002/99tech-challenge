import { Repository, EntityTarget, BaseEntity, FindManyOptions } from "typeorm";
import { AppDataSource } from "../db";

export class BaseRepository<T extends BaseEntity> {
  protected repo: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repo = AppDataSource.getRepository(entity);
  }

  async create(data: Partial<T> | Partial<T>[]): Promise<T | T[]> {
    const entity = this.repo.create(data as any);
    return await this.repo.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  async findById(id: string): Promise<T | null> {
    return this.repo.findOneBy({ id } as any);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;

    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
