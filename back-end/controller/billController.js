const db = require('../models');

const Bill = db.Bill;

// Create and save a new bill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount || !req.body.description) {
    res.status(400).send({
      message: 'Amount and description cannot be empty'
    });
    return;
  }

  // Create a bill object
  const bill = {
    amount: req.body.amount,
    description: req.body.description
  };

  // Save bill in the database
  Bill.create(bill)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the bill.'
      });
    });
};

// Retrieve all bills from the database
exports.findAll = (req, res) => {
  Bill.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving bills.'
      });
    });
};

// Find a single bill by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bill.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Bill with id=${id} not found`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving bill with id=${id}`
      });
    });
};

// Update a bill by id
exports.update = (req, res) => {
  const id = req.params.id;

  Bill.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Bill was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update bill with id=${id}. Bill not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating bill with id=${id}`
      });
    });
};

// Delete a bill by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Bill.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Bill was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete bill with id=${id}. Bill not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete bill with id=${id}`
      });
    });
};