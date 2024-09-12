// const { request, response } = require('express');
// const TypeOfMeeting = require('../models/TypeOfMeeting');

import { request, response } from 'express';

import { TypeOfMeeting } from '../models/TypeOfMeeting.js';

export const create = async (req = request, res = response) => {
	const { name, frequency, idArea } = req.body;

	try {
		const dbToM = await TypeOfMeeting.findAll({ where: { name, frequency } });

		if (dbToM.length > 0) {
			for (let index = 0; index < dbToM.length; index++) {
				const element = dbToM[index];

				if (element.idArea === idArea) {
					return res.status(400).json({
						ok: false,
						msg: 'Este tipo de reunion con la misma frecuencia ya existe para el area seleccionada',
					});
				}
			}
		}

		await TypeOfMeeting.create({ name, frequency, idArea });

		res.status(201).json({
			ok: true,
			msg: 'Tipo de Reunión creado',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el Tipo de Reunión',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { name, frequency, idArea, state } = req.body;

	try {
		const dbToM = await TypeOfMeeting.findAll({ where: { name, frequency } });

		if (dbToM.length > 0) {
			for (let index = 0; index < dbToM.length; index++) {
				const element = dbToM[index];

				if (element.idArea === idArea) {
					return res.status(400).json({
						ok: false,
						msg: 'Este tipo de reunion con la misma frecuencia ya existe para el area seleccionada',
					});
				}
			}
		}

		await TypeOfMeeting.update({ name, frequency, state }, { where: { id } });

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

export const getAll = async (req = request, res = response) => {
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

export const getById = async (req = request, res = response) => {
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

// module.exports = {
// 	createTypeOfMeeting,
// 	updateTypeOfMeeting,
// 	getAllTypesOfMeetings,
// 	getByIdTypeOfMeeting,
// };
