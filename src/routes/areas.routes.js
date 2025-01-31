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
	getToM,
	getWorkers,
	create,
	update,
} from '../controllers/area.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.get('/:id/types-of-meetings', getToM);
router.get('/:id/workers', getWorkers);
router.put('/:id', update);

export default router;

// module.exports = router;
