import { Router } from "express";
import categoryController from "../controllers/category.controller";

const path = '/category';
const router = Router();
router.get(path, categoryController.get);
router.post(path, categoryController.post);
router.put(`${path}/:id`, categoryController.update);
router.delete(`${path}/:id`, categoryController.delete);
export default router; 
