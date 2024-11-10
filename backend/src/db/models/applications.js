const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const applications = sequelize.define(
    'applications',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      application_date: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['pending', 'approved', 'rejected'],
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

  applications.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.applications.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.applications.belongsTo(db.schemes, {
      as: 'scheme',
      foreignKey: {
        name: 'schemeId',
      },
      constraints: false,
    });

    db.applications.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.applications.hasMany(db.file, {
      as: 'documents',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.applications.getTableName(),
        belongsToColumn: 'documents',
      },
    });

    db.applications.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.applications.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return applications;
};
