// const { Router } = require('express');
// const {
// 	getAll,
// 	getById,
// 	create,
// 	update,
// 	getAreas,
// } = require('../controllers/worker.controller');

import { Router } from 'express';

import {
	getAll,
	getAreas,
	getById,
	create,
	update,
} from '../controllers/worker.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.get('/:id/areas', getAreas);

export default router;

// module.exports = router;
