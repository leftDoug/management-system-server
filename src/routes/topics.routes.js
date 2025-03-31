import { Router } from 'express';

import {
  getById,
  create,
  update,
  remove,
  eraseAll
} from '../controllers/topic.controller.js';

const router = Router();

// router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.patch('/:id/remove', remove);
router.delete('/:idAgenda', eraseAll);

export default router;
