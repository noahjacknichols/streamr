const express = require('express');
const routes = express.Router();

const authRouter = require('./authRouter'),
    userRouter = require('./userRouter'),
    videoRouter = require('./videoRouter');

routes.use('/', authRouter);
routes.use('/user', userRouter);
routes.use('/video', videoRouter);

module.exports = routes;