const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringInValid(string) {
  if (string === undefined || string === null || string.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET_KEY);
}

exports.postSignUpUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (isStringInValid(email) || isStringInValid(password)) {
      return res
        .status(400)
        .json({ err: "Bad parameters..Something is missing" });
    }
    const user = await User.findAll({ where: { email: email } });
    if (user[0]) {
      return res.status(500).json({ err: "Email already exist" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      console.log(err);
      await User.create({
        email: email,
        password: hash,
      });
      res.status(201).json({ message: "You are successfully signed up" });
    });
  } catch (err) {
    res.status(500).json({ err: "Email_exist" });
  }
};

exports.postLoginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (isStringInValid(email) || isStringInValid(password)) {
      return res
        .status(400)
        .json({ err: "Email id or password is missing", success: false });
    }
    const users = await User.findAll({ where: { email: email } });

    const user = users[0];

    if (!user) {
      return res.status(404).json({ err: "User not found", success: false });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error("Something went wrong");
      }
      if (result === true) {
        res
          .status(200)
          .json({
            message: "User Logged in successfully",
            success: true,
            token: generateAccessToken(user.id),
          });
      } else {
        res.status(401).json({ err: "Incorrect Password", success: false });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};
