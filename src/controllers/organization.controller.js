import { request, response } from 'express';

import { Organization } from '../models/Organization.js';

export const getAll = async (req = request, res = response) => {
  try {
    const dbOrganizations = await Organization.findAll();

    return res.json({
      ok: true,
      arg: dbOrganizations
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar las Organizaciones.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbOrganization = await Organization.findByPk(id);

    return res.json({
      ok: true,
      arg: dbOrganization
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar la Organización.'
    });
  }
};

export const create = async (req = request, res = response, next) => {
  const { name, idLeader } = req.body;

  try {
    const dbOrganization = await Organization.findOne({ where: { name } });

    if (dbOrganization) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Organización con este nombre.'
      });
    }

    await Organization.create({ name, idLeader });

    return res.status(201).json({
      ok: true,
      msg: 'Organización creada correctamente.'
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next(err);
    } else {
      console.error(err);

      return res.status(500).json({
        ok: false,
        msg: 'Error al crear la Organizoción.'
      });
    }
  }
};

export const update = async (req = request, res = response, next) => {
  const { id } = req.params;
  const { name, idLeader } = req.body;

  try {
    const dbOrganization = await Organization.findOne({ where: { name } });

    if (dbOrganization && dbOrganization.id !== id) {
      return res.status(400).json({
        ok: true,
        msg: 'Ya existe una Organización con ese nombre.'
      });
    }

    await Organization.update({ name, idLeader }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Organización actualizada correctamente.'
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next(err);
    } else {
      console.error(err);

      return res.status(500).json({
        ok: false,
        msg: 'Error al actualizar la Organización.'
      });
    }
  }
};

export const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Organization.update({ state: false }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Organización eliminada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la Organización.'
    });
  }
};

export const getWorkers = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbOrganization = await Organization.findByPk(id);
    const dbWorkers = await dbOrganization.getUsers();

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

// export const removeAll = async (req, res) => {
//   try {
//     await Area.truncate();

//     return res.json({
//       ok: true,
//       msg: 'Áreas eliminadas.'
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
