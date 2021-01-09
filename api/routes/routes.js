const express = require('express');
const routes = express.Router();

const authRouter = require('./auth.router'),
    userRouter = require('./user.router'),
    videoRouter = require('./video.router');

routes.use('/', authRouter);
routes.use('/user', userRouter);
routes.use('/video', videoRouter);

module.exports = routes;