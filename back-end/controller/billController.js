const asyncHandler = require('express-async-handler');
const db = require('../models');

const Bill = db.Bill;

// Create and save a new bill
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.billNumber || !req.body.dateIssued || !req.body.dueDate || !req.body.amountDue || !req.body.customerName ||
    !req.body.serviceDescription  || !req.body.serviceCharges ||  !req.body.billStatus || !req.body.TotalAmount) {
    res.status(400).send({
      message: 'cannot be empty',
    });
    return;
  }

  // Create a bill object
  const bill = {
    billNumber: req.body.billNumber,
    dateIssued: req.body.dateIssued,
    dueDate: req.body.dueDate,
    amountDue: req.body.amountDue,
    customerName: req.body.customerName,
    serviceDescription: req.body.serviceDescription,
    serviceCharges: req.body.serviceCharges,
    billStatus: req.body.billStatus,
    TotalAmount: req.body.TotalAmount,
    additionalCharges: req.body.additionalCharges,
    servicePeriod: req.body.servicePeriod
  };

  // Save bill in the database
  const data = await Bill.create(bill);
  res.send(data);
});

// Retrieve all bills from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Bill.findAll();
  res.send(data);
});

// Find a single bill by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Bill.findByPk(id);
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

  const [num] = await Bill.update(req.body, {
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

  const num = await Bill.destroy({
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