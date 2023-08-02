const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define('bill', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Bill;
};