// const { Router } = require('express');
// const {
// 	registerUser,
// 	login,
// 	renew,
// } = require('../controllers/auth.controller');
// const { check } = require('express-validator');
// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt');

import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import {
	getRole,
	login,
	register,
	tokenRenewal,
	update,
} from '../controllers/auth.controller.js';

const router = Router();

// register user
router.post(
	'/registrarse',
	[
		check('username', 'El usuario es obligatorio.').not().isEmpty(),
		check('username', 'El usuario debe tener al menos 5 caracteres.').isLength({
			min: 5,
		}),
		check('password', 'La contraseña es obligatoria.').not().isEmpty(),
		check(
			'password',
			'La contraseña debe tener al menos 8 caracteres.'
		).isLength({ min: 8 }),
		validateFields,
	],
	register
);

// login
router.post(
	'/',
	[
		check('username', 'El usuario es obligatorio.').not().isEmpty(),
		check('password', 'La contraseña es obligatoria.').not().isEmpty(),
		validateFields,
	],
	login
);

// renew token
router.get('/renovar', validateJWT, tokenRenewal);

router.put('/users/:id', update);

router.get('/users/:id/role', getRole);

export default router;

// module.exports = router;
