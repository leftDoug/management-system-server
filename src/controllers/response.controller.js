import { request, response } from 'express';

import { Response } from '../models/Response.js';

export const create = async (req = request, res = response) => {
  const { content, idAgreement } = req.body;

  try {
    await Response.create({ content, idAgreement });

    return res.status(201).json({
      ok: true,
      msg: 'Respuesta agregada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al agregar la Respuesta.'
    });
  }
};

export const validate = async (req = request, res = response) => {
  const { id } = req.params;
  const { valid } = req.body;

  try {
    const dbResponse = await Response.findByPk(id);

    dbResponse.update({ valid });
    return res.status(201).json({
      ok: true,
      msg: 'Respuesta revisada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al revisar la Respuesta.'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  try {
    const dbResponses = await Response.findAll();

    return res.json({
      ok: true,
      arg: dbResponses
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar las Respuestas.'
    });
  }
};
