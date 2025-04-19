import { Router } from 'express';
import * as categoryGroupController from '@/controllers/category-group.controller';

const router = Router();

router.get('/', categoryGroupController.list);
router.get('/:id', categoryGroupController.getById);
router.post('/', categoryGroupController.create);
router.put('/:id', categoryGroupController.update);
router.delete('/:id', categoryGroupController.remove);

export default router;
