// const { response, request } = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const { generateJWT } = require('../helpers/jwt');

import { request, response } from 'express';
import bcrypt from 'bcryptjs';

import { generateJWT } from '../helpers/jwt.js';
import { User } from '../models/User.js';

export const login = async (req = request, res = response) => {
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

export const register = async (req = request, res = response) => {
	const { username, password, idWorker, idRole } = req.body;

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

		user = await User.create({ username, password, idWorker, roleId: idRole });

		// hash password
		const salt = bcrypt.genSaltSync();

		user.password = bcrypt.hashSync(password, salt);

		const token = await generateJWT(user.id, username);

		await user.save();

		return res.status(201).json({
			ok: true,
			msg: 'Usuario creado',
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

export const tokenRenewal = async (req = request, res = response) => {
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

export const update = async (req, res) => {
	const id = req.params.id;
	const { username, oldPassword, newPassword, idWorker, idRole } = req.body;

	try {
		const dbUser = await User.findByPk(id);
		let user = await User.findOne({ where: { username } });

		if (user) {
			if (user.username === username && dbUser.username !== username) {
				return res.status(400).json({
					ok: false,
					msg: 'Este nombre de usuario ya existe',
				});
			}
		}

		user = await User.findOne({ where: { idWorker } });

		if (user) {
			if (user.idWorker !== dbUser.idWorker) {
				return res.status(400).json({
					ok: false,
					msg: 'Este trabajador ya tiene un usuario creado',
				});
			}
		}

		const validPassword = bcrypt.compareSync(oldPassword, dbUser.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña incorrecta',
			});
		}

		const salt = bcrypt.genSaltSync();

		const newHashedPassword = bcrypt.hashSync(newPassword, salt);

		await User.update(
			{
				username,
				password: newHashedPassword,
				idWorker,
				idRole,
			},
			{ where: { id } }
		);

		const token = await generateJWT(dbUser.id, username);

		return res.json({
			ok: true,
			msg: 'Usuario actualizado',
			token,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el usuario',
		});
	}
};

export const getRole = async (req, res) => {
	const id = req.params.id;
	debugger;
	try {
		const dbUser = await User.findByPk(id);
		const dbRole = await dbUser.getRole();

		return res.json({
			ok: true,
			arg: dbRole,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al obtener el rol del usuario',
		});
	}
};

// module.exports = {
// 	login,
// 	registerUser,
// 	renew,
// };
