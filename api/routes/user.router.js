var express = require("express");
const user = express.Router();
const validateToken = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

user.get('/', validateToken, userController.getUserInfo);

user.put('/', validateToken, userController.editUserInfo);

module.exports = user;