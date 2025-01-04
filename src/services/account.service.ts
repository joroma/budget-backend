import { Account } from "../entities/account";
import { AccountRepository } from "../repositories/account.repository";

export class AccountService {
  private accountRepository: AccountRepository;
  constructor() {
    this.accountRepository = new AccountRepository();
  }
  async getAccounts(): Promise<Account[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getAccountById(id: number): Promise<Account | null> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new Error("Account not found");
    }
    return account;
  }

  async createAccount(accountData: Partial<Account>): Promise<Account> {
    // TODO: Add validations

    return await this.accountRepository.create(accountData);
  }

  async updateAccount(
    id: number,
    accountData: Partial<Account>,
  ): Promise<Account> {
    const existingAccount = await this.accountRepository.findById(id);
    if (!existingAccount) {
      throw new Error("Account not found");
    }

    const updatedAccount = await this.accountRepository.update(id, accountData);
    if (!updatedAccount) {
      throw new Error("Failed to update account");
    }

    return updatedAccount;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const existingAccount = await this.accountRepository.findById(id);
    if (!existingAccount) {
      throw new Error("Account not found");
    }

    return await this.accountRepository.delete(id);
  }
}
