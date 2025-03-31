import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { nameRegExp } from '../helpers/utils.js';

export const Area = sequelize.define(
  'area',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre es requerido'
        },
        notEmpty: {
          msg: 'El nombre no puede estar vacío'
        },
        is: {
          args: nameRegExp,
          msg:
            'El nombre debe contener solo letras y espacios. ' +
            'Los espacios no se pueden encontrar al inicio o al final.'
        },
        len: {
          args: [4, 50],
          msg: 'El nombre debe tener entre 4 y 50 caracteres'
        }
      }
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export const getAreaModel = () => {
  return Area;
};
