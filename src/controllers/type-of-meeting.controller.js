import { request, response } from 'express';
import { QueryTypes } from 'sequelize';

import { Meeting } from '../models/Meeting.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';
import { sequelize } from '../db/config.js';

export const create = async (req = request, res = response) => {
  const { name, idOrganization } = req.body;

  try {
    let dbToM = await TypeOfMeeting.findOne({
      where: { name, idOrganization: parseInt(idOrganization) }
    });

    if (dbToM) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe este Tipo de Reunión para esta Organización.'
      });
    }

    dbToM = await TypeOfMeeting.create({
      name,
      idOrganization: parseInt(idOrganization)
    });

    res.status(201).json({
      ok: true,
      msg: 'Tipo de Reunión creado.',
      arg: dbToM
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
  const { name, idOrganization } = req.body;

  try {
    const dbToM = await TypeOfMeeting.findOne({
      where: { name, idOrganization: parseInt(idOrganization) }
    });

    if (dbToM) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe este Tipo de Reunión para esta Organización.'
      });
    }

    await TypeOfMeeting.update(
      { name, idOrganization: parseInt(idOrganization) },
      { where: { id } }
    );

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

// XXX hacer bien el getAll aunque no hace falta
// export const getAll = async (req = request, res = response) => {
//   try {
//     const dbTypesOfMeetings = await sequelize.query(
//       `SELECT * FROM view_types_of_meetings`,
//       {
//         type: QueryTypes.SELECT
//       }
//     );

//     return res.json({
//       ok: true,
//       arg: dbTypesOfMeetings
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al listar los Tipos De Reuniones.'
//     });
//   }
// };

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbToM = await TypeOfMeeting.findByPk(id);

    if (!dbToM) {
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de Reunión no encontrado.'
      });
    }

    return res.json({
      ok: true,
      arg: dbToM
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Tipo de Reunión.'
    });
  }
};

export const getInfo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbToM = await TypeOfMeeting.findByPk(id);

    if (!dbToM) {
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de Reunión no encontrado.'
      });
    }

    const result = await sequelize.query(
      `
      SELECT fn_tom_getinfo(:id,'dbtom');
      FETCH ALL IN dbtom
      `,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT
      }
    );

    const tom = result[1];

    return res.json({
      ok: true,
      arg: tom
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar el Tipo de Reunión.'
    });
  }
};

// FIXME crear la function en la db
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

export const getAgendas = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbToM = await TypeOfMeeting.findByPk(id);
    const result = await dbToM.getAgendas();

    return res.json({ ok: true, arg: result });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener las Agendas.'
    });
  }
};

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbToM = await TypeOfMeeting.findByPk(parseInt(id));
    const name = `(removed) ${dbToM.name}`;

    await TypeOfMeeting.update({ name, state: false }, { where: { id } });

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
