const { Router } = require('express');
const {
	getAll,
	getById,
	create,
	update,
	getAreas,
} = require('../controllers/worker.controller');

const router = Router();

router.get('/', getAll);

router.post('/', create);

router.get('/:id', getById);

router.put('/:id', update);

router.get('/:id/areas', getAreas);

module.exports = router;
