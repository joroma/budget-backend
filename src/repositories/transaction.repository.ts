import { Repository } from "typeorm";
import appDataSource from "../providers/database-config";
import { Transaction } from "../entities/transaction";

export class TransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = appDataSource.getRepository(Transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Transaction | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(accountData: Partial<Transaction>): Promise<Transaction> {
    const account = this.repository.create(accountData);
    return await this.repository.save(account);
  }

  async update(
    id: number,
    accountData: Partial<Transaction>,
  ): Promise<Transaction | null> {
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
