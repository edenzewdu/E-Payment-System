const { DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
    const Agents = sequelize.define('Agents', {
        agentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        agentName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        agentEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },

        contactInfo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
       
    return Agents;
};