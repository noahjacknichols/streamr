var express = require("express");
const auth = express.Router();
const authController = require("../auth/auth.controller");

auth.post("/login", authController.login);

auth.post("/create", authController.create);

module.exports = auth;
