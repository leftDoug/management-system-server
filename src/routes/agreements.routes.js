import { Router } from 'express';

import {
	getAll,
	getById,
	getInfo,
	create,
	update,
} from '../controllers/agreement.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/info/:id', getInfo);
router.post('/', create);
router.put('/:id', update);

export default router;
