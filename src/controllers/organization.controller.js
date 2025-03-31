import { request, response } from 'express';

import { Organization } from '../models/Organization.js';
import { sequelize } from '../db/config.js';
import { QueryTypes, where } from 'sequelize';
import { OrganizationMember } from '../models/OrganizationMember.js';
import picocolors from 'picocolors';
import { User } from '../models/User.js';

export const getAll = async (req = request, res = response) => {
  try {
    const dbOrganizations = await sequelize.query(
      `
      SELECT * FROM view_organizations
      `,
      {
        type: QueryTypes.SELECT
      }
    );

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

export const getInfoX = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbOrganization = await Organization.findByPk(id, { include: User });

    const organization = {
      id: dbOrganization.id,
      name: dbOrganization.name,
      leader: {
        id: dbOrganization.user.id,
        name: dbOrganization.user.name
      }
    };

    return res.json({
      ok: true,
      arg: organization
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener la información de la Organización'
    });
  }
};

export const getInfo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const result = await sequelize.query(
      `
      SELECT fn_organization_getinfo(:id,'dborg');
      FETCH ALL IN dborg
      `,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT
      }
    );

    const organization = result[1];

    return res.json({
      ok: true,
      arg: organization
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
    let dbOrganization = await Organization.findOne({ where: { name } });

    if (dbOrganization) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una Organización con este nombre.'
      });
    }

    dbOrganization = await Organization.create({ name, idLeader });

    return res.status(201).json({
      ok: true,
      id: dbOrganization.id,
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

    if (dbOrganization && dbOrganization.id !== parseInt(id)) {
      return res.status(400).json({
        ok: false,
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

export const erase = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Organization.destroy({ where: { id } });

    return res.json({
      ok: true,
      msg: 'Organización borrada.'
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
    const result = await sequelize.query(
      `
      			SELECT fn_organization_getworkers(:id, 'dbworkers');
            FETCH ALL IN dbworkers;
      			`,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT
      }
    );

    const dbWorkers = result.slice(1);
    // const [, ...dbWorkers] = result;

    return res.json({
      ok: true,
      arg: dbWorkers
    });

    // const dbOrganization = await Organization.findByPk(id);
    // const dbWorkers = await dbOrganization.getUsers();

    // return res.json({
    //   ok: true,
    //   arg: dbWorkers
    // });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Trabajadores.'
    });
  }
};

export const addWorkers = async (req = request, res = response) => {
  const { id } = req.params;
  const { workersId } = req.body;
  try {
    workersId.forEach(async (worker) => {
      await OrganizationMember.create({ idOrganization: id, idMember: worker });
    });

    return res.json({
      ok: true,
      msg: 'Trabajadores agregados.'
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al agregar los Trabajadores.'
    });
  }
};

export const updateWorkers = async (req = request, res = response) => {
  const { id } = req.params;
  const { workersId } = req.body;
  try {
    const dbWorkers = await OrganizationMember.findAll({
      where: { idOrganization: id }
    });

    workersId.forEach(async (worker) => {
      !dbWorkers.some((w) => {
        w.id === worker.id;
      }) &&
        (await OrganizationMember.create({
          idOrganization: id,
          idMember: worker
        }));
    });

    dbWorkers.forEach((worker) => {
      !workersId.some((w) => {
        w.id === worker.id;
      }) && worker.destroy();
    });

    return res.json({
      ok: true,
      msg: 'Lista de Trabajadores actualizada.'
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar la lista de Trabajadores.'
    });
  }
};

export const getToMs = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const result = await sequelize.query(
      `
      SELECT * FROM fn_organization_gettoms(:id,'dbtoms');
      FETCH ALL IN dbtoms;
      `,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT
      }
    );

    const dbToMs = result.slice(1);

    return res.json({
      ok: true,
      arg: dbToMs
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Tipos de Reunión.'
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
