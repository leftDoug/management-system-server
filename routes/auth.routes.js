const { Router } = require('express');
const {
	registerUser,
	login,
	renew,
} = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

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
	registerUser
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
router.get('/renovar', validateJWT, renew);

module.exports = router;
