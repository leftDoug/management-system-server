const { request, response } = require('express');
const TypeOfMeeting = require('../models/TypeOfMeeting');

const createTypeOfMeeting = async (req = request, res = response) => {
	const { name, frequency, idArea } = req.body;

	try {
		await TypeOfMeeting.create({ name, frequency, idArea });

		return res.status(201).json({
			ok: true,
			msg: 'Tipo de Reunión creado correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el Tipo de Reunión',
		});
	}
};

const updateTypeOfMeeting = async (req = request, res = response) => {
	const { id, name, frequency, idArea, state } = req.body;

	try {
		await TypeOfMeeting.update(
			{ name, frequency, idArea, state },
			{ where: { id } }
		);

		return res.json({
			ok: true,
			msg: 'Tipo de Reunión actualizado correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el Tipo de Reunión',
		});
	}
};

const getAllTypesOfMeetings = async (req = request, res = response) => {
	try {
		const dbTypesOfMeetings = await TypeOfMeeting.findAll();

		return res.json({
			ok: true,
			arg: dbTypesOfMeetings,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar los Tipos De Reuniones',
		});
	}
};

const getByIdTypeOfMeeting = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbTypeOfMeeting = await TypeOfMeeting.findByPk(id);

		if (!dbTypeOfMeeting) {
			return res.status(404).json({
				ok: false,
				msg: 'Tipo de Reunión no encontrado',
			});
		}

		return res.json({
			ok: true,
			arg: dbTypeOfMeeting,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar el Tipo de Reunión',
		});
	}
};

module.exports = {
	createTypeOfMeeting,
	updateTypeOfMeeting,
	getAllTypesOfMeetings,
	getByIdTypeOfMeeting,
};
