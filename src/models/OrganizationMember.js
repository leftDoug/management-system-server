import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const OrganizationMember = sequelize.define(
  'organizationsMembers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idOrganization: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
    idMember: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
