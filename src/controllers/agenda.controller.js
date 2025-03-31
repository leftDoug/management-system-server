import { request, response } from 'express';

import { Agenda } from '../models/Agenda.js';
import { Topic } from '../models/Topic.js';

export const create = async (req = request, res = response) => {
  const { year, idTypeOfMeeting, topics } = req.body;

  if (topics.length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'La Agenda debe contener al menos un Tema.'
    });
  }

  try {
    let dbAgenda = await Agenda.findOne({
      where: { year, idTypeOfMeeting }
    });

    if (dbAgenda) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Agenda creada para este Tipo de Reunión este año.'
      });
    }

    dbAgenda = await Agenda.create({ year, idTypeOfMeeting });

    await Topic.bulkCreate(
      topics.map((topic) => ({
        name: topic.name,
        month: new Date(topic.month).getMonth(),
        idAgenda: dbAgenda.id
      }))
    );

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
  const { year, topics, idTypeOfMeeting } = req.body;

  try {
    let dbAgenda = await Agenda.findOne({
      where: { year, idTypeOfMeeting }
    });

    if (dbAgenda && dbAgenda.id !== parseInt(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Agenda creada para este Tipo de Reunión este año.'
      });
    }

    dbAgenda = await Agenda.findByPk(id, { include: Topic });

    topics.forEach(async (topic) => {
      if (isNaN(topic.id) && topic.id) {
        await Topic.create({
          name: topic.name,
          month: new Date(topic.month).getMonth(),
          idAgenda: dbAgenda.id
        });
      } else {
        const found = dbAgenda.topics.some(
          (t) =>
            t.id === parseInt(topic.id) &&
            (t.name !== topic.name ||
              t.motnth !== new Date(topic.month).getMonth())
        );

        if (found) {
          await Topic.update(
            {
              name: topic.name,
              month: new Date(topic.month).getMonth()
            },
            { where: { id: topic.id } }
          );
        }
      }
    });

    dbAgenda.topics.forEach(async (topic) => {
      if (!topics.some((t) => parseInt(t.id) === topic.id)) {
        await Topic.destroy({ where: { id: topic.id } });
      }
    });

    if (dbAgenda.year !== parseInt(year)) {
      await Agenda.update({ year }, { where: { id } });
    }

    res.status(201).json({
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
    let agendas = [];

    dbAgendas.forEach((agenda) => {
      const yearDate = new Date(`01/01/${agenda.year}`);

      agendas.push({
        id: agenda.id,
        year: agenda.year,
        idTypeOfMeeting: agenda.idTypeOfMeeting
      });
    });

    return res.json({
      ok: true,
      arg: agendas
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

    const agenda = {
      id: dbAgenda.id,
      year: new Date(`01/01/${dbAgenda.year}`),
      idTypeOfMeeting: dbAgenda.idTypeOfMeeting
    };

    return res.json({
      ok: true,
      arg: agenda
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar la Agenda.'
    });
  }
};

export const getInfo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbAgenda = await Agenda.findByPk(id, { include: Topic });

    if (!dbAgenda) {
      return res.status(404).json({
        ok: false,
        msg: 'Agenda no encontrada.'
      });
    }

    dbAgenda.topics.forEach((topic) => {
      topic.month = new Date(`${topic.month + 1}/01/${dbAgenda.year}`);
    });

    dbAgenda.year = new Date(`01/01/${dbAgenda.year}`);

    // const agenda = {
    //   id: dbAgenda.id,
    //   year: new Date(`01/01/${dbAgenda.year}`),
    //   idTypeOfMeeting: dbAgenda.idTypeOfMeeting
    // };

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

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbAgenda = await Agenda.findByPk(parseInt(id));
    const name = `(removed) ${dbAgenda.name}`;

    await dbAgenda.update({ name, state: false });

    // await Agenda.update({ name, state: false }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Agenda eliminada'
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la Agenda'
    });
  }
};

export const erase = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Agenda.destroy({ where: { id: parseInt(id) } });

    return res.json({
      ok: true,
      msg: 'Agenda borrada'
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al borrar la Agenda'
    });
  }
};
