import { Transaction } from "../entities/transaction";
import { TransactionRepository } from "../repositories/transaction.repository";

export class TransactionService {
  private accountRepository: TransactionRepository;
  constructor() {
    this.accountRepository = new TransactionRepository();
  }
  async getTransactions(): Promise<Transaction[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new Error("Transaction not found");
    }
    return account;
  }

  async createTransaction(accountData: Partial<Transaction>): Promise<Transaction> {
    // TODO: Add validations

    return await this.accountRepository.create(accountData);
  }

  async updateTransaction(
    id: number,
    accountData: Partial<Transaction>,
  ): Promise<Transaction> {
    const existingTransaction = await this.accountRepository.findById(id);
    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = await this.accountRepository.update(
      id,
      accountData,
    );
    if (!updatedTransaction) {
      throw new Error("Failed to update account");
    }

    return updatedTransaction;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const existingTransaction = await this.accountRepository.findById(id);
    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    return await this.accountRepository.delete(id);
  }
}
