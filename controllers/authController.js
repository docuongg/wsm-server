const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { promisify } = require("util");

const User = require("../models/user");
const filterObj = require("../utils/filterObj")

const signToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );
};

exports.loginGoogle = async (req, res, next) => {
  const ggUser = filterObj(
    req.body,
    "email",
    "given_name",
    "family_name",
    "sub",
    "picture"
  );

  const existing_user = await User.findOne({ email: ggUser.email });
  const new_user = null;

  if (!existing_user) {
    new_user = await User.create({
      email: ggUser.email,
      givenName: ggUser.given_name,
      familyName: ggUser.family_name,
      googleId: ggUser.sub,
      avatar: ggUser.picture,
    });
  }

  const token = signToken(existing_user || new_user);

  res.status(200).json({
    status: "success",
    message: "Login successfully!",
    token,
    user: existing_user || new_user
  });
};

exports.loginFailure = async (req, res) => {
  return res.status(400).json({
    status: "error",
    message: "Something went wrong!",
  });
};

exports.logout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access.",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const this_user = await User.findById(decoded.userId);
  if (!this_user) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exists.",
    });
  }
  req.user = this_user;
  next();
};
