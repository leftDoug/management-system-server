import { request, response } from 'express';

import { Meeting } from '../models/Meeting.js';
import { TypeOfMeeting } from '../models/TypeOfMeeting.js';
import { Agreement } from '../models/Agreement.js';
import { Worker } from '../models/Worker.js';
import { where } from 'sequelize';
import { WorkerArea } from '../models/WorkerArea.js';
import picocolors from 'picocolors';
import { WorkerMeeting } from '../models/WorkerMeeting.js';

const getDbTime = (dbTime, date) => {
  const [hours, minutes] = dbTime.split(':');
  const time = new Date(date);

  time.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10));

  return time;
};

const getTime = (date) => {
  const time = new Date(date);

  time.setSeconds(0);
  time.setMilliseconds(0);

  return time;
};

const checkConflictsx = async (
  newMeeting,
  dbMeetings,
  dbWorkersId,
  workers = false,
  idWorkers = null
) => {
  dbMeetings.forEach((meeting) => {
    const [year, month, day] = meeting.date.split('-');
    const dbDate = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10)
    );

    const dbStart = getDbTime(meeting.startTime, dbDate);
    // let [hours, minutes] = meeting.startTime.split(':');
    // const dbStart = new Date(dbDate);
    // dbStart.setHours(Number.parseInt(hours,10),Number.parseInt(minutes,10));
    // dbStart.setMinutes(Number.parseInt(minutes,10));

    const dbEnd = getDbTime(meeting.endTime, dbDate);
    // [hours, minutes] = meeting.endTime.split(':');
    // const dbEnd = new Date(dbDate);
    // dbEnd.setHours(Number.parseInt(hours,10),Number.parseInt(minutes,10));
    // dbEnd.setMinutes(Number.parseInt(minutes,10));

    const newStart = getTime(newMeeting.startTime);
    // const newStart = new Date(newMeeting.startTime);
    // newStart.setSeconds(0);
    // newStart.setMilliseconds(0);

    const newEnd = getTime(newMeeting.endTime);
    // const newEnd = new Date(newMeeting.endTime);
    // newEnd.setSeconds(0);
    // newEnd.setMilliseconds(0);

    const timeOverlap =
      (dbStart.getTime() <= newStart.getTime() &&
        dbEnd.getTime() >= newStart.getTime()) ||
      (dbStart.getTime() <= newEnd.getTime() &&
        dbEnd.getTime() >= newEnd.getTime()) ||
      (dbStart.getTime() <= newStart.getTime() &&
        dbEnd.getTime() >= newEnd.getTime()) ||
      (dbStart.getTime() >= newStart.getTime() &&
        dbEnd.getTime() <= newEnd.getTime());
    // const dbWorkers = await meeting.getWorkers();

    if (timeOverlap) {
      console.log(picocolors.bgRed(picocolors.bold('coincide la hora')));

      const hasCoincidence = dbWorkersId.some(
        (wm) =>
          wm.idMeeting === meeting.id && wm.idWorker === newMeeting.idSecretary
      );

      if (meeting.idSecretary === newMeeting.idSecretary || hasCoincidence) {
        console.log(
          picocolors.bgRed(picocolors.bold('coincide el secretario'))
        );

        // return res.status(400).json({
        //   ok: false,
        //   msg: 'El secretario de acta debe asistir a otra reunión en este horario.'
        // });
        return 'secretary';
      }

      // if (meeting.idSecretary === newMeeting.idSecretary) {
      //   console.log(
      //     picocolors.bgRed(picocolors.bold('coincide el secretario'))
      //   );

      //   // return res.status(400).json({
      //   //   ok: false,
      //   //   msg: 'El secretario de acta debe asistir a otra reunión en este horario.'
      //   // });
      //   resolve('secretary');
      // }

      if (workers) {
        console.log('tiene trabajadorese');

        // const coincidence = dbWorkers.find((worker) =>
        //   idWorkers.find((id) => id === worker.id)
        // );

        // const dbWorkersId = dbWorkers.map((worker) => worker.id);
        const hasCoincidence = dbWorkersId.some(
          (wm) => wm.idMeeting === meeting.id && idWorkers.include(wm.idWorker)
        );

        if (hasCoincidence) {
          console.log('coinciden los trabajadores');

          // return res.status(400).json({
          //   ok: false,
          //   msg: 'Existen trabajadores que deben asistir a otra reunión en este horario.'
          // });
          return 'workers';
        }
      } else {
        console.log(picocolors.bgRed(picocolors.bold('no tiene trabajadores')));

        // const typeOfMeeting = await meeting.getTypeOfMeeting();
        // FIXME ver si pueden coincidir reuniones del mismo tipo
        if (meeting.idTypeOfMeeting === newMeeting.idTypeOfMeeting) {
          console.log(
            picocolors.bgRed(picocolors.bold('coincide el tipo de reunion'))
          );

          // return res.status(400).json({
          //   ok: false,
          //   msg: 'Ya existe una Reunión de este Tipo que coincide con esta en el horario.'
          // });
          return 'type';
        }
      }
    } else {
      console.log('no coincide la hora');
      // FIXME ver si pueden coincidir reuniones de la misma sesion aunque sea extraordinaria (cambiar la comparacion a ordinaria solo)
      if (
        meeting.name === newMeeting.name &&
        meeting.session === newMeeting.session &&
        meeting.idTypeOfMeeting === newMeeting.idTypeOfMeeting
      ) {
        console.log('coincide el nombre con otra del mismo tipo y sesion');

        // return res.status(400).json({
        //   ok: false,
        //   msg: 'Ya existe una Reunión que coincide con esta en nombre, sesión, Tipo y fecha'
        // });
        return 'meeting';
      }
    }
  });

  return null;
};

const checkConflicts = (
  newMeeting,
  dbMeetings,
  dbWorkersId,
  workers = false,
  idWorkers = null
) => {
  for (const meeting of dbMeetings) {
    const [year, month, day] = meeting.date.split('-');
    let dbDate = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10)
    );

    const dbStart = getDbTime(meeting.startTime, dbDate);
    const dbEnd = getDbTime(meeting.endTime, dbDate);

    if (newMeeting.id) {
      const [year, month, day] = meeting.date.split('-');
      dbDate = new Date(
        Number.parseInt(year, 10),
        Number.parseInt(month, 10) - 1,
        Number.parseInt(day, 10)
      );
    }

    const newStart = newMeeting.id
      ? getTime(newMeeting.startTime)
      : getDbTime(newMeeting.startTime, dbDate);
    const newEnd = newMeeting.id
      ? getTime(newMeeting.endTime)
      : getDbTime(newMeeting.endTime, dbDate);

    const timeOverlap =
      (dbStart.getTime() <= newStart.getTime() &&
        dbEnd.getTime() >= newStart.getTime()) ||
      (dbStart.getTime() <= newEnd.getTime() &&
        dbEnd.getTime() >= newEnd.getTime()) ||
      (dbStart.getTime() <= newStart.getTime() &&
        dbEnd.getTime() >= newEnd.getTime()) ||
      (dbStart.getTime() >= newStart.getTime() &&
        dbEnd.getTime() <= newEnd.getTime());

    if (timeOverlap) {
      if (workers) {
        console.log('tiene trabajadorese');

        const workersConflict = dbWorkersId.some(
          (wm) => wm.idMeeting === meeting.id && idWorkers.include(wm.idWorker)
        );

        if (workersConflict) {
          console.log('coinciden los trabajadores');

          return 'workers';
        }
      } else {
        const hasCoincidence = dbWorkersId.some(
          (wm) =>
            wm.idMeeting === meeting.id &&
            wm.idWorker === newMeeting.idSecretary
        );

        if (meeting.idSecretary === newMeeting.idSecretary || hasCoincidence) {
          return 'secretary';
        }

        // FIXME ver si pueden coincidir reuniones del mismo tipo
        if (meeting.idTypeOfMeeting === newMeeting.idTypeOfMeeting) {
          return 'type';
        }
      }
    } else {
      if (!workers) {
        // FIXME ver si pueden coincidir reuniones de la misma sesion aunque sea extraordinaria (cambiar la comparacion a ordinaria solo). poner una solo para k no puedan exixtir reuniones con el mismo nombre el mismo dia
        if (
          meeting.name === newMeeting.name &&
          meeting.session === newMeeting.session &&
          meeting.idTypeOfMeeting === newMeeting.idTypeOfMeeting
        ) {
          return 'meeting';
        }
      }
    }
  }

  return null;
};

const getStringDate = (date) => {
  const tempDate = new Date(date);
  const YYYY = tempDate.getFullYear();
  const MM = (tempDate.getMonth() + 1).toString().padStart(2, '0');
  const DD = tempDate.getDate().toString().padStart(2, '0');

  return `${YYYY}-${MM}-${DD}`;
};

const getStringTime = (date) => {
  const tempDate = new Date(date);
  const hours = tempDate.getHours().toString().padStart(2, '0');
  const minutes = tempDate.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}:00`;
};

export const createx = (req = request, res = response) => {
  let {
    name,
    session,
    date,
    startTime,
    endTime,
    idTypeOfMeeting,
    idSecretary
  } = req.body;

  date = new Date(date);

  const YYYY = date.getFullYear();
  const MM = date.getMonth().toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  const fecha = `${YYYY}-${MM}-${DD}`;
  const [x, y, z] = fecha.split('-');

  console.log(picocolors.red(z));

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');
  const hora = `${hh}:${mm}:${ss}`;

  const salida = new Date(YYYY, Number.parseInt(MM), Number.parseInt(DD));

  console.log('date entrada:', picocolors.blue(picocolors.bold(date)));
  console.log('date salida:', picocolors.blue(picocolors.bold(salida)));
  console.log('fecha entrada:', picocolors.blue(picocolors.bold(fecha)));
  console.log('hora entrada:', picocolors.blue(picocolors.bold(hora)));
};

export const create = async (req = request, res = response) => {
  const {
    name,
    session,
    date,
    startTime,
    endTime,
    idTypeOfMeeting,
    idSecretary
  } = req.body;

  const newDate = getStringDate(date);
  const newStartTime = getStringTime(startTime);
  const newEndTime = getStringTime(endTime);
  const parsedTypeId = parseInt(idTypeOfMeeting, 10);
  const parsedSecretaryId = parseInt(idSecretary, 10);

  const newMeeting = {
    name,
    session,
    date,
    startTime,
    endTime,
    idTypeOfMeeting: parsedTypeId,
    idSecretary: parsedSecretaryId
  };

  try {
    const dbMeetings = await Meeting.findAll({ where: { date: newDate } });
    const dbWorkersId = [];

    dbMeetings.forEach(async (meeting) => {
      const workMeet = await WorkerMeeting.findAll({
        where: { idMeeting: meeting.id }
      });
      const idWorkers = workMeet.map((wm) => {
        wm.idMeeting, wm.idWorker;
      });

      dbWorkersId.push(idWorkers);
    });

    if (dbMeetings) {
      const conflict = checkConflicts(newMeeting, dbMeetings, dbWorkersId);

      switch (conflict) {
        case 'type':
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe una Reunión de este Tipo que coincide con esta en el horario.'
          });
        case 'secretary':
          return res.status(400).json({
            ok: false,
            msg: 'El secretario de acta debe asistir a otra reunión en este horario.'
          });
        case 'meeting':
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe una Reunión que coincide con esta en nombre, sesión, Tipo y fecha.'
          });
        default:
          break;
      }
    }

    await Meeting.create({
      name,
      session,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      idTypeOfMeeting: parsedTypeId,
      idSecretary: parsedSecretaryId
    });

    res.status(201).json({
      ok: true,
      msg: 'Reunión creada.'
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al crear la Reunión.'
    });
  }
};

export const addWorkers = async (req = request, res = response) => {
  const { id } = req.params;
  const { idWorkers } = req.body;

  try {
    const dbMeeting = await Meeting.findByPk(id);
    const dbMeetings = await Meeting.findAll({
      where: { date: dbMeeting.date }
    });
    const dbWorkersId = [];

    const filteredMeetings = dbMeetings.filter(
      (meeting) => dbMeeting.id !== meeting.id
    );

    filteredMeetings.forEach(async (meeting) => {
      const workMeet = await WorkerMeeting.findAll({
        where: { idMeeting: meeting.id }
      });
      const idWorkers = workMeet.map((wm) => {
        wm.idMeeting, wm.idWorker;
      });

      dbWorkersId.push(idWorkers);
    });

    if (filteredMeetings) {
      const conflict = checkConflicts(
        dbMeeting,
        filteredMeetings,
        dbWorkersId,
        true,
        idWorkers
      );
    }

    if (conflict) {
      return res.status(400).json({
        ok: false,
        msg: 'Existen trabajadores que deben asistir a otra reunión en este horario.'
      });
    }

    idWorkers.forEach(async (idWorker) => {
      await WorkerMeeting.create({ idMeeting: id, idWorker });
    });

    return res.json({
      ok: true,
      msg: 'Trabajadores agregados.'
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al agregar los trabajadores.'
    });
  }
};

export const update = async (req = request, res = response) => {
  const { id } = req.params;
  const {
    name,
    session,
    date,
    startTime,
    endTime,
    idTypeOfMeeting,
    idSecretary,
    state,
    workers
  } = req.body;

  try {
    const dbMeetings = await Meeting.findAll({ where: { date } });
    // const dbTypeOfMeeting = await TypeOfMeeting.findByPk(idTypeOfMeeting);
    debugger;
    if (dbMeetings.length >= 1) {
      // for (let index = 0; index < dbMeetings.length; index++) {
      //   const element = dbMeetings[index];
      //   const dbStart = new Date(element.startTime);
      //   const dbEnd = new Date(element.endTime);
      //   const newStart = new Date(startTime);
      //   const newEnd = new Date(endTime);

      //   if (
      //     (dbStart.getTime() <= newStart.getTime() &&
      //       dbEnd.getTime() >= newStart.getTime()) ||
      //     (dbStart.getTime() <= newEnd.getTime() &&
      //       dbEnd.getTime() >= newEnd.getTime())
      //   ) {
      //     const typeOfMeeting = await TypeOfMeeting.findByPk(
      //       element.idTypeOfMeeting
      //     );

      //     if (dbTypeOfMeeting.idArea === typeOfMeeting.idArea) {
      //       return res.status(400).json({
      //         ok: false,
      //         msg: 'Ya existe una reunión que coincide con esta en horario y área'
      //       });
      //     }
      //   }

      //   if (
      //     element.name === name &&
      //     element.session === session &&
      //     element.idTypeOfMeeting === idTypeOfMeeting
      //   ) {
      //     return res.status(400).json({
      //       ok: false,
      //       msg: 'Ya existe una reunión que coincide con esta en nombre, sesión, tipo y fecha'
      //     });
      //   }
      // }

      checkConflicts(
        dbMeetings,
        name,
        session,
        startTime,
        endTime,
        idTypeOfMeeting,
        idSecretary,
        workers
      );
    }

    // if ((dbMeetings.length === 1 && dbMeetings[0].id === id)||!dbMeetings) {
    const dbMeeting = await Meeting.findByPk(id);

    dbMeeting.update({
      name,
      session,
      date,
      startTime,
      endTime,
      idTypeOfMeeting,
      idSecretary,
      state
    });

    return res.json({
      ok: true,
      msg: 'Reunion actualizada.'
    });
    // }

    // await Meeting.update(
    //   {
    //     name,
    //     session,
    //     date,
    //     startTime,
    //     endTime,
    //     idTypeOfMeeting,
    //     idSecretary,
    //     state
    //   },
    //   { where: { id } }
    // );

    // return res.json({
    //   ok: true,
    //   msg: 'Reunión actualizada'
    // });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar la Reunión.'
    });
  }
};

export const getAll = async (req = request, res = response) => {
  try {
    const dbMeetings = await Meeting.findAll();

    return res.json({
      ok: true,
      arg: dbMeetings
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al listar las Reuniones.'
    });
  }
};

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // FIXME: revisar que el alias en esta tabla es 'types_of_meeting'
    const dbMeeting = await Meeting.findByPk(id);

    if (!dbMeeting) {
      return res.status(404).json({
        ok: false,
        msg: 'Reunión no encontrada.'
      });
    }

    return res.json({
      ok: true,
      arg: dbMeeting
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar la Reunión.'
    });
  }
};

export const getAgreements = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbMeeting = await Meeting.findByPk(id);
    const dbAgreements = await dbMeeting.getAgreements();
    // const dbAgreements = await Agreement.findAll({ where: { idMeeting: id } });

    res.json({
      ok: true,
      arg: dbAgreements
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Acuerdos.'
    });
  }
};
