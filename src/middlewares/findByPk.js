import { request, response } from 'express';

import { Area } from '../models/Area.js';
import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { idUserRegExp } from '../helpers/utils.js';

export const findByPk = async (req = request, res = response, next) => {
  const model = req.baseUrl.split('/')[2];
  const models = ['areas', 'organizations', 'roles'];
  let id = null;
  let found = null;
  let msg = '';
  let word = '';

  if (models.includes(model)) {
    id = req.params.id;
  }

  try {
    switch (model) {
      case 'areas':
        found = await Area.findByPk(id);
        msg = 'Área no encontrada.';
        word = 'Área';
        break;
      case 'organizations':
        found = await Role.findByPk(id);
        msg = 'Organización no encontrada.';
        word = 'Organización';
        break;
      case 'roles':
        found = await Role.findByPk(id);
        msg = 'Rol no encontrado.';
        word = 'Rol';
        break;
      case 'auth':
        if (req.path.includes('register') || req.method === 'PATCH') {
          const { idArea } = req.body;

          found = await Area.findByPk(idArea);

          if (!found) {
            msg = 'Área no encontrada.';
            word = 'Área';
          } else {
            const { idRole } = req.body;
            found = await Role.findByPk(idRole);

            if (!found) {
              msg = 'Rol no encontrado.';
              word = 'Rol';
            }
          }
        } else {
          // FIXME mirar si arreglar el mensaje de error
          if (req.path.includes('users') && !req.path.includes('role')) {
            id = req.params.id;

            if (id.match(idUserRegExp)) {
              found = await User.findByPk(id);
              msg = 'Usuario no encontrado.';
              word = 'Usuario';
            } else {
              msg = 'Usuario no encontrado. ID de Usuario no válido.';
              word = 'Usuario';
            }
          }
        }
        break;
      default:
        break;
    }

    if (!found) {
      return res.status(404).json({
        ok: false,
        msg
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: `Error al buscar ${word}.`
    });
  }

  next();
};
