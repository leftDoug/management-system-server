import { Router } from 'express';

import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controllers/topic.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.patch('/:id/remove', remove);

export default router;
