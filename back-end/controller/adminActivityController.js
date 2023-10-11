const { AdminActivity } = require('../models');
const { Op } = require('sequelize');

const createAdminActivity = async (req, res) => {
  try {
    const { adminName, action, targetAdminName, timestamp, changedData } = req.body;

    const newAdminActivity = await AdminActivity.create({
      adminName,
      action,
      targetAdminName,
      timestamp,
      changedData,
    });

    res.status(201).json(newAdminActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create AdminActivity.' });
  }
};

module.exports = { createAdminActivity };