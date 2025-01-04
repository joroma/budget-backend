import { NextFunction, Request, Response, response } from "express";
import { AccountService } from "../services/account.service";
import { Account } from "../entities/account";

const accountService = new AccountService();

export default {
  async get(req: Request, res: Response, next: NextFunction) {
    const accounts = await accountService.getAccounts();
    res.send(accounts);
  },

  async post(req: Request, res: Response, next: NextFunction) {
    const accountData = req.body as Partial<Account>;
    const account = await accountService.createAccount(accountData);
    res.send(account);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    res.send("Not implemented");
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    res.send("Not implemented");
  },
};
