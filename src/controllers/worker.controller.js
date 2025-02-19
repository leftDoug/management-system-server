// // const { request, response } = require('express');
// // const Worker = require('../models/Worker');
// // const Area = require('../models/Area');

// import { request, response } from 'express';

// import { Area } from '../models/Area.js';
// import { Worker } from '../models/Worker.js';
// import { Agreement } from '../models/Agreement.js';
// import { WorkerArea } from '../models/WorkerArea.js';

// export const create = async (req = request, res = response) => {
//   const { name, occupation, email, idAreas } = req.body;
//   debugger;
//   try {
//     const exists = await Worker.findOne({ where: { email } });

//     if (exists) {
//       return res.status(400).json({
//         ok: false,
//         msg: 'Ya existe un Trabajador con este email.'
//       });
//     }

//     const dbWorker = await Worker.create({
//       name,
//       occupation,
//       email
//     });

//     idAreas.forEach(async (item) => {
//       const dbArea = await Area.findByPk(item);

//       await dbWorker.addArea(dbArea);
//     });

//     return res.status(201).json({
//       ok: true,
//       msg: 'Trabajador creado.'
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al crear el Trabajador.'
//     });
//   }
// };

// export const update = async (req = request, res = response) => {
//   const { id } = req.params;
//   const { name, occupation, email, idAreas } = req.body;
//   debugger;
//   try {
//     const exists = await Worker.findOne({ where: { email } });

//     if (exists && exists.id !== id) {
//       return res.status(400).json({
//         ok: false,
//         msg: 'Ya existe un Trabajador con este email.'
//       });
//     }

//     const dbWorker = await Worker.findByPk(id);
//     const dbAreas = await dbWorker.getAreas();

//     await Worker.update({ name, occupation, email }, { where: { id } });
//     // await dbWorker.update({ name, occupation, email });

//     idAreas.forEach(async (item) => {
//       let dbArea = dbAreas.find((area) => area.id === item);

//       if (!dbArea) {
//         dbArea = await Area.findByPk(item);

//         dbWorker.addArea(dbArea);
//       }
//     });

//     dbAreas.forEach(async (area) => {
//       const dbArea = idAreas.find((item) => item === area.id);

//       if (!dbArea) {
//         await WorkerArea.destroy({ where: { idArea: area.id, idWorker: id } });
//       }
//     });

//     return res.json({
//       ok: true,
//       msg: 'Trabajador actualizado.'
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al actualizar el trabajador.'
//     });
//   }
// };

// export const getAll = async (req = request, res = response) => {
//   try {
//     const dbWorkers = await Worker.findAll();

//     return res.json({
//       ok: true,
//       arg: dbWorkers
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al listar los Trabajadores.'
//     });
//   }
// };

// export const getAreas = async (req = request, res = response) => {
//   const { id } = req.params;

//   try {
//     const dbWorker = await Worker.findByPk(id);
//     const dbAreas = await dbWorker.getAreas();

//     return res.json({
//       ok: true,
//       arg: dbAreas
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al listar las Áreas del Trabajador.'
//     });
//   }
// };

// export const getById = async (req = request, res = response) => {
//   const { id } = req.params;

//   try {
//     const dbWorker = await Worker.findByPk(id);

//     if (!dbWorker) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'Trabajador no encontrado.'
//       });
//     }

//     return res.json({
//       ok: true,
//       arg: dbWorker
//     });
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al buscar el Trabajador.'
//     });
//   }
// };

// export const remove = async (req = request, res = response) => {
//   const { id } = req.params;

//   try {
//     await Worker.update({ state: false }, { where: { id } });

//     return res.json({
//       ok: true,
//       msg: 'Trabajador eliminado.'
//     });
//   } catch (err) {
//     console.log(err);

//     return res.status(500).json({
//       ok: false,
//       msg: 'Error al eliminar el Trabajador.'
//     });
//   }
// };

// // export const getAgreements = async (req = request, res = response) => {
// //   const { id } = req.params;

// //   try {
// //     const dbAgreements = await Agreement.findAll({
// //       where: { idResponsible: id }
// //     });

// //     res.json({
// //       ok: true,
// //       arg: dbAgreements
// //     });
// //   } catch (error) {
// //     console.error(error);

// //     res.status(500).json({
// //       ok: false,
// //       msg: 'Error al listar los acuerdos'
// //     });
// //   }
// // };
