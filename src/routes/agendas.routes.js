import { Router } from 'express';

import {
  getAll,
  getById,
  create,
  update,
  getTopics
} from '../controllers/agenda.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/topics', getTopics);
router.post('/', create);
router.patch('/:id', update);

export default router;
