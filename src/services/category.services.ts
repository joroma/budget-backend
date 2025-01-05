import { Category } from "../entities/category";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private accountRepository: CategoryRepository;
  constructor() {
    this.accountRepository = new CategoryRepository();
  }
  async getCategorys(): Promise<Category[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new Error("Category not found");
    }
    return account;
  }

  async createCategory(accountData: Partial<Category>): Promise<Category> {
    // TODO: Add validations

    return await this.accountRepository.create(accountData);
  }

  async updateCategory(
    id: number,
    accountData: Partial<Category>,
  ): Promise<Category> {
    const existingCategory = await this.accountRepository.findById(id);
    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const updatedCategory = await this.accountRepository.update(
      id,
      accountData,
    );
    if (!updatedCategory) {
      throw new Error("Failed to update account");
    }

    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const existingCategory = await this.accountRepository.findById(id);
    if (!existingCategory) {
      throw new Error("Category not found");
    }

    return await this.accountRepository.delete(id);
  }
}
