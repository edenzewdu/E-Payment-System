const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/UserController.js');

// Define routes for bills resource
userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

module.exports = userRouter;