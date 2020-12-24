const { resourceLimits } = require('worker_threads');
const express = require('express');
const routes = express.Router();

const authRouter = require('./authRouter');

routes.use('/', authRouter);

module.exports = routes;