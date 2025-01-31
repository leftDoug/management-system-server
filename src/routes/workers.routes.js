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
	getAgreements,
	getAreas,
	getById,
	create,
	update,
	removeArea,
	addArea,
} from '../controllers/worker.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.get('/:id/areas', getAreas);
router.post('/:id/areas', addArea);
router.delete('/:id/areas/:idArea', removeArea);
router.get('/:id/agreements', getAgreements);

export default router;

// module.exports = router;
