import { Router } from 'express';
import * as categoryGroupController from '@/controllers/category-group.controller';

const router = Router();
const path = '/category-group';

router.get(path, categoryGroupController.list);
router.get(`${path}/:id`, categoryGroupController.getById);
router.post(path, categoryGroupController.create);
router.put(`${path}/:id`, categoryGroupController.update);
router.delete(`${path}/:id`, categoryGroupController.remove);

export default router;
