import { Repository } from "typeorm";
import appDataSource from "../providers/database-config";
import { Category } from "../entities/category";

export class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Category | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(accountData: Partial<Category>): Promise<Category> {
    const account = this.repository.create(accountData);
    return await this.repository.save(account);
  }

  async update(
    id: number,
    accountData: Partial<Category>,
  ): Promise<Category | null> {
    await this.repository.update(id, accountData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
