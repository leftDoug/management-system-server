import { Router } from 'express';

import {
  getAll,
  create,
  validate
} from '../controllers/response.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.patch('/:id', validate);

export default router;
