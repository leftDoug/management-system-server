import { Router } from 'express';

import {
  getAll,
  getById,
  getWorkers,
  create,
  update,
  remove,
  removeAll
} from '../controllers/area.controller.js';
import { findByPk } from '../middlewares/findByPk.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', findByPk, getById);
router.get('/:id/workers', findByPk, getWorkers);
router.patch('/:id', findByPk, update);
router.patch('/remove/:id', findByPk, remove);
router.delete('/remove', removeAll);

export default router;
