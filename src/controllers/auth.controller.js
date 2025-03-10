import bcrypt from 'bcryptjs';
import pc from 'picocolors';
import { QueryTypes } from 'sequelize';
import { request, response } from 'express';

import { generateJWT } from '../helpers/jwt.js';
import { sequelize } from '../db/config.js';

import { User } from '../models/User.js';

// FIXME arreglar los mensajes de error para usuario o contrasena incorrecta
export const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const dbUser = await User.findOne({ where: { username } });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario incorrecto'
      });
    }

    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    const token = await generateJWT(dbUser.id, username);

    // XXX ver como se puede mandar el token a la cache
    return res.json({
      ok: true,
      id: dbUser.id,
      username,
      token: token
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      ok: false,
      msg: 'Error al iniciar sesión'
    });
  }
};

export const register = async (req = request, res = response, next) => {
  const { name, occupation, email, idArea, username, password, idRole } =
    req.body;

  try {
    let user = await User.findOne({ where: { username } });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Este nombre de usuario ya está en uso.'
      });
    }

    user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Este correo ya está en uso.'
      });
    }

    const users = await User.findAll({ where: { name } });
    const coincidence = users.some(
      (user) => user.occupation === occupation && user.idArea === idArea
    );

    if (coincidence) {
      return res.status(400).json({
        ok: false,
        msg: 'Este trabajador ya tiene un Usuario creado.'
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync();
    const pwd = bcrypt.hashSync(password, salt);
    // XXX ver si es mejor lo de hashear la pwd en el modelo directamente
    user = await User.create({
      name,
      occupation,
      email,
      idArea,
      username,
      password: pwd,
      idRole
    });

    // XXX se quito el token de la  respuesta xk no va
    // const token = await generateJWT(user.id, username);

    await user.save();

    return res.status(201).json({
      ok: true,
      msg: 'Usuario creado correctamente.'
      // token
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next(err);
    } else {
      console.error(err);

      return res.status(500).json({
        ok: false,
        msg: 'Error al crear el Usuario.'
      });
    }
  }
};

// XXX falta testear esta funcion
export const tokenRenewal = async (req = request, res = response) => {
  const { id, username } = req;

  const token = await generateJWT(id, username);

  const dbUser = await User.findByPk(id);

  return res.json({
    ok: true,
    id,
    idWorker: dbUser.idWorker,
    token
  });
};

export const update = async (req = request, res = response, next) => {
  const { id } = req.params;
  const {
    name,
    occupation,
    email,
    idArea,
    username,
    oldPassword,
    newPassword,
    idRole
  } = req.body;

  try {
    const dbUser = await User.findByPk(id);
    let user = await User.findOne({ where: { username } });

    if (user && user.id !== id) {
      return res.status(400).json({
        ok: false,
        msg: 'Este nombre de usuario ya está en uso.'
      });
    }

    user = await User.findOne({ where: { email } });

    if (user && user.id !== id) {
      return res.status(400).json({
        ok: false,
        msg: 'Este correo ya está en uso.'
      });
    }

    const users = await User.findAll({ where: { name } });
    const coincidence = users.some(
      (user) =>
        user !== dbUser &&
        user.occupation === occupation &&
        user.idArea === idArea
    );

    if (coincidence) {
      return res.status(400).json({
        ok: false,
        msg: 'Este trabajador ya tiene un Usuario creado.'
      });
    }

    const validPassword = bcrypt.compareSync(oldPassword, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña debe tener 6 caracteres o más.'
      });
    }

    const salt = bcrypt.genSaltSync();

    const newHashedPassword = bcrypt.hashSync(newPassword, salt);

    await User.update(
      {
        name,
        occupation,
        email,
        idArea,
        username,
        password: newHashedPassword,
        idRole
      },
      { where: { id } }
    );

    const token = await generateJWT(dbUser.id, username);

    return res.json({
      ok: true,
      msg: 'Usuario actualizado.',
      token
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      next(error);
    }
    console.error(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el Usuario'
    });
  }
};

export const getAllUsers = async (req = request, res = response) => {
  try {
    const dbUsers = await sequelize.query(`SELECT * FROM view_users`, {
      type: QueryTypes.SELECT
    });

    res.json({
      ok: true,
      arg: dbUsers
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los Usuarios'
    });
  }
};

export const getAllWorkers = async (req = request, res = response) => {
  try {
    const dbWorkers = await sequelize.query(`SELECT * FROM view_workers`, {
      type: QueryTypes.SELECT
    });

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

export const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const dbUser = await User.findByPk(id);

    return res.json({
      ok: true,
      arg: dbUser
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener el Usuario.'
    });
  }
};

export const getInfo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const result = await sequelize.query(
      `
      			SELECT fn_user_getinfo(:id, 'dbuser');
            FETCH ALL IN dbuser;
      			`,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT
      }
    );

    const dbUser = result[1];

    return res.json({
      ok: true,
      arg: dbUser
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener el Usuario.'
    });
  }
};
