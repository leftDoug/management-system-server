import { request, response } from 'express';

import { Topic } from '../models/Topic.js';

export const create = async (req = request, res = response) => {
  const { name, month, idAgenda } = req.body;
  const date = new Date(month);

  date.setDate(1);

  try {
    const dbTopic = await Topic.findOne({
      where: { name, month: date, idAgenda }
    });

    if (dbTopic) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Tema con el mismo nombre este mes en la Agenda.'
      });
    }

    await Topic.create({ name, month: date, idAgenda });

    return res.status(201).json({
      ok: true,
      msg: 'Tema agregado.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al agregar el Tema.'
    });
  }
};

// comprobar si el tema fue tratado ya en alguna reunion
export const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, month, idAgenda } = req.body;
  const date = new Date(month);

  date.setDate(1);

  try {
    let dbTopic = await Topic.findOne({
      where: { name, month: date, idAgenda }
    });

    if (dbTopic) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Tema con el mismo nombre este mes en la Agenda.'
      });
    }

    dbTopic = await Topic.findByPk(id);

    await Topic.update({ name, month: date }, { where: { id } });

    return res.status(201).json({
      ok: true,
      msg: 'Tema actualizado.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el Tema.'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  try {
    const dbTopics = await Topic.findAll();

    return res.json({
      ok: true,
      arg: dbTopics
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar los Temas.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const dbTopic = await Topic.findByPk(id);

    if (!dbTopic) {
      return res.status(404).json({
        ok: false,
        msg: 'Tema no encontrado.'
      });
    }

    return res.json({
      ok: true,
      arg: dbTopic
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Tema.'
    });
  }
};

// comprobar si el tema ha sido tratado en alguna reunion
export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Topic.update({ state: false }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Tema eliminado.'
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el Tema.'
    });
  }
};
