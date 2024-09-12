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
	create,
	update,
} from '../controllers/area.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);

export default router;

// module.exports = router;
