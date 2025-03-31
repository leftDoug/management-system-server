import { Router } from 'express';

import {
  getAll,
  getById,
  getWorkers,
  create,
  update,
  remove,
  addWorkers,
  erase,
  updateWorkers,
  getToMs,
  getInfo,
  getInfoX
  // removeAll
} from '../controllers/organization.controller.js';
import { findByPk } from '../middlewares/findByPk.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', findByPk, getById);
router.get('/:id/info', findByPk, getInfo);
router.get('/info/:id', findByPk, getInfoX);
router.get('/:id/toms', findByPk, getToMs);
router.get('/:id/workers', findByPk, getWorkers);
router.post('/', create);
router.post('/:id', findByPk, addWorkers);
router.patch('/:id', findByPk, update);
router.patch('/:id/workers', findByPk, updateWorkers);
router.patch('/remove/:id', findByPk, remove);
router.delete('/remove/:id', findByPk, erase);

export default router;
