const asyncHandler = require('express-async-handler');
const db = require('../models');

const User = db.User;

// Create and save a new user
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if ( !req.body.UserID ||
    !req.body.FirstName ||
    !req.body.LastName ||
    !req.body.Gender ||
    !req.body.UserName ||
    !req.body.Email ||
    !req.body.Password|| 
    !req.body.PhoneNumber ||
    !req.body.Address) {
    res.status(400).send({
      message: 'cannot be empty',
    });
    return;
  }

  // Create a user object
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

  // Save user in the database
  const data = await User.create(user);
  res.send(data);
});

// Retrieve all users from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await User.findAll();
  res.send(data);
});

// Find a single user by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await User.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: 
      (`User with id=${id} not found`),
    });
  } else {
    res.send(data);
  }
});

// Update a user by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await User.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'User was updated successfully.',
    });
  } else {
    res.send({
      message: (`Cannot update user with id=${id}. User not found or req.body is empty!`),
    });
  }
});

// Delete a user by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await User.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'User was deleted successfully!',
    });
  } else {
    res.send({
      message: (`Cannot delete user with id=${id}. User not found!`),
    });
  }
});