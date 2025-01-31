import { request, response } from 'express';

import { Agreement } from '../models/Agreement.js';
import { sequelize } from '../db/config.js';
import { QueryTypes } from 'sequelize';

export const create = async (req = request, res = response) => {
	const { content, compilance_date, meeting_id, responsible_id } = req.body;
	debugger;
	try {
		const dbAgreement = await Agreement.findOne({
			where: { content, meeting_id },
		});

		if (dbAgreement) {
			return res.status(400).json({
				ok: false,
				msg: 'Este acuerdo ya existe en esta reunion',
			});
		}

		const date = new Date(compilance_date);

		await Agreement.create({
			content,
			compilance_date: date,
			idMeeting: meeting_id,
			idResponsible: responsible_id,
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
	const { compilance_date, completed, state } = req.body;

	try {
		await Agreement.update(
			{ compilance_date, completed, state },
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
		const dbAgreements = await sequelize.query(
			`select * from view_agreements`,
			{
				type: QueryTypes.SELECT,
			}
		);

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
		// const dbAgreement = await sequelize.query(
		// 	`select fn_agreement_getinfo('${id}')`,
		// 	{
		// 		type: QueryTypes.SELECT,
		// 	}
		// );

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

export const getInfo = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const result = await sequelize.query(
			`
			SELECT fn_agreement_getinfo('${id}', 'agreement');
			FETCH ALL IN agreement;
			`,
			{
				type: QueryTypes.SELECT,
			}
		);

		const dbAgreement = result[1];

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
