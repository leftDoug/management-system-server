import { request, response } from 'express';

import { Agreement } from '../models/Agreement.js';

export const create = async (req = request, res = response) => {
	const { content, compilanceDate, idMeeting, idResponsible } = req.body;
	debugger;
	try {
		const dbAgreement = await Agreement.findOne({
			where: { content, idMeeting },
		});

		if (dbAgreement) {
			return res.status(400).json({
				ok: false,
				msg: 'Este acuerdo ya existe en esta reunion',
			});
		}

		const date = new Date(compilanceDate);

		await Agreement.create({
			content,
			compilanceDate: date,
			idMeeting,
			idResponsible,
		});

		res.status(201).json({
			ok: true,
			msg: 'Acuerdo creado',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el acuerdo',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { compilanceDate, completed, state } = req.body;

	try {
		await Agreement.update(
			{ compilanceDate, completed, state },
			{ where: { id } }
		);

		return res.json({
			ok: true,
			msg: 'Acuerdo actualizado',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el acuerdo',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbAgreements = await Agreement.findAll();

		return res.json({
			ok: true,
			arg: dbAgreements,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar los acuerdos',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbAgreement = await Agreement.findByPk(id);

		if (!dbAgreement) {
			return res.status(404).json({
				ok: false,
				msg: 'Acuerdo no encontrado',
			});
		}

		return res.json({
			ok: true,
			arg: dbAgreement,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar el acuerdo',
		});
	}
};
