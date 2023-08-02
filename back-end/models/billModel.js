const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig.js');


module.express = (sequelize, Sequelize) => {
    const Bill = sequelize.define('bill', {
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
    return Bill;
    };
