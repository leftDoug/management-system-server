const { Router } = require('express');
const {
	getAllTypesOfMeetings,
	getByIdTypeOfMeeting,
	createTypeOfMeeting,
	updateTypeOfMeeting,
} = require('../controllers/type-of-meeting.controller');

const router = Router();

router.get('/', getAllTypesOfMeetings);

router.get('/:id', getByIdTypeOfMeeting);

router.post('/', createTypeOfMeeting);

router.put('/:id', updateTypeOfMeeting);

module.exports = router;
