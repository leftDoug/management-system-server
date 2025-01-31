// const { request, response } = require('express');
// const Area = require('../models/Area');

import { request, response } from 'express';
import { Area } from '../models/Area.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';
import { Worker } from '../models/Worker.js';
import { sequelize } from '../db/config.js';
import { QueryTypes } from 'sequelize';
import pc from 'picocolors';

export const create = async (req = request, res = response) => {
  const { name } = req.body;

  try {
    let dbArea = await Area.findOne({ where: { name } });

    if (dbArea) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un área con este nombre'
      });
    }

    dbArea = await Area.create({ name });

    return res.status(201).json({
      ok: true,
      msg: 'Área creada correctamente'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al crear el área'
    });
  }
};

export const update = async (req = request, res = response) => {
  const { id, name, state } = req.body;

  try {
    await Area.update({ name, state }, { where: { id } });

    return res.json({
      ok: true,
      msg: 'Área actualizada correctamente'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el área'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  const origin = req.header('origin');
  console.log(pc.bgBlue(pc.bold(origin)));
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
      msg: 'Error al listar las áreas'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const dbArea = await Area.findByPk(id);

    if (!dbArea) {
      return res.status(404).json({
        ok: false,
        msg: 'Área no encontrada'
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
      msg: 'Error al buscar el área'
    });
  }
};

export const getToM = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbToM = await TypeOfMeeting.findAll({ where: { idArea: id } });

    res.json({
      ok: true,
      arg: dbToM
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los tipos de reuniones'
    });
  }
};

export const getWorkers = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // const dbArea = await Area.findByPk(id);
    const dbWorkers = [];
    const result = await sequelize.query(
      `
			select fn_area_getworkers('${id}', 'cur_workers');
			fetch all in cur_workers;
			`,
      {
        type: QueryTypes.SELECT
      }
    );

    for (let index = 1; index < result.length; index++) {
      dbWorkers.push(result[index]);
    }

    res.json({
      ok: true,
      arg: dbWorkers
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los trabajadores'
    });
  }
};

// const getAllWorkers=async(req=request,res=response)=>{
// 	const id=req.params.id

// 	const wa=await
// }

// module.exports = {
// 	createArea,
// 	updateArea,
// 	getAllAreas,
// 	getByIdArea,
// };
