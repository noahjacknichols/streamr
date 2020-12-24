const express = require('express');
const routes = express.Router();

const authRouter = require('./authRouter'),
    userRouter = require('./userRouter');

routes.use('/', authRouter);
routes.use('/user', userRouter);

module.exports = routes;