import { request, response } from 'express';

import { Agenda } from '../models/Agenda.js';

export const create = async (req = request, res = response) => {
	const { year, idTypeOfMeeting } = req.body;

	try {
		const dbAgenda = await Agenda.findOne({ where: { year, idTypeOfMeeting } });

		if (dbAgenda) {
			return res.status(400).json({
				ok: false,
				mesg: 'Ya existe una agenda creada para este tipo de reunión este año',
			});
		}

		await Agenda.create({ year, idTypeOfMeeting });

		res.status(201).json({
			ok: true,
			msg: 'Agenda creada',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear la Agenda',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { year } = req.body;

	try {
		const dbAgenda = await Agenda.findOne({ where: { year, id } });

		if (dbAgenda) {
			return res.status(400).json({
				ok: false,
				mesg: 'Ya existe una agenda creada para este tipo de reunión este año',
			});
		}

		await Agenda.update({ year }, { where: { id } });

		return res.json({
			ok: true,
			msg: 'Agenda actualizada',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar la Agenda',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbAgendas = await Agenda.findAll();

		return res.json({
			ok: true,
			arg: dbAgendas,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar las Agendas',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbAgenda = await Agenda.findByPk(id);

		if (!dbAgenda) {
			return res.status(404).json({
				ok: false,
				msg: 'Agenda no encontrada',
			});
		}

		return res.json({
			ok: true,
			arg: dbAgenda,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar la Agenda',
		});
	}
};
