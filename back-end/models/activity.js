
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Activity = sequelize.define('Activity', {
    adminName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAdminName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    updatedData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = Activity;