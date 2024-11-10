const db = require('../models');
const Users = db.users;

const Applications = db.applications;

const Notifications = db.notifications;

const Schemes = db.schemes;

const Organizations = db.organizations;

const ApplicationsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    application_date: new Date('2023-10-01T10:00:00Z'),

    status: 'rejected',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    application_date: new Date('2023-09-15T14:30:00Z'),

    status: 'pending',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    application_date: new Date('2023-08-20T09:00:00Z'),

    status: 'rejected',

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

const NotificationsData = [
  {
    // type code here for "relation_one" field

    message: 'Your application for the Education Support Scheme is pending.',

    sent_at: new Date('2023-10-02T08:00:00Z'),

    read: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    message: 'Your Health Insurance Scheme application has been approved.',

    sent_at: new Date('2023-09-16T10:00:00Z'),

    read: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    message:
      'Your application for the Agricultural Subsidy Scheme was rejected.',

    sent_at: new Date('2023-08-21T12:00:00Z'),

    read: true,

    // type code here for "relation_one" field
  },
];

const SchemesData = [
  {
    name: 'Education Support Scheme',

    description: "Provides financial assistance for children's education.",

    category: 'education',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Health Insurance Scheme',

    description: 'Offers health insurance coverage for families.',

    category: 'financial',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Agricultural Subsidy Scheme',

    description: 'Subsidies for purchasing agricultural equipment.',

    category: 'agriculture',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Frederick Gowland Hopkins',
  },

  {
    name: 'Stephen Hawking',
  },

  {
    name: 'Hans Bethe',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

async function associateApplicationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Application0 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Application0?.setUser) {
    await Application0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Application1 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Application1?.setUser) {
    await Application1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Application2 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Application2?.setUser) {
    await Application2.setUser(relatedUser2);
  }
}

async function associateApplicationWithScheme() {
  const relatedScheme0 = await Schemes.findOne({
    offset: Math.floor(Math.random() * (await Schemes.count())),
  });
  const Application0 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Application0?.setScheme) {
    await Application0.setScheme(relatedScheme0);
  }

  const relatedScheme1 = await Schemes.findOne({
    offset: Math.floor(Math.random() * (await Schemes.count())),
  });
  const Application1 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Application1?.setScheme) {
    await Application1.setScheme(relatedScheme1);
  }

  const relatedScheme2 = await Schemes.findOne({
    offset: Math.floor(Math.random() * (await Schemes.count())),
  });
  const Application2 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Application2?.setScheme) {
    await Application2.setScheme(relatedScheme2);
  }
}

async function associateApplicationWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Application0 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Application0?.setOrganization) {
    await Application0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Application1 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Application1?.setOrganization) {
    await Application1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Application2 = await Applications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Application2?.setOrganization) {
    await Application2.setOrganization(relatedOrganization2);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }
}

async function associateNotificationWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setOrganization) {
    await Notification0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setOrganization) {
    await Notification1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setOrganization) {
    await Notification2.setOrganization(relatedOrganization2);
  }
}

// Similar logic for "relation_many"

async function associateSchemeWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Scheme0 = await Schemes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Scheme0?.setOrganization) {
    await Scheme0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Scheme1 = await Schemes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Scheme1?.setOrganization) {
    await Scheme1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Scheme2 = await Schemes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Scheme2?.setOrganization) {
    await Scheme2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Applications.bulkCreate(ApplicationsData);

    await Notifications.bulkCreate(NotificationsData);

    await Schemes.bulkCreate(SchemesData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateApplicationWithUser(),

      await associateApplicationWithScheme(),

      await associateApplicationWithOrganization(),

      await associateNotificationWithUser(),

      await associateNotificationWithOrganization(),

      // Similar logic for "relation_many"

      await associateSchemeWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('applications', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('schemes', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
