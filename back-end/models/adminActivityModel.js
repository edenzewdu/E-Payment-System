
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const AdminActivity = sequelize.define('AdminActivity', {
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

module.exports = AdminActivity;