const { request, response } = require('express');
const Role = require('../models/Role');
const { where } = require('sequelize');

const getAll = async (req = request, res = response) => {
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

const getById = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró el rol',
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

const create = async (req = request, res = response) => {
	const { name } = req.body;

	try {
		const dbRole = await Role.create({ name });

		if (dbRole) {
			return res.json({
				ok: true,
				uuid: dbRole.id,
				role: dbRole.name,
			});
		}
	} catch (err) {
		console.log(err);
		return res.json({
			ok: false,
			msg: 'Error al crear el rol',
		});
	}
};

const update = async (req = request, res = response) => {
	const id = req.params.id;
	const { name } = req.body;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró el rol',
			});
		}

		await Role.update({ name }, { where: { id } });

		return res.json({
			ok: true,
			msg: 'Rol actualizado exitosamente',
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al actualizar rol',
		});
	}
};

const remove = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const dbRole = await Role.findByPk(id);

		if (!dbRole) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró el rol',
			});
		}

		await Role.destroy({ where: { id } });

		return res.json({
			ok: true,
			msg: 'Rol eliminado exitosamente',
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			ok: false,
			msg: 'Error al eliminar rol',
		});
	}
};

module.exports = {
	create,
	getAll,
	getById,
	update,
	remove,
};
