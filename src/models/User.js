import { DataTypes } from 'sequelize';

import { nameRegExp } from '../helpers/utils.js';
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
        notNull: {
          msg: 'El usuario es requerido'
        },
        notEmpty: {
          msg: 'El usuario no puede estar vacío'
        },
        isAlphanumeric: {
          msg: 'El usuario solo puede contener letras y numeros'
        },
        len: {
          args: [4, 20],
          msg: 'El usuario debe tener 4 caracteres o más'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La contraseña es requerida'
        },
        notEmpty: {
          msg: 'La contraseña no puede estar vacía'
        },
        len: {
          args: [6, 100],
          msg: 'La contraseña debe tener 6 caracteres o más.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
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
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La ocupación es requerida'
        },
        notEmpty: {
          msg: 'La ocupación no puede estar vacía'
        },
        is: {
          args: nameRegExp,
          msg:
            'La ocupación debe contener solo letras y espacios. ' +
            'Los espacios no se pueden encontrar al inicio o al final.'
        },
        len: {
          args: [4, 30],
          msg: 'La ocupación debe tener entre 4 y 30 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El correo es requerido'
        },
        notEmpty: {
          msg: 'El correo no puede estar vacío'
        },
        isEmail: {
          msg: 'El correo debe tener el formato ejemplo@gmail.com'
        },
        len: {
          args: [8, 50],
          msg: 'El correo debe tener 8 caracteres o más'
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

export const getUserModel = () => {
  return User;
};

// // idArea
// Area.hasMany(User, {
//   foreignKey: {
//     name: 'idArea',
//     allowNull: false
//   }
// });

// User.belongsTo(Area, {
//   foreignKey: {
//     name: 'idArea',
//     allowNull: false
//   }
// });

// // idRole
// Role.hasMany(User, {
//   foreignKey: {
//     name: 'idRole',
//     allowNull: false
//   }
// });

// User.belongsTo(Role, {
//   foreignKey: {
//     name: 'idRole',
//     allowNull: false
//   }
// });

// // model Organization (idLeader)
// User.hasMany(Organization, {
//   foreignKey: {
//     name: 'idLeader',
//     allowNull: false
//   }
// });

// Organization.belongsTo(User, {
//   foreignKey: {
//     name: 'idLeader',
//     allowNull: false
//   }
// });

// // model OrganizationMember (idOrganization)
// Organization.belongsToMany(User, {
//   through: OrganizationMember,
//   foreignKey: {
//     name: 'idOrganization'
//   }
// });

// // model OrganizationMember (idMember)
// User.belongsToMany(Organization, {
//   through: OrganizationMember,
//   foreignKey: {
//     name: 'idMember'
//   }
// });
