const { Router } = require('express');
const {
	getAllWorkers,
	getByIdWorker,
	createWorker,
	updateWorker,
} = require('../controllers/worker.controller');

const router = Router();

router.get('/', getAllWorkers);

router.get('/:id', getByIdWorker);

router.post('/', createWorker);

router.put('/:id', updateWorker);

module.exports = router;
