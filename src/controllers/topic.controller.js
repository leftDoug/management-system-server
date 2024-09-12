import { request, response } from 'express';

import { Topic } from '../models/Topic.js';

export const create = async (req = request, res = response) => {
	const { name, month, idAgenda } = req.body;

	try {
		await Topic.create({ name, month, idAgenda });

		return res.status(201).json({
			ok: true,
			msg: 'Tema agregado',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al agregar el tema',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { name, month } = req.body;

	try {
		await Topic.update({ name, month }, { where: { id } });

		return res.status(201).json({
			ok: true,
			msg: 'Tema actualizado',
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar el tema',
		});
	}
};

export const getAll = async (req = request, res = response) => {
	try {
		const dbTopics = await Topic.findAll();

		return res.json({
			ok: true,
			arg: dbTopics,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar los temas',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;
	try {
		const dbTopic = await Topic.findByPk(id);

		return res.json({
			ok: true,
			arg: dbTopic,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar el temas',
		});
	}
};

export const remove = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		await Topic.destroy({ where: { id } });

		return res.json({
			ok: true,
			msg: 'Tema eliminado',
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al eliminar el tema',
		});
	}
};
