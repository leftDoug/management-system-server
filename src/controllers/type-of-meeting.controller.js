import { request, response } from 'express';
import { QueryTypes } from 'sequelize';

import { Meeting } from '../models/Meeting.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';
import { sequelize } from '../db/config.js';

const checkConflicts = (dbToM, idArea) => {
  const exists = dbToM.find((tom) => tom.idArea === idArea);

  if (exists) {
    return res.status(400).json({
      ok: false,
      msg: 'Ya existe un Tipo de Reunion con la misma frecuencia y nombre en esta Área.'
    });
  }
};

export const create = async (req = request, res = response) => {
  const { name, frequency, idArea } = req.body;

  try {
    const dbToM = await TypeOfMeeting.findAll({ where: { name, frequency } });

    if (dbToM) {
      const exists = dbToM.find((tom) => tom.idArea === idArea);

      if (exists) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un Tipo de Reunion con la misma frecuencia y nombre en esta Área.'
        });
      }
    }

    await TypeOfMeeting.create({ name, frequency, idArea });

    res.status(201).json({
      ok: true,
      msg: 'Tipo de Reunión creado.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al crear el Tipo de Reunión.'
    });
  }
};

export const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, frequency, idArea } = req.body;

  try {
    const dbToM = await TypeOfMeeting.findAll({ where: { name, frequency } });

    if (dbToM) {
      const exists = dbToM.find((tom) => tom.idArea === idArea);

      if (exists) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un Tipo de Reunion con la misma frecuencia y nombre en esta Área.'
        });
      }
    }

    await TypeOfMeeting.update({ name, frequency, idArea }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Tipo de Reunión actualizado.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el Tipo de Reunión.'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  try {
    const dbTypesOfMeetings = await sequelize.query(
      `SELECT * FROM view_types_of_meetings`,
      {
        type: QueryTypes.SELECT
      }
    );

    return res.json({
      ok: true,
      arg: dbTypesOfMeetings
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar los Tipos De Reuniones.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbTypeOfMeeting = await TypeOfMeeting.findByPk(id);

    if (!dbTypeOfMeeting) {
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de Reunión no encontrado.'
      });
    }

    return res.json({
      ok: true,
      arg: dbTypeOfMeeting
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Tipo de Reunión.'
    });
  }
};

export const getMeetings = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbMeetings = await Meeting.findAll({
      where: { idTypeOfMeeting: id }
    });

    res.json({
      ok: true,
      arg: dbMeetings
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las Reuniones.'
    });
  }
};

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await TypeOfMeeting.update({ state: false }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Tipo de Reunión eliminado.'
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el Tipo de Reunión.'
    });
  }
};
