import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

import { Area } from './Area.js';
import { Organization } from './Organization.js';
import { OrganizationMember } from './OrganizationMember.js';
import { Role } from './Role.js';

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El usuario es requerido'
        },
        isAlphanumeric: {
          msg: 'El usuario solo puede contener letras y numeros'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
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

// idArea
Area.hasOne(User, {
  foreignKey: {
    name: 'idArea',
    allowNull: false
  }
});

User.belongsTo(Area, {
  foreignKey: {
    name: 'idArea',
    allowNull: false
  }
});

// idRole
Role.hasOne(User, {
  foreignKey: {
    name: 'idRole',
    allowNull: false
  }
});

User.belongsTo(Role, {
  foreignKey: {
    name: 'idRole',
    allowNull: false
  }
});

// model Organization (idLeader)
User.hasMany(Organization, {
  foreignKey: {
    name: 'idLeader',
    allowNull: false
  }
});

Organization.belongsTo(User, {
  foreignKey: {
    name: 'idLeader',
    allowNull: false
  }
});

// model OrganizationMember (idOrganization)
Organization.belongsToMany(User, {
  through: OrganizationMember,
  foreignKey: {
    name: 'idOrganization'
  }
});

// model OrganizationMember (idMember)
User.belongsToMany(Organization, {
  through: OrganizationMember,
  foreignKey: {
    name: 'idMember'
  }
});
