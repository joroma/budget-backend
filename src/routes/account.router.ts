import { Router } from "express";
import accountController from "../controllers/account.controller";

const path = '/account';
const router = Router();
router.get(path, accountController.get);
router.post(path, accountController.post);
router.put(`${path}/:id`, accountController.update);
router.delete(`${path}/:id`, accountController.delete);
export default router; 
