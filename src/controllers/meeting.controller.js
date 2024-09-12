import { request, response } from 'express';

import { Meeting } from '../models/Meeting.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';

export const create = async (req = request, res = response) => {
	const {
		name,
		session,
		date,
		startTime,
		endTime,
		idTypeOfMeeting,
		idSecretary,
	} = req.body;
	debugger;
	try {
		const dbMeetings = await Meeting.findAll({ where: { date } });
		const dbToM = await TypeOfMeeting.findByPk(idTypeOfMeeting);

		if (dbMeeting.length > 0) {
			for (let index = 0; index < dbMeetings.length; index++) {
				const element = dbMeeting[index];
				const eStart = new Date(element.startTime);
				const eEnd = new Date(element.endTime);
				const ngStart = new Date(startTime);
				const ngEnd = new Date(endTime);

				if (
					(eStart.getTime() <= ngStart.getTime() &&
						eEnd.getTime() >= ngStart.getTime()) ||
					(eStart.getTime() <= ngEnd.getTime() &&
						eEnd.getTime() >= ngEnd.getTime())
				) {
					const elementToM = await TypeOfMeeting.findByPk(
						element.idTypeOfMeeting
					);

					if (dbToM.idArea === elementToM.idArea) {
						return res.status(400).json({
							ok: false,
							msg: 'Ya existe una reunión que coincide con esta en horario y área',
						});
					}
				}

				if (
					element.name === name &&
					element.session === session &&
					element.idTypeOfMeeting === idTypeOfMeeting
				) {
					return res.status(400).json({
						ok: false,
						msg: 'Ya existe una reunión que coincide con esta en nombre, sesión, tipo y fecha',
					});
				}
			}
		}

		await Meeting.create({
			name,
			session,
			date,
			startTime,
			endTime,
			idTypeOfMeeting,
			idSecretary,
		});

		res.status(201).json({
			ok: true,
			msg: 'Reunión creada',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear la Reunión',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const {
		name,
		session,
		date,
		startTime,
		endTime,
		idTypeOfMeeting,
		idSecretary,
		state,
	} = req.body;

	try {
		const dbMeetings = await Meeting.findAll({ where: { date } });
		const dbToM = await TypeOfMeeting.findByPk(idTypeOfMeeting);
		debugger;
		if (dbMeetings.length >= 1) {
			if (dbMeetings.length === 1 && dbMeetings[0].id === id) {
				return res.json({
					ok: true,
					msg: 'Reunion actualizada',
				});
			}

			for (let index = 0; index < dbMeetings.length; index++) {
				const element = dbMeetings[index];
				const eStart = new Date(element.startTime);
				const eEnd = new Date(element.endTime);
				const ngStart = new Date(startTime);
				const ngEnd = new Date(endTime);

				if (
					(eStart.getTime() <= ngStart.getTime() &&
						eEnd.getTime() >= ngStart.getTime()) ||
					(eStart.getTime() <= ngEnd.getTime() &&
						eEnd.getTime() >= ngEnd.getTime())
				) {
					const elementToM = await TypeOfMeeting.findByPk(
						element.idTypeOfMeeting
					);

					if (dbToM.idArea === elementToM.idArea) {
						return res.status(400).json({
							ok: false,
							msg: 'Ya existe una reunión que coincide con esta en horario y área',
						});
					}
				}

				if (
					element.name === name &&
					element.session === session &&
					element.idTypeOfMeeting === idTypeOfMeeting
				) {
					return res.status(400).json({
						ok: false,
						msg: 'Ya existe una reunión que coincide con esta en nombre, sesión, tipo y fecha',
					});
				}
			}
		}

		await Meeting.update(
			{
				name,
				session,
				date,
				startTime,
				endTime,
				idTypeOfMeeting,
				idSecretary,
				state,
			},
			{ where: { id } }
		);

		return res.json({
			ok: true,
			msg: 'Reunión actualizada',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar la Reunión',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbMeetings = await Meeting.findAll();

		return res.json({
			ok: true,
			arg: dbMeetings,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar las Reuniones',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbMeeting = await Meeting.findByPk(id);

		if (!dbMeeting) {
			return res.status(404).json({
				ok: false,
				msg: 'Tipo de Reunión no encontrado',
			});
		}

		return res.json({
			ok: true,
			arg: dbMeeting,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar la Reunión',
		});
	}
};
