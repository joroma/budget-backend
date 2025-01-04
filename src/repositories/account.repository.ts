import { Repository } from "typeorm";
import appDataSource from "../providers/database-config";
import { Account } from "../entities/account";

export class AccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = appDataSource.getRepository(Account);
  }

  async findAll(): Promise<Account[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Account | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(accountData: Partial<Account>): Promise<Account> {
    const account = this.repository.create(accountData);
    return await this.repository.save(account);
  }

  async update(
    id: number,
    accountData: Partial<Account>,
  ): Promise<Account | null> {
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
