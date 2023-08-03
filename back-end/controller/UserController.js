const asyncHandler = require('express-async-handler');
const db = require('../models');

const User = db.User;

// Create and save a new bill
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.UserID || !req.body.FirstName || !req.body.LastName || !req.body.Gender || !req.body.UserName || !req.body.Email || !req.body.PhoneNumber || !req.body.Address) {
    res.status(400).send({
      message: 'Amount and description cannot be empty',
    });
    return;
  }

  // Create a bill object
  const user = {
    UserID: req.body.UserID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Address: req.body.Address
  };

  // Save bill in the database
  const data = await User.create(bill);
  res.send(data);
});

// Retrieve all bills from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await User.findAll();
  res.send(data);
});

// Find a single bill by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await User.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: 
      (`Bill with id=${id} not found`),
    });
  } else {
    res.send(data);
  }
});

// Update a bill by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await User.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was updated successfully.',
    });
  } else {
    res.send({
      message: (`Cannot update bill with id=${id}. Bill not found or req.body is empty!`),
    });
  }
});

// Delete a bill by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await User.remove({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was deleted successfully!',
    });
  } else {
    res.send({
      message: (`Cannot delete bill with id=${id}. Bill not found!`),
    });
  }
});