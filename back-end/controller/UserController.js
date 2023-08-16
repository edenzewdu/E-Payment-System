const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = db.User;

// Create and save a new user
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (
    !req.body.UserID ||
    !req.body.FirstName ||
    !req.body.LastName ||
    !req.body.Gender ||
    !req.body.UserName ||
    !req.body.Email ||
    !req.body.Password ||
    !req.body.PhoneNumber ||
    !req.body.Address||    !req.body.Role
  ) {
    res.status(400).send({
      message: 'Fields cannot be empty',
    });
    return;
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      Email: req.body.Email,
    },
  });

  if (existingUser) {
    res.status(409).send({
      message: 'User already exists',
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.Password, 10);

  // Create a user object
  const user = {
    UserID: req.body.UserID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    UserName: req.body.UserName,
    Password: hashedPassword,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Address: req.body.Address,
    Role: req.body.Role,
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
      message: `User with id=${id} not found`,
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
      message: `Cannot update user with id=${id}. User not found or req.body is empty!`,
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
      message: `Cannot delete user with id=${id}. User not found!`,
    });
  }
});

// User login auth
exports.login = asyncHandler(async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({
      where: { Email },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user', message: error.message });
  }
});