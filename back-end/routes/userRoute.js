const express = require('express');
const userRouter = express.Router();
const UserController = require('../controller/UserController.js');


userRouter.post('/',UserController.upload,UserController.create)
userRouter.post('/login', UserController.login)
userRouter.post('/verifyResetToken', UserController.verifyResetToken)
userRouter.post('/verifyUser/:userId/:verificationCode', UserController.verifyUser);
userRouter.post('/updatePasswordWithToken', UserController.updatePasswordWithToken )
userRouter.post('/associate', UserController.associate);
userRouter.get('/', UserController.findAll)
userRouter.get('/:id', UserController.findOne);
userRouter.get('/serviceNo/:serviceNo/:serviceProviderBIN', UserController.findOneByServiceNo);
userRouter.put('/:id', UserController.upload, UserController.update)
userRouter.delete('/:id', UserController.delete)
userRouter.post('/requestPasswordReset', UserController.requestPasswordReset);
module.exports= userRouter;