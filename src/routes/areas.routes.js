// const { Router } = require('express');
// const {
// 	getAllAreas,
// 	getByIdArea,
// 	createArea,
// 	updateArea,
// } = require('../controllers/area.controller');

import { Router } from 'express';

import {
  getAll,
  getById,
  getWorkers,
  create,
  update,
  getTypesOfMeetings,
  remove
} from '../controllers/area.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.get('/:id/types-of-meetings', getTypesOfMeetings);
router.get('/:id/workers', getWorkers);
router.patch('/:id', update);
router.patch('/remove/:id', remove);

export default router;

// module.exports = router;
