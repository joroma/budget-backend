import { NextFunction, Request, Response, response } from "express";
import { TransactionService } from "../services/transaction.service";
import { Transaction } from "../entities/transaction";

const accountService = new TransactionService();

export default {
  async get(req: Request, res: Response, next: NextFunction) {
    const accounts = await accountService.getTransactions();
    res.send(accounts);
  },

  async post(req: Request, res: Response, next: NextFunction) {
    const accountData = req.body as Partial<Transaction>;
    const account = await accountService.createTransaction(accountData);
    res.send(account);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    res.send("Not implemented");
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    res.send("Not implemented");
  },
};
