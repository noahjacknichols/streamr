require('dotenv').config()
const express = require('express'),
    app = express(),
    http = require('http'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    routes = require('./routes/routes.js');

port = process.env.port
mongoose.connect(process.env.DB_STRING);
app.use(cors());
app.use(express.json());
app.use(routes);
const server = http.createServer(app);
server.listen(port);

module.exports = server;