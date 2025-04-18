import { Router } from 'express';
import * as account from '../controllers/account.controller';

const router = Router();
const path = '/account';

router.get(`${path}/:id`, account.getById);
router.get(path, account.list);
router.delete(`${path}/:id`, account.deleteAccount);
router.post(path, account.create);
router.put(`${path}/:id`, account.update);

export default router;
