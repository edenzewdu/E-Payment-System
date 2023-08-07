const asyncHandler = require('express-async-handler');
const db = require('../models');

const Payment = db.payment;

// Create and save a new payment
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.paymentID || !req.body.paymentDate || !req.body.status || !req.body.amount || !req.body.referenceNumber) {
    res.status(400).send({
      message: 'Payment ID, payment date, status, amount, and reference number cannot be empty',
    });
    return;
  }

  // Create a payment object
  const payment = {
    paymentID: req.body.paymentID,
    paymentDate: req.body.paymentDate,
    status: req.body.status,
    amount: req.body.amount,
    referenceNumber: req.body.referenceNumber
  };

  // Save payment in the database
  const data = await Payment.create(payment);
  res.send(data);
});

// Retrieve all payments from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Payment.findAll();
  res.send(data);
});

// Find a single payment by ID
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Payment.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: (`Payment with ID ${id} not found`),
    });
  } else {
    res.send(data);
  }
});

// Update a payment by ID
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await Payment.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Payment updated successfully',
    });
  } else {
    res.send({
      message: (`Cannot update payment with ID ${id}. Payment not found or request body is empty`),
    });
  }
});

// Delete a payment by ID
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Payment.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Payment deleted successfully',
    });
  } else {
    res.send({
      message: (`Cannot delete payment with ID ${id}. Payment not found`),
    });
  }
});