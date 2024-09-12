// const { Router } = require('express');
// const {
// 	getAllTypesOfMeetings,
// 	getByIdTypeOfMeeting,
// 	createTypeOfMeeting,
// 	updateTypeOfMeeting,
// } = require('../controllers/type-of-meeting.controller');

import { Router } from 'express';

import {
	getAll,
	getById,
	create,
	update,
} from '../controllers/type-of-meeting.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);

export default router;

// module.exports = router;
