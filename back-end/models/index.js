const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Bill = require('./billModel.js')(sequelize, Sequelize);
db.Agents = require('./agentModel.js')(sequelize, Sequelize);
db.User = require('./UserModel.js')(sequelize, Sequelize);
db.Services = require('./ServiceModel.js')(sequelize, Sequelize);
db.payment = require('./Payment.js')(sequelize, Sequelize);
// db.AgentHistory = require('./agentHistoryModel.js')(sequelize, Sequelize);
// db.ServiceProviderHistory = require('./serviceProviderHistoryModel.js')(sequelize, Sequelize);
// db.UserHistory = require('./userHistoryModel.js')(sequelize, Sequelize);


// // Define User-Agents junction table
// const UserAgent = sequelize.define('userAgent', {
//   foreinKey: 'UserID',
//   primaryKey: 'UserID'
// });

// // Define Agents-ServiceProvider junction table
// const AgentServiceProvider = sequelize.define('agentServiceProvider', {});

// // Define User-ServiceProvider junction table
// const UserServiceProvider = sequelize.define('userServiceProvider', {});


// // Define associations
// db.User.belongsToMany(db.Agents, { through: UserAgent });
// db.Agents.belongsToMany(db.User, { through: UserAgent });

// db.Agents.belongsToMany(db.Services, { through: AgentServiceProvider });
// db.Services.belongsToMany(db.Agents, { through: AgentServiceProvider });

// db.User.belongsToMany(db.Services, { through: UserServiceProvider });
// db.Services.belongsToMany(db.User, { through: UserServiceProvider });

// db.Agents.hasMany(db.payment);
// db.payment.belongsTo(db.Agents);

// // db.AgentHistory.hasOne(db.payment);
// // db.payment.belongsTo(db.AgentHistory);

// db.User.hasMany(db.payment);
// db.payment.belongsTo(db.User);

// db.Services.hasMany(db.payment);
// db.payment.belongsTo(db.Services);

// // db.ServiceProviderHistory.hasOne(db.Payment);
// // db.Payment.belongsTo(db.ServiceProviderHistory);

// // db.User.hasMany(db.UserHistory);
// // db.UserHistory.belongsTo(db.User);

// // db.Payment.hasOne(db.UserHistory);
// // db.UserHistory.belongsTo(db.Payment);

// db.Services.hasMany(db.Bill);
// db.Bill.belongsTo(db.Services);

// db.payment.hasOne(db.Bill);
// db.Bill.belongsTo(db.payment);

// db.User.hasMany(db.Bill);
// db.Bill.belongsTo(db.User);

module.exports = db;