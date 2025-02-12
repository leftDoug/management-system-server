import { request, response } from 'express';

import { Agenda } from '../models/Agenda.js';

export const create = async (req = request, res = response) => {
  const { year, idArea } = req.body;
  const date = new Date(year);

  date.setMonth(0);
  date.setDate(1);

  try {
    const dbAgenda = await Agenda.findOne({ where: { year: date, idArea } });

    if (dbAgenda) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Agenda creada para esta Área en este año.'
      });
    }

    await Agenda.create({ year: date, idArea });

    res.status(201).json({
      ok: true,
      msg: 'Agenda creada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al crear la Agenda.'
    });
  }
};

export const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { year, idArea } = req.body;
  const date = new Date(year);

  date.setMonth(0);
  date.setDate(1);

  try {
    const dbAgenda = await Agenda.findOne({ where: { year: date, idArea } });

    if (dbAgenda && dbAgenda.id !== id) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Agenda creada para esta Área en este año.'
      });
    }

    await Agenda.update({ year: date, idArea }, { where: { id } });

    // ver como funciona bien lo del topic, xk si se crea puede ser de 2 maneras:
    // se crea sin idAgenda y luego con el add se le asigna, o se crea con idAgenda
    // a la hora de editar se hace x el topic.controller, pero hay k pasarle el
    // idAgenda
    // hay k probar como funciona lo de crear de la 1ra manera en postman

    return res.json({
      ok: true,
      msg: 'Agenda actualizada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar la Agenda.'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  try {
    const dbAgendas = await Agenda.findAll();

    return res.json({
      ok: true,
      arg: dbAgendas
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar las Agendas.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbAgenda = await Agenda.findByPk(id);

    if (!dbAgenda) {
      return res.status(404).json({
        ok: false,
        msg: 'Agenda no encontrada.'
      });
    }

    return res.json({
      ok: true,
      arg: dbAgenda
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar la Agenda.'
    });
  }
};

export const getTopics = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbAgenda = await Agenda.findByPk(id);

    if (!dbAgenda) {
      return res.status(404).json({
        ok: false,
        msg: 'Agenda no encontrada.'
      });
    }

    const dbTopics = await dbAgenda.getTopics();

    if (!dbTopics) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontraron Temas en la Agenda.'
      });
    }

    return res.status(200).json({
      ok: true,
      args: dbTopics
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar los Temas de la Agenda'
    });
  }
};
