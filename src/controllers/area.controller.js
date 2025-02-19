// const { request, response } = require('express');
// const Area = require('../models/Area');

import { request, response } from 'express';
import { Area } from '../models/Area.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';
import { sequelize } from '../db/config.js';
import { QueryTypes, where } from 'sequelize';
import pc from 'picocolors';

export const create = async (req = request, res = response) => {
  const { name } = req.body;

  try {
    const dbArea = await Area.findOne({ where: { name } });

    if (dbArea) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un área con este nombre.'
      });
    }

    await Area.create({ name });

    return res.status(201).json({
      ok: true,
      msg: 'Área creada correctamente.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al crear el Área.'
    });
  }
};

export const update = async (req = request, res = response) => {
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
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el área.'
    });
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

export const getAll = async (req = request, res = response) => {
  const origin = req.header('origin');

  console.log(pc.blue(pc.bold('ORIGIN:')), pc.bgBlue(pc.bold(origin)));

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

    if (!dbArea) {
      return res.status(404).json({
        ok: false,
        msg: 'Área no encontrada.'
      });
    }

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

export const getTypesOfMeetings = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbArea = await Area.findByPk(id, {
      include: [
        {
          model: TypeOfMeeting,
          as: 'types_of_meetings'
        }
      ]
    });
    const dbTypesOfMeetings = dbArea.types_of_meetings;

    res.json({
      ok: true,
      arg: dbTypesOfMeetings
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Tipos de Reuniones.'
    });
  }
};

export const getWorkers = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbArea = await Area.findByPk(id);
    const dbWorkers = await dbArea.getWorkers();

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
