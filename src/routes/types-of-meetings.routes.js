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
  getMeetings,
  create,
  update,
  remove
} from '../controllers/type-of-meeting.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.get('/:id/meetings', getMeetings);
router.patch('/:id', update);
router.patch('/remove/:id', remove);

export default router;

// module.exports = router;
