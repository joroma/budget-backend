import { Router } from "express";
import accountController from "../controllers/account.controller";

const path = 'account';
export default Router().get(path, accountController.get);  
