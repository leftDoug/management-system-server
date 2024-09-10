const { request, response } = require('express');
const Worker = require('../models/Worker');

const createWorker = async (req = request, res = response) => {
	const { name, occupation, email, secretary, idArea } = req.body;

	try {
		await Worker.create({ name, occupation, email, secretary, idArea });

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

const updateWorker = async (req = request, res = response) => {
	const { id, name, occupation, email, secretary, idArea } = req.body;

	try {
		await Area.update(
			{ name, occupation, email, secretary, idArea },
			{ where: { id } }
		);

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

const getAllWorkers = async (req = request, res = response) => {
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

const getByIdWorker = async (req = request, res = response) => {
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

module.exports = {
	createWorker,
	updateWorker,
	getAllWorkers,
	getByIdWorker,
};
