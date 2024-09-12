import { request, response } from 'express';

import { Response } from '../models/Response.js';

export const create = async (req = request, res = response) => {
	const { content, idAgreement } = req.body;

	try {
		await Response.create({ content, idAgreement });

		return res.status(201).json({
			ok: true,
			msg: 'Respuesta agregada',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al agregar la respuesta',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbRespones = await Response.findAll();

		return res.json({
			ok: true,
			arg: dbRespones,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar las respuestas',
		});
	}
};
