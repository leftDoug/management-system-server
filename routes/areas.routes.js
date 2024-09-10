const { Router } = require('express');
const {
	getAllAreas,
	getByIdArea,
	createArea,
	updateArea,
} = require('../controllers/area.controller');

const router = Router();

router.get('/', getAllAreas);

router.get('/:id', getByIdArea);

router.post('/', createArea);

router.put('/:id', updateArea);

module.exports = router;
