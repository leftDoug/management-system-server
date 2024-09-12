// const { request, response } = require('express');
// const Worker = require('../models/Worker');
// const Area = require('../models/Area');

import { request, response } from 'express';

import { Area } from '../models/Area.js';
import { Worker } from '../models/Worker.js';

export const create = async (req = request, res = response) => {
	const { name, occupation, email, secretary, idAreas } = req.body;

	try {
		const dbWorker = await Worker.create({
			name,
			occupation,
			email,
			secretary,
		});

		for (let index = 0; index < idAreas.length; index++) {
			const id = idAreas[index];
			const dbArea = await Area.findByPk(id);

			dbWorker.addArea(dbArea);
		}

		return res.status(201).json({
			ok: true,
			msg: 'Trabajador creado correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el trabajador',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { name, occupation, email, secretary, idAreas } = req.body;
	debugger;
	try {
		await Worker.update(
			{ name, occupation, email, secretary },
			{ where: { id } }
		);

		const dbWorker = await Worker.findByPk(id);
		let dbAreas = [];

		for (let index = 0; index < idAreas.length; index++) {
			const element = idAreas[index];
			const dbArea = await Area.findByPk(element);

			dbAreas.push(dbArea);
		}

		dbWorker.setAreas(dbAreas);

		return res.json({
			ok: true,
			msg: 'Trabajador actualizado correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el trabajador',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbWorkers = await Worker.findAll();

		return res.json({
			ok: true,
			arg: dbWorkers,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar los trabajadores',
		});
	}
};

export const getAreas = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbWorker = await Worker.findByPk(id);
		const dbAreas = await dbWorker.getAreas({
			joinTableAttributes: [],
		});

		return res.json({
			ok: true,
			arg: dbAreas,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar las areas del trabajador',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbWorker = await Worker.findByPk(id);

		if (!dbWorker) {
			return res.status(404).json({
				ok: false,
				msg: 'Trabajador no encontrado',
			});
		}

		return res.json({
			ok: true,
			arg: dbWorker,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar el trabajador',
		});
	}
};

// module.exports = {
// 	create,
// 	update,
// 	getAll,
// 	getById,
// 	getAreas,
// };
