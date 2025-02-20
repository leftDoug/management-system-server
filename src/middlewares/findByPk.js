import { request, response } from 'express';
import { Area } from '../models/Area.js';

export const findByPk = async (req = request, res = response, next) => {
  const { id } = req.params;
  const model = req.baseUrl.split('/')[2];
  let found = null;
  let msg = '';
  let word = '';

  try {
    switch (model) {
      case 'areas':
        found = await Area.findByPk(id);
        msg = 'Área no encontrada.';
        word = 'Área';
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
