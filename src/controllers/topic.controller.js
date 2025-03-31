import { request, response } from 'express';

import { Topic } from '../models/Topic.js';
import { Agenda } from '../models/Agenda.js';

export const create = async (req = request, res = response) => {
  const { name, monthDate, idAgenda } = req.body;
  const date = new Date(monthDate);
  const month = date.getMonth();

  try {
    const dbTopic = await Topic.findOne({
      where: { name, month, idAgenda }
    });

    if (dbTopic) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Tema con el mismo nombre este mes.'
      });
    }

    await Topic.create({ name, month, idAgenda });

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

export const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, monthDate, idAgenda } = req.body;
  const date = new Date(monthDate);
  const month = date.getMonth();

  try {
    let dbTopic = await Topic.findOne({
      where: { name, month, idAgenda }
    });

    if (dbTopic) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Tema con el mismo nombre este mes.'
      });
    }

    dbTopic = await Topic.findByPk(id);

    await Topic.update({ name, month }, { where: { id } });

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

// XXX hacer bien el getAll aunque no se necesita
// export const getAll = async (req = request, res = response) => {
//   try {
//     const dbTopics = await Topic.findAll();

//     return res.json({
//       ok: true,
//       arg: dbTopics
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al listar los Temas.'
//     });
//   }
// };

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

    const dbAgenda = await Agenda.findByPk(dbTopic.idAgenda);
    const topic = {
      id,
      monthDate: new Date(`01/${dbTopic.month}/${dbAgenda.year}`),
      idAgenda: dbTopic.idAgenda
    };

    return res.json({
      ok: true,
      arg: topic
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Tema.'
    });
  }
};

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Topic.destroy({ where: { id } });

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

export const eraseAll = async (req = request, res = response) => {
  const { idAgenda } = req.params;

  try {
    await Topic.destroy({ where: { idAgenda } });

    return res.json({
      ok: true,
      msg: 'Temas borrados.'
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al borrar los Temas.'
    });
  }
};
