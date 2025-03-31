import { Router } from 'express';

import {
  getAll,
  getById,
  create,
  update,
  getTopics,
  erase,
  remove,
  getInfo
} from '../controllers/agenda.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/info', getInfo);
router.get('/:id/topics', getTopics);
router.post('/', create);
router.patch('/:id', update);
router.patch('/:id/remove', remove);
router.delete('/:id', erase);

export default router;
