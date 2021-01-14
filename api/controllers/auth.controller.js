const UserSchema = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const c = require('../constants')
let User = mongoose.model("User", UserSchema);
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: c.ERROR.BAD_USER_CREDENTIALS });
    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(400).json({error: err.message});
      if (!result)
        return res.status(400).json({ error: c.ERROR.BAD_USER_CREDENTIALS });
      const payload = {
        user: {
          id: user.id,
        },
      };
      // jwt.sign(payload, "randomString", { expiresIn: 36000 }, (err, token) => {
      jwt.sign(payload, c.CONSTANTS.JWT_KEY, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

exports.create = async (req, res, next) => {
    const User = mongoose.model("User", UserSchema);
    const {email, password } = req.body;
  
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ error: "user already exists" });
      }
      user = new User({
        email,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
  
      user.password = await bcrypt.hash(password, salt);
  
      await user.save((err) => {
        if (err) return res.status(400).json({error: err.message});
      });
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          return res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("error in posting");
    }
  };
  