const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req = request, res = response) => {
	const { username, password } = req.body;

	try {
		const dbUser = await User.findOne({ where: { username } });

		if (!dbUser) {
			return res.status(400).json({
				ok: false,
				msg: 'Usuario incorrecto',
			});
		}

		const validPassword = bcrypt.compareSync(password, dbUser.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña incorrecta',
			});
		}

		const token = await generateJWT(dbUser.id, username);

		return res.json({
			ok: true,
			token: token,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al iniciar sesión',
		});
	}
};

const registerUser = async (req = request, res = response) => {
	const { username, password, idWorker } = req.body;

	try {
		let user = await User.findOne({ where: { username } });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Este nombre de usuario ya existe',
			});
		}

		user = await User.findOne({ where: { idWorker } });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Este trabajador ya tiene un usuario creado',
			});
		}

		user = await User.create({ username, password, idWorker });

		// hash password
		const salt = bcrypt.genSaltSync();

		user.password = bcrypt.hashSync(password, salt);

		const token = await generateJWT(user.id, username);

		await user.save();

		return res.status(201).json({
			ok: true,
			token,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el usuario',
		});
	}
};

const renew = async (req = request, res = response) => {
	const { id, username } = req;

	const token = await generateJWT(id, username);

	const dbUser = await User.findByPk(id);

	return res.json({
		ok: true,
		id,
		idWorker: dbUser.idWorker,
		token,
	});
};

module.exports = {
	login,
	registerUser,
	renew,
};
