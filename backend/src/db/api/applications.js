const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ApplicationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const applications = await db.applications.create(
      {
        id: data.id || undefined,

        application_date: data.application_date || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await applications.setUser(data.user || null, {
      transaction,
    });

    await applications.setScheme(data.scheme || null, {
      transaction,
    });

    await applications.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.applications.getTableName(),
        belongsToColumn: 'documents',
        belongsToId: applications.id,
      },
      data.documents,
      options,
    );

    return applications;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const applicationsData = data.map((item, index) => ({
      id: item.id || undefined,

      application_date: item.application_date || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const applications = await db.applications.bulkCreate(applicationsData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < applications.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.applications.getTableName(),
          belongsToColumn: 'documents',
          belongsToId: applications[i].id,
        },
        data[i].documents,
        options,
      );
    }

    return applications;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const applications = await db.applications.findByPk(
      id,
      {},
      { transaction },
    );

    await applications.update(
      {
        application_date: data.application_date || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await applications.setUser(data.user || null, {
      transaction,
    });

    await applications.setScheme(data.scheme || null, {
      transaction,
    });

    await applications.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.applications.getTableName(),
        belongsToColumn: 'documents',
        belongsToId: applications.id,
      },
      data.documents,
      options,
    );

    return applications;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const applications = await db.applications.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of applications) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of applications) {
        await record.destroy({ transaction });
      }
    });

    return applications;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const applications = await db.applications.findByPk(id, options);

    await applications.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await applications.destroy({
      transaction,
    });

    return applications;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const applications = await db.applications.findOne(
      { where },
      { transaction },
    );

    if (!applications) {
      return applications;
    }

    const output = applications.get({ plain: true });

    output.user = await applications.getUser({
      transaction,
    });

    output.scheme = await applications.getScheme({
      transaction,
    });

    output.documents = await applications.getDocuments({
      transaction,
    });

    output.organization = await applications.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.schemes,
        as: 'scheme',
      },

      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.file,
        as: 'documents',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              application_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              application_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.application_dateRange) {
        const [start, end] = filter.application_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            application_date: {
              ...where.application_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            application_date: {
              ...where.application_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.scheme) {
        const listItems = filter.scheme.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          schemeId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.applications.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.applications.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('applications', 'status', query),
        ],
      };
    }

    const records = await db.applications.findAll({
      attributes: ['id', 'status'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['status', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.status,
    }));
  }
};
