// const { request, response } = require('express');
// const Role = require('../models/Role');
// const { where } = require('sequelize');

import { request, response } from 'express';

import { Role } from '../models/Role.js';

export const getAll = async (req = request, res = response) => {
	try {
		const dbRoles = await Role.findAll();

		return res.json({
			ok: true,
			arg: dbRoles,
		});
	} catch (error) {
		console.error(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al listar los roles',
		});
	}
};

export const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'Rol no encontrado',
			});
		}

		return res.json({
			ok: true,
			arg: dbRole,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al buscar rol',
		});
	}
};

export const create = async (req = request, res = response) => {
	const { role } = req.body;

	try {
		const dbRole = await Role.create({ role });

		if (dbRole) {
			return res.status(201).json({
				ok: true,
				msg: 'Rol creado',
			});
		}
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			ok: false,
			msg: 'Error al crear el rol',
		});
	}
};

export const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { role } = req.body;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'Rol no encontrado',
			});
		}

		await Role.update({ role }, { where: { id } });

		return res.json({
			ok: true,
			msg: 'Rol actualizado',
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar rol',
		});
	}
};

export const remove = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'Rol no encontrado',
			});
		}

		await Role.destroy({ where: { id } });

		return res.status(204).json({
			ok: true,
			msg: 'Rol eliminado',
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al eliminar rol',
		});
	}
};

// module.exports = {
// 	create,
// 	getAll,
// 	getById,
// 	update,
// 	remove,
// };
