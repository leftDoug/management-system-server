import { request, response } from 'express';

import { Area } from '../models/Area.js';

export const getAll = async (req = request, res = response) => {
  // XXX activarlo para saber de donde viene la request
  // const origin = req.header('origin');

  // console.log(pc.blue(pc.bold('ORIGIN:')), pc.bgBlue(pc.bold(origin)));

  try {
    const dbAreas = await Area.findAll();

    return res.json({
      ok: true,
      arg: dbAreas
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar las Áreas.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbArea = await Area.findByPk(id);

    return res.json({
      ok: true,
      arg: dbArea
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Área.'
    });
  }
};

export const create = async (req = request, res = response, next) => {
  const { name } = req.body;

  try {
    const dbArea = await Area.findOne({ where: { name } });

    if (dbArea) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Área con este nombre.'
      });
    }

    await Area.create({ name });

    return res.status(201).json({
      ok: true,
      msg: 'Área creada correctamente.'
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next(err);
    } else {
      console.error(err);

      return res.status(500).json({
        ok: false,
        msg: 'Error al crear el Área.'
      });
    }
  }
};

export const update = async (req = request, res = response, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const dbArea = await Area.findOne({ where: { name } });

    if (dbArea && dbArea.id !== id) {
      return res.status(400).json({
        ok: true,
        msg: 'Ya existe un Área con ese nombre.'
      });
    }

    await Area.update({ name }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Área actualizada correctamente.'
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next(err);
    } else {
      console.error(err);

      return res.status(500).json({
        ok: false,
        msg: 'Error al actualizar el Área.'
      });
    }
  }
};

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Area.update({ state: false }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Área eliminada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el Área.'
    });
  }
};

export const getWorkers = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbArea = await Area.findByPk(id);
    const dbWorkers = await dbArea.getUsers();

    res.json({
      ok: true,
      arg: dbWorkers
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Trabajadores.'
    });
  }
};
