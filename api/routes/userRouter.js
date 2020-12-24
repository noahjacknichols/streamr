var express = require("express");
const user = express.Router();
const validateToken = require('../middleware/auth');
const userController = require('../controllers/userController');

user.get('/', validateToken, userController.getUserInfo);

module.exports = user;