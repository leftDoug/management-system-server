// const { request, response } = require('express');
// const Worker = require('../models/Worker');
// const Area = require('../models/Area');

import { request, response } from 'express';

import { Area } from '../models/Area.js';
import { Worker } from '../models/Worker.js';
import { Agreement } from '../models/Agreement.js';

export const create = async (req = request, res = response) => {
	const { name, occupation, email, idAreas } = req.body;
	debugger;
	try {
		const dbWorker = await Worker.create({
			name,
			occupation,
			email,
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
	const { name, occupation, email } = req.body;
	debugger;
	try {
		await Worker.update({ name, occupation, email }, { where: { id } });

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

export const addArea = async (req = request, res = response) => {
	const id = req.params.id;
	const idArea = req.body.idArea;

	try {
		const dbWorker = await Worker.findByPk(id);
		const dbArea = await Area.findByPk(idArea);

		await dbWorker.addArea(dbArea, {});

		res.status(200).json({
			ok: true,
			msg: 'Área agregada al trabajador correctamente',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			ok: false,
			msg: 'Error al agregar el área al trabajador',
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

export const removeArea = async (req = request, res = response) => {
	const { id, idArea } = req.params;
	try {
		const dbWorker = await Worker.findByPk(id);
		const dbArea = await Area.findByPk(idArea);

		await dbWorker.removeArea(dbArea);

		res.status(200).json({
			ok: true,
			msg: 'Se ha eliminado el área del trabajador correctamente',
		});
	} catch (error) {
		console.err(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al eliminar el area del trabajador',
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

export const getAgreements = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const dbAgreements = await Agreement.findAll({
			where: { idResponsible: id },
		});

		res.json({
			ok: true,
			arg: dbAgreements,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			ok: false,
			msg: 'Error al listar los acuerdos',
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
