const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const schemes = sequelize.define(
    'schemes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      category: {
        type: DataTypes.ENUM,

        values: ['education', 'health', 'financial', 'agriculture'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  schemes.associate = (db) => {
    db.schemes.belongsToMany(db.users, {
      as: 'eligible_users',
      foreignKey: {
        name: 'schemes_eligible_usersId',
      },
      constraints: false,
      through: 'schemesEligible_usersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.schemes.hasMany(db.applications, {
      as: 'applications_scheme',
      foreignKey: {
        name: 'schemeId',
      },
      constraints: false,
    });

    //end loop

    db.schemes.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.schemes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.schemes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return schemes;
};
