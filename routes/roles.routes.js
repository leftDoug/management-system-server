const { Router } = require('express');
const {
	create,
	getAll,
	getById,
	remove,
	update,
} = require('../controllers/role.controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
