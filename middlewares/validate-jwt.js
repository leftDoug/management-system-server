const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(403).json({
			ok: false,
			msg: 'Error de token',
		});
	}

	try {
		const { id, username } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.id = id;
		req.username = username;
	} catch (err) {
		return res.status(401).json({
			ok: false,
			msg: 'Token inválido',
		});
	}

	next();
};

module.exports = { validateJWT };
