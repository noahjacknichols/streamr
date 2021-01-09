const UserSchema = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  //error checking here
  const User = mongoose.model("User", UserSchema);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });
    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(400).send("couldn't decrypt pass");
      if (!result)
        return res.status(400).json({ message: "Incorrect password" });
      const payload = {
        user: {
          id: user.id,
        },
      };
      // jwt.sign(payload, "randomString", { expiresIn: 36000 }, (err, token) => {
      jwt.sign(payload, "randomString", (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
};


exports.create = async (req, res, next) => {
    const User = mongoose.model("User", UserSchema);
    const { firstname, lastname, email, password } = req.body;
  
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }
      user = new User({
        firstname,
        lastname,
        email,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
  
      user.password = await bcrypt.hash(password, salt);
  
      await user.save((err) => {
        if (err) return res.status(400).send("error with saving user");
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
  