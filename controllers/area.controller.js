const { request, response } = require('express');
const Area = require('../models/Area');

const createArea = async (req = request, res = response) => {
	const { name } = req.body;

	try {
		let dbArea = await Area.findOne({ where: { name } });

		if (dbArea) {
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe un área con este nombre',
			});
		}

		dbArea = await Area.create({ name });

		return res.status(201).json({
			ok: true,
			msg: 'Área creada correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el área',
		});
	}
};

const updateArea = async (req = request, res = response) => {
	const { id, name, state } = req.body;

	try {
		await Area.update({ name, state }, { where: { id } });

		return res.json({
			ok: true,
			msg: 'Área actualizada correctamente',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el área',
		});
	}
};

const getAllAreas = async (req = request, res = response) => {
	try {
		const dbAreas = await Area.findAll();

		return res.json({
			ok: true,
			arg: dbAreas,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar las áreas',
		});
	}
};

const getByIdArea = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbArea = await Area.findByPk(id);

		if (!dbArea) {
			return res.status(404).json({
				ok: false,
				msg: 'Área no encontrada',
			});
		}

		return res.json({
			ok: true,
			arg: dbArea,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar el área',
		});
	}
};

module.exports = {
	createArea,
	updateArea,
	getAllAreas,
	getByIdArea,
};
