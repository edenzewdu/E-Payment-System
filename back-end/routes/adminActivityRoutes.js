const express = require('express');
const router = express.Router();

const adminActivityController = require('../controller/adminActivityController.js');


router.post('/', adminActivityController.createAdminActivity);

module.exports = router;